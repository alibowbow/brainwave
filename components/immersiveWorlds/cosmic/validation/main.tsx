import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import CosmicWorld from '../CosmicWorld';
import type {BackgroundSoundType} from '../../../../types';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import './validation.css';
const listeners=new Set<(t:BackgroundSoundType)=>void>();
function Harness(){
 const [active,setActive]=useState(true),[mounted,setMounted]=useState(true),[second,setSecond]=useState(false),[events,setEvents]=useState(0);
 const clean=new URLSearchParams(location.search).has('clean');
 return <main><section className="garden-stage" data-scene-surface>{mounted&&<CosmicWorld active={active} onInteract={()=>setEvents(n=>n+1)} subscribeEvents={cb=>{listeners.add(cb);return()=>{listeners.delete(cb);};}}/>}</section>
 {second&&<section className="garden-second" data-scene-surface><CosmicWorld active={active}/></section>}
 {!clean&&<nav aria-label="Validation controls"><span>공중정원 · 우주 명상</span><button onClick={()=>setActive(v=>!v)}>{active?'Pause':'Resume'}</button><button onClick={()=>{setMounted(v=>!v);setSecond(false);}}>{mounted?'Unmount':'Mount'}</button><button onClick={()=>setSecond(v=>!v)}>Second holder</button><button onClick={()=>listeners.forEach(cb=>cb('bowl'))}>Bowl event</button><output data-testid="interaction-count">{events}</output></nav>}
 </main>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><Harness/></React.StrictMode>);
