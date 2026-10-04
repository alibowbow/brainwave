import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import CafeWorld from '../CafeWorld';
import {cafeHost} from '../cafeHost';
const targetPreference=new URLSearchParams(location.search).get('targets')==='byte'?'byte':'auto';
cafeHost.setTargetPreferenceForQA(targetPreference);
Object.assign(window,{cafeQA:{verifyTargetState:()=>cafeHost.verifyTargetStateForQA()}});
function Harness(){const [active,setActive]=useState(!new URLSearchParams(location.search).has('paused')),[full,setFull]=useState(false),[mounted,setMounted]=useState(true),[event,setEvent]=useState('');return <>
  <main data-scene-surface style={{position:'absolute',inset:0}}>{mounted&&<CafeWorld active={active} onInteraction={setEvent}/>}</main>
  {full&&mounted&&<section id="fullscreen" data-scene-surface aria-label="몰입 화면"><CafeWorld active={active} onInteraction={setEvent}/></section>}
  <div className="label"><small>RAINY EVENING · WINDOW SEAT</small><h1>Café focus</h1><span>40 min</span></div>
  <nav><button onClick={()=>setActive(v=>!v)}>{active?'Pause':'Resume'}</button><button onClick={()=>setFull(v=>!v)}>{full?'Exit fullscreen':'Fullscreen holder'}</button><button onClick={()=>setMounted(v=>!v)}>{mounted?'Unmount':'Mount'}</button><button onClick={()=>document.documentElement.classList.toggle('reduce-motion')}>Reduced motion</button><output data-interaction>{event}</output></nav>
</>};createRoot(document.getElementById('root')!).render(<React.StrictMode><Harness/></React.StrictMode>);
