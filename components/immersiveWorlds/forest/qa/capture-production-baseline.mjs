import { chromium } from 'playwright-core';
import { writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const output = fileURLToPath(new URL('./refinement/', import.meta.url));
await mkdir(output, {recursive:true});
const report = { startedAt:new Date().toISOString(), url:'https://jhbrainwave.vercel.app/#/play/amb/morning_forest', scope:'Read-only current production baseline, not the unpublished forest refinement', status:'running', scripts:[], errors:[] };
const browser = await chromium.launch({executablePath:process.env.FOREST_QA_BROWSER||'/tmp/cosmic-browser-bin/chromium',headless:true,args:['--use-angle=swiftshader']});
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});
  const reads=[];
  page.on('response',response=>{if(response.request().resourceType()==='script')reads.push(response.body().then(bytes=>report.scripts.push({url:response.url(),sha256:createHash('sha256').update(bytes).digest('hex')})).catch(()=>{}));});
  page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(report.url,{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForTimeout(1800);
  report.dom=await page.evaluate(()=>({title:document.title,url:location.href,text:document.body.innerText.slice(0,6000),canvases:Array.from(document.querySelectorAll('canvas'),c=>({className:c.className,...c.dataset,width:c.width,height:c.height})),buttons:Array.from(document.querySelectorAll('button'),b=>({label:b.getAttribute('aria-label'),text:b.textContent})).slice(0,60)}));
  // No trusted playback gesture has occurred in this fresh browser context.
  const bytes=await page.screenshot({type:'png',timeout:30000});
  await writeFile(`${output}production-paused-first-baseline.png`,bytes);
  report.capture={filename:'production-paused-first-baseline.png',width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),sha256:createHash('sha256').update(bytes).digest('hex'),method:'native Chromium compositor PNG, untouched production DOM'};
  await Promise.allSettled(reads);
  report.status='captured-baseline-only';
} catch(error) { report.status='blocked';report.failure=String(error); }
finally {await browser.close();report.finishedAt=new Date().toISOString();await writeFile(`${output}production-baseline-report.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));}
