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
    const element=root.current,h=holder.current;if(!element||!h||status!=='ready')return;
    let pointer:{id:number;x:number;y:number;start:number;moved:boolean}|null=null;
    const finish=(event?:PointerEvent,cancel=false)=>{if(!pointer||(event&&event.pointerId!==pointer.id))return;const p=pointer;pointer=null;delete element.dataset.look;host.releaseDrag(h);if(!cancel&&event&&!p.moved&&performance.now()-p.start<650&&allowed.current&&!document.hidden){const result=host.tap(h,event.clientX,event.clientY);if(result)callback.current?.({world:id,...result});}window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',cancelPointer);window.removeEventListener('blur',blur);};
    const move=(e:PointerEvent)=>{if(!pointer||e.pointerId!==pointer.id)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;if(Math.hypot(dx,dy)>7)pointer.moved=true;if(pointer.moved&&motion){element.dataset.look='drag';const unit=Math.max(1,Math.min(element.clientWidth,element.clientHeight));host.drag(h,dx/unit,dy/unit);}};
    const up=(e:PointerEvent)=>finish(e);const cancelPointer=(e:PointerEvent)=>finish(e,true);const blur=()=>finish(undefined,true);
    const down=(e:PointerEvent)=>{if(pointer||!e.isPrimary||e.button!==0||!allowed.current||document.hidden)return;const target=e.target as Element;if(target.closest('button'))return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY,start:performance.now(),moved:false};window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',cancelPointer);window.addEventListener('blur',blur);};
    element.addEventListener('pointerdown',down);return()=>{element.removeEventListener('pointerdown',down);finish(undefined,true);};
  },[host,id,motion,status]);
  const action=(key:string)=>{if(!holder.current||!active||document.hidden)return;const event=host.action(holder.current,key);if(event)callback.current?.({world:id,...event});};
  return <div ref={root} className={`cozy-world ${className}`} data-world={id} data-state={status} data-motion={motion?'running':'paused'} role="group" aria-label={`${names[id]} 3D 공간`}>
    <div className="cozy-world-mount" ref={mount}/>
    {status!=='ready'&&<div className="cozy-world-status" role="status">{status==='failed'?'이 환경에서는 3D 화면을 표시할 수 없어요.':`${names[id]} 공간을 준비하고 있어요`}</div>}
    <div className="cozy-world-access">{actions[id].map(([key,label])=><button key={key} type="button" disabled={!active||status!=='ready'} onClick={()=>action(key)}>{label}</button>)}</div>
  </div>;
}
