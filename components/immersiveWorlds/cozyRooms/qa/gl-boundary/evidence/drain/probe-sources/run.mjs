import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import {createWriteStream} from 'node:fs';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {qa,sourceDigest,sha256,gitHead} from '../followup/common.mjs';
import {here,DRAIN_MS,EXTERNAL_DRAIN_MS} from './runtime.mjs';

const output=path.resolve(process.env.COZY_OUTPUT||path.join(here,'evidence/drain'));
await mkdir(output,{recursive:true});
const original=await readFile(path.join(qa,'verify.mjs'),'utf8'),source=await sourceDigest();
const sequence=original.slice(original.indexOf('try {\nfor(const world'),original.lastIndexOf('\n} finally {'));
assert.ok(sequence.startsWith('try {\nfor(const world'),'original sequence boundary');
const insertion="  await drainBeforeFinalUnmount(page,diagnosticStream,output);\n";
const anchor="  const end=await inspect();await state('setMounted',false);";
assert.equal(sequence.split(anchor).length,2,'one final unmount anchor after the rapid-remount loop');
const changedSequence=sequence.replace(anchor,insertion+anchor);
assert.equal(changedSequence.replace(insertion,''),sequence,'only the declared drain insertion changes the original assertion sequence');
const adaptations=[];let runner=original;
function replace(needle,replacement,label){assert.equal(runner.split(needle).length,2,`unique ${label} anchor`);runner=runner.replace(needle,replacement);adaptations.push({label,needle,replacement});}
replace("import {verifyChrome} from './chrome-checks.mjs';","import {verifyChrome} from '../chrome-checks.mjs';\nimport {diagnosticPlugin,manifest,attachStream,drainBeforeFinalUnmount,finalizeDiagnostic} from './runtime.mjs';\nconst diagnosticTransforms=[];",'diagnostic setup imports');
replace('const qa=path.dirname(fileURLToPath(import.meta.url)),root=',"const qa=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),root=",'original QA root');
replace('plugins:[react()]','plugins:[react(),diagnosticPlugin(diagnosticTransforms)]','QA-only diagnostic build');
replace('const bundleDigest=await digest(bundle);',"const bundleDigest=await digest(bundle);\nconst diagnosticManifest=await manifest(bundle,diagnosticTransforms);\nawait writeFile(path.join(output,'instrumentation-manifest.json'),JSON.stringify(diagnosticManifest,null,2));\nassert.equal(diagnosticManifest.source.sha256,process.env.COZY_EXPECTED_SOURCE,'exact production source for this one experiment');\nif(process.env.COZY_BUILD_ONLY==='1'){console.log('Build-only GL diagnostic',diagnosticManifest.bundle.sha256);process.exit(0);}",'manifest and build-only path before any browser');
replace('const worlds=(process.env.COZY_WORLDS',"const diagnosticStream=await attachStream(page,output);\nconst worlds=(process.env.COZY_WORLDS",'stream before navigation');
replace(anchor,insertion+anchor,'one intervention after rapid remounts before final unmount');
replace('\n} finally {',`\n} catch (error) {
const failure={diagnosticOnly:true,passed:false,error:error.stack||String(error),lastEvent:diagnosticStream.records.at(-1)};
diagnosticStream.mark('node-diagnostic-sequence-failed',{error:failure.error});await diagnosticStream.flush();
await writeFile(path.join(output,'failure.json'),JSON.stringify(failure,null,2));throw error;
} finally {`,'persist thrown failure outside original body');
replace("await writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2));await browser.close();await new Promise(r=>server.httpServer.close(r));","await finalizeDiagnostic(page,browser,server,diagnosticStream,output,report,bundle);",'full event reconciliation and bounded cleanup; diagnostic-only report');
assert.ok(runner.includes(changedSequence),'original complete sequence plus only declared insertion retained');
const runtime=path.join(here,`.generated-drain-${process.pid}.mjs`);
await writeFile(runtime,runner);await writeFile(path.join(output,'runner-source.mjs'),runner);
await writeFile(path.join(output,'runner-provenance.json'),JSON.stringify({gitHead:gitHead(),productionSource:source,originalVerifySHA256:sha256(original),originalSequenceSHA256:sha256(sequence),originalSequenceBytes:Buffer.byteLength(sequence),intervenedSequenceSHA256:sha256(changedSequence),generatedRunnerSHA256:sha256(runner),intervention:{insertion,anchor,after:'All three rapid-remount iterations and their static redraws',pageBudgetMs:DRAIN_MS,externalBudgetMs:EXTERNAL_DRAIN_MS,timeoutAction:'End comparison; no subsequent final-unmount/disposal/fresh mount. No retries, finish() or busy waits.'},adaptations,claim:'One diagnostic alteration of the original winter sequence. Original assertions/timeouts remain; this is not an unchanged original-gate pass.'},null,2));
const log=createWriteStream(path.join(output,'runner.log'));
try{
 const exitCode=await new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,[runtime],{env:{...process.env,COZY_WORLDS:'nature:winter_lodge',COZY_OUTPUT:output,COZY_BUNDLE:process.env.COZY_BUNDLE||'/tmp/cozy-gl-boundary-bundle',COZY_PORT:process.env.COZY_PORT||'4215',COZY_EXPECTED_SOURCE:source.sha256},stdio:['ignore','pipe','pipe']});
  child.stdout.on('data',bytes=>{process.stdout.write(bytes);log.write(bytes);});child.stderr.on('data',bytes=>{process.stderr.write(bytes);log.write(bytes);});child.on('error',reject);child.on('exit',code=>resolve(code??1));
 });process.exitCode=exitCode;
}finally{await new Promise(resolve=>log.end(resolve));await rm(runtime,{force:true});}
