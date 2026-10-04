import React,{useState,Suspense,lazy} from 'react';
import {createRoot} from 'react-dom/client';
import {inspectCozyWorld} from '../engine';
import type {CozyInteraction,CozyWorldId} from '../contracts';
const modules=import.meta.glob('../*World.tsx');
const entries={relax:'HearthWorld',sleep_prep:'SleepRoomWorld',power_nap:'NapTerraceWorld','nature:winter_lodge':'WinterLodgeWorld'};
const components=Object.fromEntries(Object.entries(entries).map(([id,name])=>[id,lazy(modules[`../${name}.tsx`] as any)]));
const params=new URLSearchParams(location.search);const initial=(params.get('world')||'relax') as CozyWorldId;
const events:CozyInteraction[]=[];let chromeClicks=0;
function Chrome(){return <div data-scene-drag className="qa-chrome"><div className="qa-controls"><button onClick={()=>chromeClicks++}>재생 조절</button><input aria-label="음량" type="range" defaultValue={30}/><a href="#qa-controls" onClick={e=>e.preventDefault()}>설정</a><span>19:59</span></div></div>;}
function Harness(){const [world,setWorld]=useState(initial),[active,setActive]=useState(false),[static3D,setStatic]=useState(false),[second,setSecond]=useState(false),[mounted,setMounted]=useState(true),[chrome,setChrome]=useState(false);const Component=components[world];
Object.assign(window,{__cozyQA:{setWorld,setActive,setStatic,setSecond,setMounted,setChrome,events,chromeClicks:()=>chromeClicks,inspect:()=>inspectCozyWorld(world)}});
const props={active,static3D,onInteraction:(event:CozyInteraction)=>events.push(event)};
return <><main data-scene-surface><div className="qa-scene-layer">{mounted&&<Suspense fallback={null}><Component {...props}/></Suspense>}</div>{chrome&&<Chrome/>}</main>{second&&<aside className="second" data-scene-surface aria-label="몰입 화면"><div className="qa-scene-layer"><Suspense fallback={null}><Component {...props}/></Suspense></div>{chrome&&<Chrome/>}</aside>}</>;}
createRoot(document.getElementById('root')!).render(<Harness/>);
