import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import {createWriteStream} from 'node:fs';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {sourceDigest,sha256} from '../followup/common.mjs';
import {qa,here} from './instrumentation.mjs';

// One comparison only, explicitly gated on the clean same-document probe.
const cleanPath=path.resolve(process.env.COZY_CLEAN_REPORT||path.join(here,'evidence/clean/diagnostic.json'));
const clean=JSON.parse(await readFile(cleanPath,'utf8'));
assert.equal(clean.passed,true,'Run original-sequence comparison only after clean recreation passes');
assert.equal((await sourceDigest()).sha256,clean.source.sha256,'comparison uses the same production source as clean probe');
const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence/original-sequence'));await mkdir(output,{recursive:true});
const original=await readFile(path.join(qa,'verify.mjs'),'utf8');
const sequence=original.slice(original.indexOf('try {\nfor(const world'),original.lastIndexOf('\n} finally {'));
assert.ok(sequence.startsWith('try {\nfor(const world'),'original sequence boundary exists');
const adaptations=[];
let runner=original;
function replace(needle,replacement,label){assert.equal(runner.split(needle).length,2,`unique ${label} anchor`);runner=runner.replace(needle,replacement);adaptations.push({label,needle,replacement});}
replace("import {verifyChrome} from './chrome-checks.mjs';","import {verifyChrome} from '../chrome-checks.mjs';\nimport {diagnosticPlugin,attachStream,manifest} from './instrumentation.mjs';\nconst diagnosticTransforms=[];",'QA-only imports');
replace('const qa=path.dirname(fileURLToPath(import.meta.url)),root=',"const qa=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),root=",'original QA root from generated runner');
replace('plugins:[react()]','plugins:[react(),diagnosticPlugin(diagnosticTransforms)]','observation-only build plugin');
replace('const worlds=(process.env.COZY_WORLDS',"const diagnosticStream=await attachStream(page,output);\nconst diagnosticManifest=await manifest(bundle,diagnosticTransforms);\nawait writeFile(path.join(output,'instrumentation-manifest.json'),JSON.stringify(diagnosticManifest,null,2));\nassert.equal(diagnosticManifest.bundle.sha256,process.env.COZY_EXPECTED_BUNDLE,'same instrumented bundle as clean probe');\nassert.equal(diagnosticManifest.source.sha256,process.env.COZY_EXPECTED_SOURCE,'same production source as clean probe');\nconst worlds=(process.env.COZY_WORLDS",'incremental stream and clean identity guard before navigation');
replace('\n} finally {',`\n} catch (error) {
const failure={passed:false,error:error.stack||String(error),lastEvent:diagnosticStream.events.at(-1)};
diagnosticStream.mark('node-original-sequence-failed',{error:failure.error});await diagnosticStream.flush();
await writeFile(path.join(output,'failure.json'),JSON.stringify(failure,null,2));
let observationDeadline;
try {failure.snapshot=await Promise.race([page.evaluate(()=>({snapshot:window.__cozyRecreation?.snapshot?.()??null,inspect:window.__cozyQA?.inspect?.()??null})),new Promise((_,reject)=>{observationDeadline=setTimeout(()=>reject(new Error('Failure DOM/state observation exceeded 1000 ms')),1000);})]);}
catch (observationError) {failure.observationError=String(observationError);}
finally {clearTimeout(observationDeadline);}
await writeFile(path.join(output,'failure.json'),JSON.stringify(failure,null,2));
await diagnosticStream.flush();throw error;
} finally {`,'preserve thrown failure and bounded DOM observation outside original sequence');
replace("await writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));await browser.close();","await writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));await diagnosticStream.flush();await browser.close();",'flush scalar event stream before original cleanup');
assert.ok(runner.includes(sequence),'complete original test sequence retained byte-for-byte');
const runtime=path.join(here,`.generated-original-${process.pid}.mjs`);
await writeFile(runtime,runner);await writeFile(path.join(output,'runner-source.mjs'),runner);
await writeFile(path.join(output,'runner-provenance.json'),JSON.stringify({originalSHA256:sha256(original),generatedSHA256:sha256(runner),unchangedSequenceSHA256:sha256(sequence),unchangedSequenceBytes:Buffer.byteLength(sequence),cleanReport:cleanPath,sourceSHA256:clean.source.sha256,adaptations,statement:'Exact original try/for assertion and screenshot sequence preserved; same original chrome-checks import. Only setup and external failure persistence adapted. One winter invocation, no retries and no timeout changes.'},null,2));
const log=createWriteStream(path.join(output,'runner.log'));
try{
 const code=await new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,[runtime],{env:{...process.env,COZY_WORLDS:'nature:winter_lodge',COZY_OUTPUT:output,COZY_BUNDLE:process.env.COZY_BUNDLE||'/tmp/cozy-recreation-bundle',COZY_PORT:process.env.COZY_PORT||'4213',COZY_EXPECTED_SOURCE:clean.source.sha256,COZY_EXPECTED_BUNDLE:clean.bundle.sha256},stdio:['ignore','pipe','pipe']});
  child.stdout.on('data',bytes=>{process.stdout.write(bytes);log.write(bytes);});child.stderr.on('data',bytes=>{process.stderr.write(bytes);log.write(bytes);});child.on('error',reject);child.on('exit',resolve);
 });
 process.exitCode=code||0;
}finally{log.end();await rm(runtime,{force:true});}
