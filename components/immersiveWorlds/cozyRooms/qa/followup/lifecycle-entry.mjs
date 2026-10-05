import {CozyEngine} from '../../engine';

// QA only. No imported production file is edited: each wrapper observes
// entry/exit and delegates to the original implementation.
const events=[];
const mark=(type,detail={})=>events.push({type,at:performance.now(),...detail});
window.__cozyLifecycle={events,mark};
const dispose=CozyEngine.prototype.dispose;
CozyEngine.prototype.dispose=function(...args){
  mark('dispose-entry',{instance:this.instance});
  try{return dispose.apply(this,args);}
  finally{mark('dispose-exit',{instance:this.instance});}
};
const observedDetached=new WeakSet();
function connectedCanvases(node){
  if(!node?.isConnected)return [];
  const canvases=[...(node.matches?.('canvas.cozy-world-canvas')?[node]:[]),...node.querySelectorAll?.('canvas.cozy-world-canvas')||[]];
  for(const canvas of canvases)observedDetached.delete(canvas);
  return canvases;
}
function recordDetachment(canvases,method,startedAt,node){
  for(const canvas of canvases){
    if(canvas.isConnected||observedDetached.has(canvas))continue;
    observedDetached.add(canvas);
    mark('canvas-removal',{instance:canvas.dataset.instance,method,detachedNode:node===canvas?'canvas':'ancestor',detachedTag:node.nodeName,operationEntryAt:startedAt,wasConnected:true,isConnected:false});
  }
}
const remove=Element.prototype.remove,removeChild=Node.prototype.removeChild;
Element.prototype.remove=function(...args){
  const canvases=connectedCanvases(this),startedAt=performance.now();
  const result=remove.apply(this,args);
  recordDetachment(canvases,'Element.remove',startedAt,this);return result;
};
// React can remove the connected scene ancestor before passive effect cleanup
// calls host.release() and canvas.remove(). Observe that actual detach operation
// rather than waiting for a later remove() on an already detached canvas.
Node.prototype.removeChild=function(child,...args){
  const canvases=connectedCanvases(child),startedAt=performance.now();
  const result=removeChild.call(this,child,...args);
  recordDetachment(canvases,'Node.removeChild',startedAt,child);return result;
};
const setTimeout=window.setTimeout.bind(window),clearTimeout=window.clearTimeout.bind(window);
const trackedTimers=new Map();
window.setTimeout=function(callback,delay,...args){
  if(delay!==5000||typeof callback!=='function')return setTimeout(callback,delay,...args);
  let id;
  id=setTimeout(function(...callbackArgs){mark('retention-timer-fire',{id});trackedTimers.delete(id);return callback.apply(this,callbackArgs);},delay,...args);
  trackedTimers.set(id,true);mark('retention-timer-scheduled',{id,configuredDelayMs:delay});return id;
};
window.clearTimeout=function(id){if(trackedTimers.has(id)){mark('retention-timer-cancelled',{id});trackedTimers.delete(id);}return clearTimeout(id);};
const getContext=HTMLCanvasElement.prototype.getContext,contexts=new WeakSet();
HTMLCanvasElement.prototype.getContext=function(...args){
  const context=getContext.apply(this,args);
  if(context&&args[0]==='webgl2'&&!contexts.has(context)){
    contexts.add(context);mark('context-created');
    this.addEventListener('webglcontextlost',event=>mark('context-loss-observed',{isTrusted:event.isTrusted,instance:this.dataset.instance}));
  }
  return context;
};
let previous=performance.now();
window.setInterval(()=>{const now=performance.now();mark('heartbeat',{lagMs:Math.max(0,now-previous-100)});previous=now;},100);
void import('../main.tsx');
