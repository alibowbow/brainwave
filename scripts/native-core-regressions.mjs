import assert from 'node:assert/strict';

// Draft only. Caller owns a browser launched with the application's normal
// autoplay policy. No launch, render, tests or repository writes on import.
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function observer(page) {
  const cdp = await page.context().newCDPSession(page);
  const read = async expression => {
    const result = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, userGesture: false });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const until = async (expression, label, ms = 30_000) => {
    const deadline = Date.now() + ms;
    do { const result = await read(expression); if (result) return result; await delay(100); } while (Date.now() < deadline);
    throw new Error(`Native regression precondition timed out: ${label}`);
  };
  return { read, until, close: () => cdp.detach() };
}

/** Invoke after existing hide(page,c,'immersive'), while playing.
 * Supply worldSelector='.water-edge' for a WaterEdge case to prove its keyboard
 * target participates in the actual modal cycle. No focus() or DOM dispatch. */
export async function verifyNativeModalCycle(page, { worldSelector } = {}) {
  const o = await observer(page);
  const expression = `(() => {
    const dialog = document.querySelector('[role="dialog"][aria-label="몰입 화면"]'), e = document.activeElement;
    if (!dialog || !(e instanceof HTMLElement)) return null;
    return { inside: dialog.contains(e), dialog: e === dialog, index: [...dialog.querySelectorAll('*')].indexOf(e),
      visible: e.getClientRects().length > 0 && getComputedStyle(e).visibility === 'visible',
      inert: !!e.closest('[inert]'), tabIndex: e.tabIndex, tag: e.tagName,
      label: e.getAttribute('aria-label'), world: ${JSON.stringify(worldSelector ?? '')} ? e.matches(${JSON.stringify(worldSelector ?? ':not(*)')}) : false };
  })()`;
  try {
    await page.keyboard.press('Tab');
    const first = await o.until(`(() => {const s=${expression};return s?.inside&&!s.dialog&&s.visible&&!s.inert&&s.tabIndex>=0?s:null;})()`, 'first native Tab reveals/focuses a real target', 2000);
    assert.ok(first?.inside && !first.dialog && first.visible && !first.inert && first.tabIndex >= 0,
      `One Tab must reveal and focus a real visible target: ${JSON.stringify(first)}`);
    const trace = [first];
    let wrapped = false;
    for (let i = 0; i < 64; i++) {
      await page.keyboard.press('Tab');
      const state = await o.read(expression);
      assert.ok(state?.inside && !state.dialog && state.visible && !state.inert && state.tabIndex >= 0,
        `Tab must stay on an actual visible modal target: ${JSON.stringify(state)}`);
      if (state.index === first.index) { wrapped = true; break; }
      trace.push(state);
    }
    assert.ok(wrapped, 'Native Tab must complete its cycle');
    if (worldSelector) assert.ok(trace.some(state => state.world), 'Scene keyboard target must be reachable before modal wraps');
    await page.keyboard.press('Shift+Tab');
    assert.equal((await o.read(expression)).index, trace.at(-1).index, 'Shift+Tab wraps to the real last target immediately');
    await page.keyboard.press('Tab');
    assert.equal((await o.read(expression)).index, first.index, 'Tab wraps to the real first target immediately');
    return { input: 'native Tab/Shift+Tab', observed: trace };
  } finally { await o.close(); }
}

/** Dedicated fresh-context regression for latest intent cancelling metadata.
 * Existing createFreshImmersiveSelection tests cover cancel(); only actual App
 * event wiring catches the readySnapshotRef branch omission.
 * Network gate delays only the optional metadata response; no application or
 * renderer methods are replaced. A=protected focus avoids eager metadata load. */
export async function verifyPendingSelectionPlayRetry(browser, baseUrl) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 850 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  page.setDefaultTimeout(30_000);
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  let requested = false;
  const held = [];
  await context.route(/(?:\/assets\/immersiveSessionBridge-[^/?]+\.js|\/services\/immersiveSessionBridge\.ts)(?:\?|$)/, async route => {
    requested = true;
    held.push(route.request().url());
    await gate;
    await route.continue().catch(() => {});
  });
  const o = await observer(page);
  try {
    await page.goto(new URL('#/play/focus', baseUrl).toString(), { waitUntil: 'domcontentloaded' });
    // Raw CDP observation explicitly does not grant user activation. The cold
    // blocked precondition must pass before the first native click.
    await o.until(`!!document.querySelector('[data-playback-hint="blocked"]')`, 'A initially autoplay-blocked');
    await page.getByRole('button', { name: '축소', exact: true }).click();
    const bar = page.getByRole('region', { name: '현재 재생 중', exact: true });
    const originalTitle = await bar.locator('p').first().textContent();
    const card = page.locator('article').filter({ has: page.getByRole('heading', { name: '카페 집중', exact: true }) });
    await card.getByRole('button', { name: '재생', exact: true }).click();
    const deadline = Date.now() + 10_000;
    while (!requested && Date.now() < deadline) await delay(50);
    assert.ok(requested, 'B metadata response must actually be held');
    assert.ok(await o.read(`!!document.querySelector('p.fixed[role="status"]')`), 'B selection is pending before A retry');
    await bar.getByRole('button', { name: '재생', exact: true }).click();
    await o.until(`!!document.querySelector('section[aria-label="현재 재생 중"] button[aria-label="일시정지"]')`, 'A resumed');
    // This assertion catches the missing cancellation even before releasing B.
    await o.until(`!document.querySelector('p.fixed[role="status"]')`, 'A retry cancels fresh selection status', 3_000);
    const metadataResponse = page.waitForResponse(response => held.includes(response.url()) && response.ok(), { timeout: 30_000 });
    release();
    await metadataResponse;
    await delay(400);
    assert.equal(await bar.locator('p').first().textContent(), originalTitle, 'Late B does not replace the latest A intent');
    assert.equal(await o.read(`JSON.parse(localStorage.getItem('mc_brain_last') || 'null')?.worldId`), 'focus');
    return { prior: 'focus', cancelled: 'amb:focus_cafe', delayedRequests: held, titlePreserved: originalTitle };
  } finally { release(); await o.close().catch(() => {}); await context.close(); }
}

