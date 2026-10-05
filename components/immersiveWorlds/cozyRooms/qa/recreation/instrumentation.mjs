import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFile,mkdir,writeFile,appendFile} from 'node:fs/promises';
import {sourceDigest,digest,gitHead,sha256,qa} from '../followup/common.mjs';

export const here=path.dirname(fileURLToPath(import.meta.url));
export {qa};
const engineFile=path.resolve(qa,'../engine.ts');
const hostFile=path.resolve(qa,'../../../liveScene/liveSceneHost.ts');
function once(source,needle,replacement,label){
 if(source.split(needle).length!==2)throw new Error(`Instrumentation anchor changed: ${label}`);
 return source.replace(needle,replacement);
}
export function diagnosticPlugin(transforms=[]){
 return {name:'cozy-recreation-observation-only',enforce:'pre',
  transformIndexHtml:{order:'pre',handler(html){return once(html,'src="./main.tsx"','src="./recreation/entry.mjs"','original QA entry');}},
  transform(code,id){
   const file=id.split('?')[0];let transformed=code;
   if(file===engineFile){
    transformed=once(transformed,'constructor(private canvas:HTMLCanvasElement, private factory:WorldFactory, private onLost:()=>void) {','constructor(private canvas:HTMLCanvasElement, private factory:WorldFactory, private onLost:()=>void) {\n(window as any).__cozyRecreation.phase("engine-constructor-entry",{engine:this});\ntry {','engine constructor entry');
    transformed=once(transformed,'lifetime.created++;','lifetime.created++;\n(window as any).__cozyRecreation.attachRenderer(this);\n(window as any).__cozyRecreation.phase("engine-constructor-exit",{engine:this});\n} catch (error) {(window as any).__cozyRecreation.phase("engine-constructor-throw",{engine:this,error});throw error;}','engine constructor exit');
    transformed=once(transformed,'this.world=this.factory();','this.world=(window as any).__cozyRecreation.invokeFactory(this,()=>this.factory());','factory invocation');
   }else if(file===hostFile){
    transformed=once(transformed,'} catch {\n      this.fail();','} catch (error) {\n      (window as any).__cozyRecreation.phase("host-create-caught",{host:this,error});\n      this.fail();','host constructor catch reason');
    transformed=once(transformed,').catch(() => this.fail());',').catch((error) => {(window as any).__cozyRecreation.phase("host-init-chain-caught",{host:this,error});this.fail();});','host init/render catch reason');
   }
   if(transformed===code)return null;
   transforms.push({file:path.relative(path.resolve(qa,'../../../..'),file),originalSHA256:sha256(code),transformedSHA256:sha256(transformed)});
   return {code:transformed,map:null};
  },
 };
}
export async function manifest(bundle,transforms){
 const repo=path.resolve(qa,'../../../..'),three=JSON.parse(await readFile(path.join(repo,'node_modules/three/package.json'),'utf8'));
 return {timestamp:new Date().toISOString(),gitHead:gitHead(),source:await sourceDigest(),sharedHostSHA256:sha256(await readFile(hostFile)),three:{version:three.version,rendererSourceSHA256:sha256(await readFile(path.join(repo,'node_modules/three/src/renderers/WebGLRenderer.js')))},bundle:await digest(bundle),scripts:await digest(here,p=>p.endsWith('.mjs')&&!path.basename(p).startsWith('.generated-')),originalVerifySHA256:sha256(await readFile(path.join(qa,'verify.mjs'))),transforms,instrumentation:'QA build only: original production files untouched. Original promise returned from init; observers do not delay host await through an extra promise. Constructor/factory/host catches add phase records only.'};
}
export async function attachStream(page,output){
 await mkdir(output,{recursive:true});const file=path.join(output,'phases.jsonl');await writeFile(file,'');
 const events=[],seen=new Set();let queue=Promise.resolve();
 const append=(event,delivery)=>{
  const key=event.documentId&&event.sequence?`${event.documentId}:${event.sequence}`:null;if(key&&seen.has(key))return;
  if(key)seen.add(key);const record={receivedAt:new Date().toISOString(),delivery,...event};events.push(record);
  queue=queue.then(()=>appendFile(file,`${JSON.stringify(record)}\n`));
 };
 page.on('console',message=>{const text=message.text();if(text.startsWith('COZY_RECREATION ')){try{append(JSON.parse(text.slice(16)),'console');}catch(error){append({type:'stream-decode-error',text,error:String(error)},'node');}}else if(message.type()==='error')append({type:'console-error',message:text},'node');});
 page.on('pageerror',error=>append({type:'page-error',message:error.stack||String(error)},'node'));
 page.on('crash',()=>append({type:'page-crash'},'node'));
 await page.exposeBinding('__cozyRecreationSink',(_,event)=>append(event,'binding'));
 return {events,mark:(type,detail={})=>append({type,...detail},'node'),flush:()=>queue};
}
