import assert from 'node:assert/strict';
/** Actual browser hit-testing of the same sibling overlay structure as Player. */
export async function verifyChrome(page,world,point){
  const set=(key,value)=>page.evaluate(([k,v])=>window.__cozyQA[k](v),[key,value]);
  await set('setStatic',true);await set('setChrome',true);await page.waitForSelector('main>[data-scene-drag]');
  const tap=()=>page.evaluate(({x,y})=>{const target=document.elementFromPoint(x,y);if(!target?.hasAttribute('data-scene-drag'))throw new Error('mesh point is not covered by transparent chrome');const init={bubbles:true,isPrimary:true,pointerId:111,pointerType:'touch',button:0,clientX:x,clientY:y};target.dispatchEvent(new PointerEvent('pointerdown',init));window.dispatchEvent(new PointerEvent('pointerup',init));},point);
  let n=await page.evaluate(()=>window.__cozyQA.events.length);await tap();assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),n+1,'chrome overlay tap reaches exactly one scene holder');
  await set('setStatic',false);await page.waitForFunction(()=>window.__cozyQA.inspect().running);
  const drag=await page.evaluate(()=>{const target=document.querySelector('main>[data-scene-drag]'),root=document.querySelector('main .cozy-world');const e={bubbles:true,isPrimary:true,pointerId:112,pointerType:'touch',button:0,clientX:480,clientY:300};target.dispatchEvent(new PointerEvent('pointerdown',e));window.dispatchEvent(new PointerEvent('pointermove',{...e,clientX:570}));const during=root.dataset.look;window.dispatchEvent(new PointerEvent('pointerup',{...e,clientX:570}));return{during,after:root.dataset.look??null};});
  assert.equal(drag.during,'drag');assert.equal(drag.after,null);assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),n+1,'chrome drag is not tap');
  // Chrome descendants include both real controls and non-interactive timer text.
  const ignored=await page.evaluate(()=>{let flags=[];for(const target of document.querySelectorAll('.qa-controls button,.qa-controls input,.qa-controls a,.qa-controls span')){const e={bubbles:true,isPrimary:true,pointerId:113,pointerType:'touch',button:0,clientX:480,clientY:300};target.dispatchEvent(new PointerEvent('pointerdown',e));window.dispatchEvent(new PointerEvent('pointermove',{...e,clientX:550}));flags.push(document.querySelector('.cozy-world').dataset.look??null);window.dispatchEvent(new PointerEvent('pointerup',{...e,clientX:550}));}return flags;});assert.ok(ignored.every(x=>x===null),'buttons/range/link/timer chrome never drag the scene');
  assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),n+1);
  await page.locator('main .qa-controls button').click();assert.equal(await page.evaluate(()=>window.__cozyQA.chromeClicks()),1,'chrome keeps its own click behavior');
  await set('setStatic',true);await page.waitForFunction(()=>!window.__cozyQA.inspect().running);
  n=await page.evaluate(()=>window.__cozyQA.events.length);
  for(const ending of ['pointercancel','blur','coalesced-up']){
    await page.evaluate(({x,y,ending})=>{const target=document.elementFromPoint(x,y),e={bubbles:true,isPrimary:true,pointerId:114,pointerType:'touch',button:0,clientX:x,clientY:y};target.dispatchEvent(new PointerEvent('pointerdown',e));if(ending==='blur')window.dispatchEvent(new Event('blur'));else if(ending==='pointercancel')window.dispatchEvent(new PointerEvent('pointercancel',e));window.dispatchEvent(new PointerEvent('pointerup',{...e,clientX:ending==='coalesced-up'?x+80:x}));},{...point,ending});
    assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),n,`${ending} over visible chrome never taps`);
  }
  const instance=await page.evaluate(()=>window.__cozyQA.inspect().instance);
  for(let i=0;i<2;i++){
    await set('setSecond',true);await page.waitForSelector('.second canvas');assert.equal(await page.locator('canvas').count(),1);assert.equal(await page.evaluate(()=>window.__cozyQA.inspect().instance),instance);
    // Synthetic event deliberately targeted at obscured underlying holder.
    await page.evaluate(({x,y})=>{const t=document.querySelector('main>[data-scene-drag]'),e={bubbles:true,isPrimary:true,pointerId:115,pointerType:'touch',button:0,clientX:x,clientY:y};t.dispatchEvent(new PointerEvent('pointerdown',e));window.dispatchEvent(new PointerEvent('pointerup',e));},point);
    assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),n,'covered holder does not react');
    await tap();assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),++n,'immersive overlay has one handler');
    await set('setSecond',false);await page.waitForSelector('main canvas');await tap();assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),++n,'restored player has one handler');
  }
  await set('setMounted',false);await page.waitForFunction(()=>!document.querySelector('canvas'));await set('setMounted',true);await page.waitForSelector('[data-state="ready"] canvas');
  await tap();assert.equal(await page.evaluate(()=>window.__cozyQA.events.length),++n,'remount does not duplicate surface handlers');
  assert.ok(await page.evaluate(w=>window.__cozyQA.events.every(e=>e.world===w),world));
  return ['chrome-overlay-hit-tested-tap','chrome-overlay-drag','chrome-controls-excluded','chrome-own-button-click','chrome-cancel-and-blur','coalesced-up-not-tap','covered-holder-no-input','chrome-second-holder-one-handler','chrome-restored-holder-one-handler','chrome-remount-one-handler'];
}
