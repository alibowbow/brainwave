import React,{useEffect,useRef,useState} from 'react';
import { useSceneMotion } from '../../useSceneMotion';
import type { LiveSceneHolder,LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { cozyHost } from './engine';
import type { CozyWorldProps,CozyWorldId,WorldFactory } from './contracts';
import './cozyRooms.css';
const names:Record<CozyWorldId,string>={relax:'불멍 힐링',sleep_prep:'수면 준비',power_nap:'파워 냅','nature:winter_lodge':'겨울 산장'};
const actions:Record<CozyWorldId,Array<[string,string]>>={relax:[['log','장작 살짝 건드리기']],sleep_prep:[['lamp','침대 옆 조명 조절'],['curtain','커튼 틈 조절']],power_nap:[['canopy','차양 살짝 흔들기']],'nature:winter_lodge':[['lamp','산장 조명 조절'],['cup','찻잔 살짝 건드리기'],['log','장작 살짝 건드리기']]};
export function CozyWorld({active,onInteraction,static3D=false,className='',id,factory}:CozyWorldProps&{id:CozyWorldId;factory:WorldFactory}){
  const root=useRef<HTMLDivElement>(null),mount=useRef<HTMLDivElement>(null),holder=useRef<LiveSceneHolder|null>(null);
  const callback=useRef(onInteraction); callback.current=onInteraction;
  const [status,setStatus]=useState<LiveSceneStatus>('loading');
  const motion=useSceneMotion(active&&!static3D),host=cozyHost(id,factory);
  const allowed=useRef(active);allowed.current=active;
  useEffect(()=>{if(!mount.current)return;const h:LiveSceneHolder={mount:mount.current,running:false,onStatus:setStatus};holder.current=h;const release=host.acquire(h);return()=>{holder.current=null;release();};},[host]);
  useEffect(()=>{if(holder.current)host.setRunning(holder.current,motion);},[motion,status,host]);
  useEffect(()=>{
    const element=root.current,h=holder.current;
    if(!element||!h||status!=='ready')return;
    // Player and ImmersiveMode put a transparent drag layer beside the backdrop.
    // Listen at their surface, but never turn their controls into scene input.
    const surface=element.closest<HTMLElement>('[data-scene-surface]')??element;
    const controls='button,a,input,select,textarea,summary,[inert],[contenteditable]:not([contenteditable="false"]),[role="button"],[role="link"],[role="checkbox"],[role="radio"],[role="switch"],[role="slider"],[role="spinbutton"],[role="textbox"],[role="searchbox"],[role="combobox"],[role="listbox"],[role="option"],[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"],[role="tab"],[role="treeitem"],[role="scrollbar"]';
    // The shared host moves its only canvas to the top holder. Inactive holders
    // may share a surface, so reject their input before tracking a pointer.
    const ownsCanvas=()=>h.mount.querySelector('canvas.cozy-world-canvas')?.parentElement===h.mount;
    let pointer:{id:number;x:number;y:number;start:number;maxDistance:number}|null=null;
    const finish=(event?:PointerEvent,cancel=false)=>{
      if(!pointer||(event&&event.pointerId!==pointer.id))return;
      const p=pointer;
      if(event)p.maxDistance=Math.max(p.maxDistance,Math.hypot(event.clientX-p.x,event.clientY-p.y));
      pointer=null;delete element.dataset.look;host.releaseDrag(h);
      window.removeEventListener('pointermove',move);
      window.removeEventListener('pointerup',up);
      window.removeEventListener('pointercancel',cancelPointer);
      window.removeEventListener('blur',blur);
      if(cancel||!event||p.maxDistance>7||performance.now()-p.start>=650||!allowed.current||document.hidden||!ownsCanvas())return;
      const bounds=h.mount.getBoundingClientRect();
      if(bounds.width<=0||bounds.height<=0||event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)return;
      const result=host.tap(h,event.clientX,event.clientY);
      if(result)callback.current?.({world:id,...result});
    };
    const move=(event:PointerEvent)=>{
      if(!pointer||event.pointerId!==pointer.id)return;
      if(!allowed.current||document.hidden||!ownsCanvas()){finish(undefined,true);return;}
      const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;
      pointer.maxDistance=Math.max(pointer.maxDistance,Math.hypot(dx,dy));
      if(pointer.maxDistance>7&&motion){
        element.dataset.look='drag';
        const unit=Math.max(1,Math.min(element.clientWidth,element.clientHeight));
        host.drag(h,dx/unit,dy/unit);
      }
    };
    const up=(event:PointerEvent)=>finish(event);
    const cancelPointer=(event:PointerEvent)=>finish(event,true);
    const blur=()=>finish(undefined,true);
    const down=(event:PointerEvent)=>{
      if(pointer||!event.isPrimary||event.button!==0||!allowed.current||document.hidden||!ownsCanvas())return;
      const target=event.target instanceof Element?event.target:null;
      if(!target||target.closest(controls))return;
      if(!(element.contains(target)||target.hasAttribute('data-scene-drag')))return;
      // Do not accept a nested or unrelated scene surface that happens to bubble here.
      if(!element.contains(target)&&target.closest('[data-scene-surface]')!==surface)return;
      const bounds=h.mount.getBoundingClientRect();
      if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)return;
      if(event.pointerType==='mouse')event.preventDefault();
      pointer={id:event.pointerId,x:event.clientX,y:event.clientY,start:performance.now(),maxDistance:0};
      window.addEventListener('pointermove',move);
      window.addEventListener('pointerup',up);
      window.addEventListener('pointercancel',cancelPointer);
      window.addEventListener('blur',blur);
    };
    surface.addEventListener('pointerdown',down);element.dataset.input='ready';
    return()=>{delete element.dataset.input;surface.removeEventListener('pointerdown',down);finish(undefined,true);};
  },[host,id,motion,status,active]);
  const action=(key:string)=>{if(!holder.current||!active||document.hidden)return;const event=host.action(holder.current,key);if(event)callback.current?.({world:id,...event});};
  return <div ref={root} className={`cozy-world ${className}`} data-world={id} data-state={status} data-motion={motion?'running':'paused'} role="group" aria-label={`${names[id]} 3D 공간`}>
    <div className="cozy-world-mount" ref={mount}/>
    {status!=='ready'&&<div className="cozy-world-status" role="status">{status==='failed'?'이 환경에서는 3D 화면을 표시할 수 없어요.':`${names[id]} 공간을 준비하고 있어요`}</div>}
    <div className="cozy-world-access">{actions[id].map(([key,label])=><button key={key} type="button" disabled={!active||status!=='ready'} onClick={()=>action(key)}>{label}</button>)}</div>
  </div>;
}
