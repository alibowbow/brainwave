import assert from 'node:assert/strict';

// Post-start controls only. Cold autoplay has its own untouched gate.
// Native Tab obtains the production focus hold; native mouse input then exercises
// the pointer control. Never force visibility/focus, change timers, or dispatch DOM events.
export const pressSceneControl = (page, name, options) => sceneControlInput(page, name, { ...options, action: 'click' });
export const hoverSceneControl = (page, name, options) => sceneControlInput(page, name, { ...options, action: 'hover' });

async function sceneControlInput(page, name, { record = () => {}, action }) {
  const started = Date.now(), deadline = started + 120_000; // Original action budget, never reset.
  const evidence = { name, action, input: `native Tab focus then native mouse ${action === 'hover' ? 'move only' : 'click'}`, focusTrace: [], status: 'running', actionBudgetMs: 120_000 };
  let cdp, primaryError;
  record(evidence);
  const remaining = () => {
    assert.ok(Date.now() < deadline, 'Scene-control action exceeded the original 120000ms deadline');
    return deadline - Date.now();
  };
  const bounded = async (run, ms, label) => {
    let timer;
    try {
      return await Promise.race([
        Promise.resolve().then(run),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} exceeded ${ms}ms`)), ms); }),
      ]);
    } finally { clearTimeout(timer); }
  };
  const read = async (expression, cleanup = false) => {
    const result = await bounded(() => cdp.send('Runtime.evaluate', { expression, returnByValue: true, userGesture: false }),
      cleanup ? 5000 : Math.min(5000, remaining()), 'Scene-control observation');
    if (!cleanup) remaining(); // A late acknowledgement is never counted as timely success.
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const state = `(() => {
    const name = ${JSON.stringify(name)};
    const label = el => el.getAttribute('aria-label') || el.textContent.trim();
    const items = [...document.querySelectorAll('button')].filter(el => label(el) === name).map((el,index) => {
      const box = el.getBoundingClientRect(), css = getComputedStyle(el);
      let opacity = 1; const hiddenAncestry=[];
      for (let p = el; p; p = p.parentElement) {
        const style=getComputedStyle(p); opacity*=Number(style.opacity);
        if(style.display==='none'||style.visibility!=='visible'||Number(style.opacity)<1||p.hidden||p.hasAttribute('inert'))
          hiddenAncestry.push({tag:p.tagName,className:p.className,display:style.display,visibility:style.visibility,
            opacity:Number(style.opacity),hidden:p.hidden,inert:p.hasAttribute('inert'),ariaHidden:p.getAttribute('aria-hidden')});
      }
      const panel=el.closest('[role="dialog"],aside,section'), surface=el.closest('[data-scene-surface]');
      const x = box.x + box.width / 2, y = box.y + box.height / 2, hit = document.elementFromPoint(x, y);
      const pointer=window.__qaSceneControlClick?.point, pointerHit=pointer?document.elementFromPoint(pointer.x,pointer.y):null;
      return { index, label:label(el), className:el.className, bounds:{x:box.x,y:box.y,width:box.width,height:box.height},
        display:css.display, visibility:css.visibility, effectiveOpacity:opacity, hiddenAncestry,
        panel:panel?{tag:panel.tagName,role:panel.getAttribute('role'),label:panel.getAttribute('aria-label'),className:panel.className}:null,
        surface:surface?{tag:surface.tagName,role:surface.getAttribute('role'),label:surface.getAttribute('aria-label')}:null,
        focused: document.activeElement === el, visible: box.width > 0 && box.height > 0 && css.visibility === 'visible' && opacity > .99,
        inert: !!el.closest('[inert]'), disabled: el.disabled, point: {x,y}, hit: !!hit && el.contains(hit),
        pointerHit: pointer ? !!pointerHit && el.contains(pointerHit) : null,
        inViewport: x >= 0 && x < innerWidth && y >= 0 && y < innerHeight };
    });
    const e = document.activeElement;
    const modal=document.querySelector('[role="dialog"][aria-label="몰입 화면"]'), player=document.querySelector('section[data-scene-surface]');
    return { viewport:{width:innerWidth,height:innerHeight,scrollX,scrollY},
      context:{immersiveMounted:!!modal,immersiveVisible:!!modal&&getComputedStyle(modal).visibility==='visible',playerMounted:!!player,
        active:modal?.contains(e)?'immersive':player?.contains(e)?'player':'outside-scene'},
      candidates: items, active: {tag: e?.tagName, label: e?.getAttribute('aria-label'), text: e?.textContent?.trim().slice(0,60)} };
  })()`;
  try {
    cdp = await bounded(() => page.context().newCDPSession(page), Math.min(5000, remaining()), 'Scene-control observer attach');
    remaining();
    let target;
    for (let i = 0; i <= 45 && Date.now() < deadline; i++) {
      let s = await read(state); evidence.focusTrace.push(s);
      let focused = s.candidates.filter(c => c.focused && !c.inert && !c.disabled);
      if (focused.length === 1) {
        // Keep the genuine focus hold while visibility/scroll/opacity settles.
        // Do not Tab away from the requested button or restart its action budget.
        while (true) {
          assert.equal(focused.length, 1, 'Named control lost native focus or became inert/disabled while settling');
          const candidate = focused[0];
          if (candidate.visible && candidate.inViewport && candidate.hit) { target = candidate; break; }
          await new Promise(resolve => setTimeout(resolve, Math.min(100, remaining())));
          s = await read(state); evidence.focusTrace.push(s);
          focused = s.candidates.filter(c => c.focused && !c.inert && !c.disabled);
        }
        break;
      }
      if (i < 45) {
        await bounded(() => page.keyboard.press('Tab'), remaining(), 'Native Tab acknowledgement');
        remaining();
      }
    }
    assert.ok(target, `Named control was not reachable as a visible hit-tested native Tab target: ${name}`);
    evidence[action === 'hover' ? 'beforeHover' : 'beforeClick'] = target;
    await read(`(() => {
      const el = document.activeElement;
      if (el?.tagName !== 'BUTTON' || (el.getAttribute('aria-label') || el.textContent.trim()) !== ${JSON.stringify(name)}) throw new Error('Native focus changed before control input');
      const probe = {el, events:[],point:${JSON.stringify(target.point)},types:${JSON.stringify(action === 'hover' ? ['pointermove','pointerdown','pointerup','click'] : ['pointerdown','pointerup','click'])}};
      probe.listener = event => {
        const box = el.getBoundingClientRect(); let opacity=1;
        for(let p=el;p;p=p.parentElement) opacity*=Number(getComputedStyle(p).opacity);
        const hit = document.elementFromPoint(event.clientX,event.clientY);
        probe.events.push({type:event.type, trusted:event.isTrusted, targetIsExpected:el.contains(event.target),
          visible:getComputedStyle(el).visibility==='visible' && box.width>0 && box.height>0 && opacity>.99,
          inert:!!el.closest('[inert]'), disabled:el.disabled, hitExpected:!!hit&&el.contains(hit), at:performance.now()});
      };
      for(const type of probe.types) document.addEventListener(type,probe.listener,true);
      window.__qaSceneControlClick=probe;
      return true;
    })()`);
    if (action === 'hover') {
      await bounded(() => page.mouse.move(target.point.x, target.point.y), remaining(), 'Native control hover acknowledgement');
      evidence.hoverAcknowledgedAfterMs = Date.now() - started;
    } else {
      await bounded(() => page.mouse.click(target.point.x, target.point.y), remaining(), 'Native control click acknowledgement');
      evidence.clickAcknowledgedAfterMs = Date.now() - started;
    }
    remaining();
    evidence.events = await read(`window.__qaSceneControlClick?.events ?? []`);
    if (action === 'hover') {
      assert.ok(evidence.events.length > 0 && evidence.events.every(e => e.type === 'pointermove'), 'Hover must deliver native pointer movement without down/up/click');
      evidence.afterHover = await read(state);
      const hovered = evidence.afterHover.candidates.filter(c => c.focused && c.visible && c.inViewport && c.hit && c.pointerHit && !c.inert && !c.disabled);
      assert.equal(hovered.length, 1, 'Hover must finish over one visible, focused, hit-tested control');
    } else {
      assert.deepEqual(evidence.events.map(e => e.type), ['pointerdown', 'pointerup', 'click'], 'One native pointer sequence must reach the control');
    }
    assert.ok(evidence.events.every(e => e.trusted && e.targetIsExpected && e.visible && e.hitExpected && !e.inert && !e.disabled),
      `Native control event was hidden, covered, disabled, inert, untrusted or misdirected: ${JSON.stringify(evidence.events)}`);
    remaining();
    evidence.actionCompletedAfterMs = Date.now() - started;
    evidence.status = 'passed';
    return evidence;
  } catch (error) {
    primaryError = error; evidence.status = 'failed'; evidence.error = String(error); throw error;
  } finally {
    let cleanupError;
    try {
      if (cdp) await read(`(() => {const p=window.__qaSceneControlClick;if(p){for(const t of p.types) document.removeEventListener(t,p.listener,true);delete window.__qaSceneControlClick;}return true;})()`, true);
    } catch (error) { cleanupError = error; evidence.observerCleanupError = String(error); }
    if (cdp) await bounded(() => cdp.detach(), 1000, 'Scene-control observer detach')
      .catch(error => { cleanupError ??= error; evidence.detachError = String(error); });
    if (cleanupError) {
      evidence.status = 'failed';
      if (!primaryError) throw cleanupError;
    }
  }
}
