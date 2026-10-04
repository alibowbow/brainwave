import React,{useState,Suspense,lazy} from 'react';
import {createRoot} from 'react-dom/client';
import {inspectCozyWorld} from '../engine';
import type {CozyInteraction,CozyWorldId} from '../contracts';
const modules=import.meta.glob('../*World.tsx');
const entries={relax:'HearthWorld',sleep_prep:'SleepRoomWorld',power_nap:'NapTerraceWorld','nature:winter_lodge':'WinterLodgeWorld'};
const components=Object.fromEntries(Object.entries(entries).map(([id,name])=>[id,lazy(modules[`../${name}.tsx`] as any)]));
const params=new URLSearchParams(location.search);const initial=(params.get('world')||'relax') as CozyWorldId;
const events:CozyInteraction[]=[];
function Harness(){const [world,setWorld]=useState(initial),[active,setActive]=useState(false),[static3D,setStatic]=useState(false),[second,setSecond]=useState(false),[mounted,setMounted]=useState(true);const Component=components[world];
Object.assign(window,{__cozyQA:{setWorld,setActive,setStatic,setSecond,setMounted,events,inspect:()=>inspectCozyWorld(world)}});
const props={active,static3D,onInteraction:(event:CozyInteraction)=>events.push(event)};
return <><main>{mounted&&<Suspense fallback={null}><Component {...props}/></Suspense>}</main>{second&&<aside className="second" aria-label="몰입 화면"><Suspense fallback={null}><Component {...props}/></Suspense></aside>}</>;}
createRoot(document.getElementById('root')!).render(<Harness/>);