/** Read-only observation: no user activation, focus, scrolling or DOM mutation. */
async function scrollState(o) {
  return o.read(`(() => { const d=document.scrollingElement; return {x:scrollX,y:d?.scrollTop??scrollY,max:Math.max(0,(d?.scrollHeight??0)-innerHeight),width:innerWidth,height:innerHeight}; })()`);
}
async function settledScroll(o) {
  let previous=await scrollState(o),stable=0;
  const deadline=Date.now()+5000;
  while(Date.now()<deadline){await delay(100);const current=await scrollState(o);stable=Math.abs(current.y-previous.y)<.5?stable+1:0;previous=current;if(stable>=4)return current;}
  throw new Error('Native page scrolling did not settle within5s');
}
/** Only real wheel input changes document scroll. Read a fresh position after every wheel. */
async function wheelTo(page,o,targetY) {
  const trace=[];
  for(let i=0;i<18;i++){
    const before=await scrollState(o),target=Math.max(0,Math.min(targetY,before.max)),delta=target-before.y;
    if(Math.abs(delta)<=2)return {targetY:target,position:before,trace};
    // The outer4px page gutter avoids the details panel's nested scroller.
    await page.mouse.move(4,Math.min(before.height-4,Math.max(4,before.height*.45)));
    await page.mouse.wheel(0,Math.sign(delta)*Math.min(Math.abs(delta),before.height*.8));
    await delay(100);trace.push({before,after:await scrollState(o)});
  }
  throw new Error(`Real wheel failed to restore page: ${JSON.stringify({targetY,trace})}`);
}
async function observedSlot(o,selector) {
  return o.read(`(() => {const s=document.querySelector(${JSON.stringify(selector)}),canvas=s?.querySelector('canvas'),r=canvas?.getBoundingClientRect();return s&&r?{callbacks:Number(s.dataset.worldCallbacks),motion:s.querySelector('[data-motion]')?.dataset.motion,rect:{x:r.x,y:r.y,width:r.width,height:r.height}}:null;})()`);
}

/** Caller already opened details and retained all computed-style assertions.
 * The helper closes details by native mouse AFTER wheel makes that button visible,
 * then restores the caller's original page position with real wheel input.
 * sendTouch must preserve one CDP session for the complete native touch stream. */
