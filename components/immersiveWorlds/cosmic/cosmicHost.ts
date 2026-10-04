import { LiveSceneHost, type LiveSceneHolder } from '../../liveScene/liveSceneHost';
import { CosmicEngine } from './CosmicEngine';

class CosmicHost extends LiveSceneHost<CosmicEngine>{
  constructor(){super({canvasClass:'cosmic-world-canvas',isSupported:()=>CosmicEngine.isSupported(),create:(canvas,onContextLost)=>new CosmicEngine({canvas,onContextLost})});}
  touch(holder:LiveSceneHolder,x:number,y:number){return this.top===holder&&holder.running?this.engine?.touch(x,y)??null:null;}
  touchNearest(holder:LiveSceneHolder){return this.top===holder&&holder.running?this.engine?.touchNearest()??null:null;}
  soundEvent(holder:LiveSceneHolder){if(this.top===holder&&holder.running)this.engine?.soundEvent();}
}
export const cosmicHost=new CosmicHost();
