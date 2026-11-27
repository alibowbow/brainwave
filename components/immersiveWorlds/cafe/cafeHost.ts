import { LiveSceneHost, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { CafeEngine, type CafePostPreference } from './CafeEngine';
import type { CafeTargetPreference } from './renderTargets';

class CafeHost extends LiveSceneHost<CafeEngine> {
  private targetPreference:CafeTargetPreference='auto';
  private postPreference:CafePostPreference='auto';
  constructor(){super({canvasClass:'cafe-world-canvas',isSupported:()=>{try{const gl=document.createElement('canvas').getContext('webgl2');const ok=!!gl;gl?.getExtension('WEBGL_lose_context')?.loseContext();return ok;}catch{return false;}},create:(canvas,lost)=>new CafeEngine(canvas,lost,this.targetPreference,this.postPreference)});}
  setTargetPreferenceForQA(preference:CafeTargetPreference){if(this.engine)throw new Error('Choose target policy before creating the cafe engine');this.targetPreference=preference;}
  /** Harness-only: 'off' keeps the direct renderer for before/after comparisons. */
  setPostPreferenceForQA(preference:CafePostPreference){if(this.engine)throw new Error('Choose post policy before creating the cafe engine');this.postPreference=preference;}
  verifyTargetStateForQA(){return this.engine?.verifyTargetStateForQA();}
  interactionPointsForQA(){return this.engine?.interactionPointsForQA();}
  advanceForQA(seconds:number){return this.engine?.advanceForQA(seconds);}
  interact(holder:LiveSceneHolder,x:number,y:number){return this.top===holder&&holder.running&&this.status==='ready'?this.engine?.interact(x,y)??null:null;}
}
export const cafeHost=new CafeHost();
