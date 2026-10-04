import { LiveSceneHost, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { CafeEngine } from './CafeEngine';

class CafeHost extends LiveSceneHost<CafeEngine> {
  constructor(){super({canvasClass:'cafe-world-canvas',isSupported:()=>{try{const gl=document.createElement('canvas').getContext('webgl2');const ok=!!gl?.getExtension('EXT_color_buffer_float');gl?.getExtension('WEBGL_lose_context')?.loseContext();return ok;}catch{return false;}},create:(canvas,lost)=>new CafeEngine(canvas,lost)});}
  interact(holder:LiveSceneHolder,x:number,y:number){return this.top===holder&&holder.running&&this.status==='ready'?this.engine?.interact(x,y)??null:null;}
}
export const cafeHost=new CafeHost();
