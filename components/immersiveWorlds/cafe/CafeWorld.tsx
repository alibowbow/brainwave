import { useEffect, useRef, useState } from 'react';
import { useSceneMotion } from '../../useSceneMotion';
import { useLookDrag } from '../../liveScene/useLookDrag';
import type { LiveSceneHolder, LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { cafeHost } from './cafeHost';
import type { CafeInteraction } from './world';
import './cafe.css';

export type { CafeInteraction } from './world';
export interface CafeWorldProps {
  active:boolean;
  /** Optional event for the EXISTING audio engine; this scene creates no audio objects. */
  onInteraction?:(event:CafeInteraction)=>void;
}
/** amb:focus_cafe · 카페 집중 · default duration 40 min (catalog owned by integrator). */
export default function CafeWorld({active,onInteraction}:CafeWorldProps){
  const root=useRef<HTMLDivElement>(null),mount=useRef<HTMLDivElement>(null),holder=useRef<LiveSceneHolder|null>(null);
  const [status,setStatus]=useState<LiveSceneStatus>('loading');const motion=useSceneMotion(active);
  useEffect(()=>{if(!mount.current)return;const h={mount:mount.current,running:false,onStatus:setStatus};holder.current=h;const release=cafeHost.acquire(h);return()=>{holder.current=null;release();};},[]);
  useEffect(()=>{if(holder.current)cafeHost.setRunning(holder.current,motion);},[motion,status]);
  useLookDrag(cafeHost,root,holder,motion);
  useEffect(()=>{
    const el=root.current;if(!el||!motion)return;
    let press:{x:number;y:number;id:number;time:number;distance:number}|null=null;
    const down=(e:PointerEvent)=>{if(e.isPrimary&&e.button===0)press={x:e.clientX,y:e.clientY,id:e.pointerId,time:performance.now(),distance:0};};
    const move=(e:PointerEvent)=>{if(press&&press.id===e.pointerId)press.distance=Math.max(press.distance,Math.hypot(e.clientX-press.x,e.clientY-press.y));};
    const up=(e:PointerEvent)=>{const p=press;press=null;if(!p||p.id!==e.pointerId||p.distance>8||Math.hypot(e.clientX-p.x,e.clientY-p.y)>8||performance.now()-p.time>600||!holder.current)return;const r=el.getBoundingClientRect();const kind=cafeHost.interact(holder.current,(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);if(kind)onInteraction?.(kind);};
    const cancel=()=>{press=null;};el.addEventListener('pointerdown',down);window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',cancel);
    return()=>{el.removeEventListener('pointerdown',down);window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',cancel);};
  },[motion,onInteraction]);
  return <div ref={root} className="cafe-world" data-state={status} data-motion={motion?'running':'paused'} role="img" aria-label="비 오는 저녁, 따뜻한 조명과 커피가 있는 카페 창가. 멀리 손님들이 조용히 앉아 있습니다.">
    <div ref={mount} className="cafe-world-mount" />
    {status!=='ready'&&<span className="cafe-world-status" role="status">{status==='failed'?'이 기기에서 카페 3D 화면을 표시할 수 없습니다.':'카페 창가를 준비하고 있어요'}</span>}
  </div>;
}
