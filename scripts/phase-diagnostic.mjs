import { appendFileSync } from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

/** Node/DOM observations only. No launch, renderer call, GL fence or app mutation. */
export function createPhaseDiagnostic(output) {
  const file=path.join(output,'phase-timing.jsonl'),pending=new Map();let sequence=0,session,timer,heartbeatPending=false,stopped=false;
  const log=(kind,fields={})=>appendFileSync(file,JSON.stringify({kind,nodeMs:performance.now(),wallISO:new Date().toISOString(),...fields})+'\n');
  const phase=async(label,work)=>{
    const id=++sequence,start=performance.now();pending.set(id,{id,label,startNodeMs:start});log('call-send',{id,label});
    try{const value=await work();log('call-ack',{id,label,durationMs:performance.now()-start});return value;}
    catch(error){log('call-error',{id,label,durationMs:performance.now()-start,error:String(error)});throw error;}
    finally{pending.delete(id);}
  };
  async function heartbeat(selector,reason='interval'){
    if(stopped||!session)return;
    if(heartbeatPending){log('heartbeat-previous-still-pending',{reason,pending:[...pending.values()]});return;}
    heartbeatPending=true;const id=++sequence,start=performance.now();log('heartbeat-send',{id,reason,pending:[...pending.values()]});
    // The raw Runtime.evaluate timeout and independent Node5s marker describe
    // observation responsiveness; neither relaxes the existing180s scene gate.
    const expired=setTimeout(()=>log('heartbeat-timeout',{id,timeoutMs:5000,pending:[...pending.values()]}),5000);
    try{
      const result=await session.send('Runtime.evaluate',{userGesture:false,returnByValue:true,timeout:5000,expression:`(() => {
        const s=document.querySelector(${JSON.stringify(selector)}),w=s?.querySelector('[data-state]'),canvas=s?.querySelector('canvas'),chrome=s?.closest('[data-scene-surface]')?.querySelector(':scope > [data-scene-drag]');
        const a=window.__integrationNativeInputAudit;
        return {performanceMs:performance.now(),wallMs:Date.now(),readyState:document.readyState,hidden:document.hidden,scrollY,
          state:w?.dataset.state,motion:w?.dataset.motion,callbacks:Number(s?.dataset.worldCallbacks),canvas:canvas?{...canvas.dataset}:null,
          chrome:chrome?{visibility:getComputedStyle(chrome).visibility,opacity:getComputedStyle(chrome).opacity}:null,
          active:{tag:document.activeElement?.tagName,label:document.activeElement?.getAttribute('aria-label')},
          inputTail:a?.events.slice(-8),callbackTail:a?.callbacks.slice(-4)};
      })()`});
      log('heartbeat-ack',{id,durationMs:performance.now()-start,exception:result.exceptionDetails??null,state:result.result.value??null});
    }catch(error){log('heartbeat-error',{id,durationMs:performance.now()-start,error:String(error)});}
    finally{clearTimeout(expired);heartbeatPending=false;}
  }
  return {phase,log,pending:()=>[...pending.values()],
    async start(page,selector){stopped=false;session=await page.context().newCDPSession(page);log('diagnostic-start',{selector,heartbeatMs:5000});void heartbeat(selector,'start');timer=setInterval(()=>{void heartbeat(selector);},5000);},
    async stop(){stopped=true;clearInterval(timer);log('diagnostic-stop',{pending:[...pending.values()],heartbeatPending});if(session){let timeout;await Promise.race([session.detach().catch(error=>log('detach-error',{error:String(error)})),new Promise(resolve=>{timeout=setTimeout(resolve,1000);})]);clearTimeout(timeout);}},
  };
}