export async function verifyNativeDetailsPanY(page,{selector,sendTouch,restoreScrollY=0}) {
  assert.equal(typeof sendTouch,'function');
  const o=await observer(page),trace={input:'CDP native touchStart/move/end; native wheel restore',wheel:[]};
  let touchHeld=false;
  try {
    // The app may scroll its newly opened details aside on narrow screens.
    trace.opened=await settledScroll(o);trace.wheel.push(await wheelTo(page,o,0));
    const before=await observedSlot(o,selector),scrollBefore=await settledScroll(o);
    assert.ok(before?.rect&&before.motion==='running','Pan-y is tested on a live scene');
    assert.ok(scrollBefore.max-scrollBefore.y>=4,'Real document must have vertical scroll range; unavailable precondition is not a pass');
    const p=await o.read(`(() => {
      const s=document.querySelector(${JSON.stringify(selector)}),r=s?.querySelector('canvas')?.getBoundingClientRect();if(!s||!r)return null;
      const top=Math.max(12,r.top),bottom=Math.min(innerHeight-16,r.bottom),distance=Math.min(220,(bottom-top)*.40);
      if(distance<80)return null;
      for(const nx of [.50,.28,.72]){const x=Math.max(12,Math.min(innerWidth-12,r.left+r.width*nx)),y=bottom-(bottom-top)*.22,hit=document.elementFromPoint(x,y);
        if(s.contains(hit)&&!hit.closest('button,input,select,textarea,a[href],[role="button"],[contenteditable="true"]'))return {x,y,endY:y-distance,distance,tag:hit.tagName};}
      return null;
    })()`);
    assert.ok(p,'Touch start must hit a visible, unobstructed scene with80px vertical room');
    trace.before={scene:before,scroll:scrollBefore};trace.path={...p,steps:12};
    await sendTouch('touchStart',p);touchHeld=true;
    for(let i=1;i<=12;i++){await sendTouch('touchMove',{x:p.x,y:p.y+(p.endY-p.y)*i/12});await delay(25);}
    await sendTouch('touchEnd',{x:p.x,y:p.endY});touchHeld=false;
    await delay(300);const scrollAfter=await settledScroll(o),after=await observedSlot(o,selector);
    const deltaY=scrollAfter.y-scrollBefore.y;
    assert.ok(deltaY>=3,`Native vertical touch must actually scroll document: ${JSON.stringify({scrollBefore,scrollAfter,p})}`);
    assert.equal(after.callbacks,before.callbacks,'A pan gesture must never become a scene tap callback');
    trace.after={scene:after,scroll:scrollAfter,deltaY,callbackDelta:after.callbacks-before.callbacks};
    trace.wheel.push(await wheelTo(page,o,0));
    // Avoid Locator.click's implicit scrolling: reveal close using only wheel.
    let closePoint=null;
    for(let i=0;i<18;i++){
      const button=await o.read(`(() => {const b=document.querySelector('button[aria-label="세션 조절 닫기"]');if(!b)return null;const r=b.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2,hit=document.elementFromPoint(x,y);return {x,y,visible:x>0&&x<innerWidth&&y>8&&y<innerHeight-8&&(hit===b||b.contains(hit)),height:innerHeight};})()`);
      assert.ok(button,'Details close button still exists');
      if(button.visible){closePoint=button;break;}
      const position=await scrollState(o);trace.wheel.push(await wheelTo(page,o,position.y+button.y-button.height*.5));
    }
    assert.ok(closePoint,'Real wheel must expose details close button');
    await page.mouse.click(closePoint.x,closePoint.y);
    await o.until(`!document.querySelector('button[aria-label="세션 조절 닫기"]')`,'details closed');
    trace.wheel.push(await wheelTo(page,o,restoreScrollY));
    trace.restored=await settledScroll(o);
    assert.ok(Math.abs(trace.restored.y-Math.min(restoreScrollY,trace.restored.max))<=2,'Page position restored through real wheel');
    assert.equal((await observedSlot(o,selector)).callbacks,before.callbacks,'Wheel and close control emit no scene callbacks');
    return trace;
  } finally {
    if(touchHeld)await sendTouch('touchCancel',{x:0,y:0}).catch(()=>{});
    await o.close();
  }
}

/** Call after actual modal Tab/Shift+Tab cycle. Only native keys change focus or activate. */
export async function verifyNativeWorldKeys(page,{selector,worldSelector='.water-edge',cooldown}) {
  assert.equal(typeof cooldown,'function','Caller supplies real scene-time/wall-clock cooldown');
  const o=await observer(page),trace=[];
  const focused=`(() => {const s=document.querySelector(${JSON.stringify(selector)}),e=document.activeElement;return !!s?.contains(e)&&e?.matches(${JSON.stringify(worldSelector)})&&e.tabIndex>=0&&e.getClientRects().length>0&&getComputedStyle(e).visibility==='visible';})()`;
  try {
    const navigationBefore=await observedSlot(o,selector);
    for(let i=0;i<64&&!await o.read(focused);i++)await page.keyboard.press('Tab');
    assert.ok(await o.read(focused),'Owned nonnegative-tabIndex target reached by actual Tab');
    assert.equal((await observedSlot(o,selector)).callbacks,navigationBefore.callbacks,'Tab navigation emits zero scene callbacks');
    for(const key of ['Enter','Space']){
      await cooldown();assert.ok(await o.read(focused),'Owned scene retains focus before activation');
      const before=await observedSlot(o,selector),scrollBefore=await scrollState(o);
      assert.equal(before.motion,'running','Keyboard activation precondition: world running');
      await page.keyboard.press(key);
      await o.until(`Number(document.querySelector(${JSON.stringify(selector)})?.dataset.worldCallbacks)>${before.callbacks}`,'native '+key+' callback',3000);
      await delay(180);const after=await observedSlot(o,selector),scrollAfter=await scrollState(o);
      assert.equal(after.callbacks-before.callbacks,1,'One native '+key+' must produce exactly one callback');
      assert.ok(await o.read(focused),'Native '+key+' keeps focus on the scene target');
      assert.equal(after.motion,'running','Scene keyboard action must not pause transport');
      assert.ok(Math.abs(scrollAfter.y-scrollBefore.y)<=2,'Scene Space/Enter must not scroll the modal page');
      trace.push({key,before,after,callbackDelta:1,scrollBefore,scrollAfter});
    }
    return {input:'native Tab then Enter/Space',worldSelector,trace};
  } finally {await o.close();}
}
