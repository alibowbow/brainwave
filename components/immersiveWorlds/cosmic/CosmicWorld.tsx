import { useEffect, useRef, useState } from 'react';
import type { BackgroundSoundType } from '../../../types';
import { useSceneMotion } from '../../useSceneMotion';
import { useLookDrag } from '../../liveScene/useLookDrag';
import type { LiveSceneHolder, LiveSceneStatus } from '../../liveScene/liveSceneHost';
import { cosmicHost } from './cosmicHost';
import type { CosmicTouch } from './CosmicEngine';
import './cosmic.css';

export interface CosmicWorldProps{
  active:boolean;
  onInteract?:(event:CosmicTouch)=>void;
  subscribeEvents?:(listener:(type:BackgroundSoundType)=>void)=>()=>void;
}

/** amb:cosmic — an intimate living garden suspended in a quiet celestial sky. */
export default function CosmicWorld({active,onInteract,subscribeEvents}:CosmicWorldProps){
  const rootRef=useRef<HTMLDivElement>(null),mountRef=useRef<HTMLDivElement>(null);
  const holderRef=useRef<LiveSceneHolder|null>(null);
  const callback=useRef(onInteract);callback.current=onInteract;
  const [status,setStatus]=useState<LiveSceneStatus>('loading');
  const [visible,setVisible]=useState(true);
  const motion=useSceneMotion(active&&visible);
  useEffect(()=>{
    const root=rootRef.current;if(!root||typeof IntersectionObserver==='undefined')return;
    const observer=new IntersectionObserver(entries=>setVisible(entries.some(e=>e.isIntersecting)),{threshold:0});
    observer.observe(root);return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!mountRef.current)return;
    const holder:LiveSceneHolder={mount:mountRef.current,running:false,onStatus:setStatus};holderRef.current=holder;
    const release=cosmicHost.acquire(holder);
    return()=>{holderRef.current=null;release();};
  },[]);
  useEffect(()=>{if(holderRef.current)cosmicHost.setRunning(holderRef.current,motion);},[motion,status]);
  useLookDrag(cosmicHost,rootRef,holderRef,motion);
  useEffect(()=>{
    const root=rootRef.current;if(!root||!motion)return;
    let down:{x:number;y:number;id:number;moved:boolean}|null=null;
    const start=(e:PointerEvent)=>{if(e.isPrimary&&e.button===0&&e.target instanceof HTMLCanvasElement)down={x:e.clientX,y:e.clientY,id:e.pointerId,moved:false};};
    const move=(e:PointerEvent)=>{if(down&&e.pointerId===down.id&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>8)down.moved=true;};
    const end=(e:PointerEvent)=>{
      const press=down;if(!press||press.id!==e.pointerId)return;down=null;if(press.moved||Math.hypot(e.clientX-press.x,e.clientY-press.y)>8||!holderRef.current)return;
      const box=root.getBoundingClientRect();
      const event=cosmicHost.touch(holderRef.current,(e.clientX-box.left)/box.width*2-1,1-(e.clientY-box.top)/box.height*2);
      if(event)callback.current?.(event);
    };
    const cancel=()=>{down=null;};
    root.addEventListener('pointerdown',start);window.addEventListener('pointermove',move);window.addEventListener('pointerup',end);window.addEventListener('pointercancel',cancel);
    return()=>{root.removeEventListener('pointerdown',start);window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',end);window.removeEventListener('pointercancel',cancel);};
  },[motion]);
  useEffect(()=>{
    if(!motion||!subscribeEvents)return;
    return subscribeEvents(type=>{if((type==='bowl'||type==='chimes')&&holderRef.current)cosmicHost.soundEvent(holderRef.current);});
  },[motion,subscribeEvents]);
  const touch=()=>{if(!holderRef.current)return;const event=cosmicHost.touchNearest(holderRef.current);if(event)callback.current?.(event);};
  return <div ref={rootRef} className="cosmic-world" data-state={status} data-motion={motion?'running':'paused'} aria-label="우주 공중정원 — 잎과 물, 행성이 있는 고요한 공간">
    <div className="cosmic-world-fallback" aria-hidden="true" />
    <div className="cosmic-world-mount" ref={mountRef}/>
    {status==='ready'&&motion?<button className="cosmic-world-access" onPointerDownCapture={e=>e.stopPropagation()} onClick={touch}>가까운 빛에 손길 보내기</button>:null}
    {status==='loading'?<span className="cosmic-world-status" role="status">공중정원을 준비하고 있어요</span>:null}
    {status==='failed'?<span className="cosmic-world-status" role="status">이 환경에서는 공중정원의 3D 화면을 표시할 수 없어요.</span>:null}
  </div>;
}
