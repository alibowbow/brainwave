import {chromium} from 'playwright-core';
import {preview} from 'vite';
const server=await preview({configFile:'components/immersiveWorlds/deepWater/qa/vite.config.ts'});
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH||'/workspace/scratch/2bd758a1b983/browser-runtime/chromium',headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:640,height:480}});page.setDefaultTimeout(120000);
page.on('pageerror',e=>console.log('PAGEERROR',e.message));page.on('console',m=>{if(m.type()==='error')console.log('ERROR',m.text())});
try{
 await page.goto('http://127.0.0.1:4198/?scene=sea&static');await page.waitForSelector('[data-state="ready"]');
 console.log('READY',await page.locator('canvas').evaluate(c=>({...c.dataset})));
 await page.evaluate(()=>{window.savedCanvas=document.querySelector('canvas');window.started=performance.now();window.__deepWaterQA.setMounted(false);});
 await page.waitForFunction(()=>!document.querySelector('canvas'));
 for(let i=0;i<4;i++){await page.waitForTimeout(3000);console.log('STATE',await page.evaluate(()=>({elapsed:performance.now()-window.started,canvas:{...window.savedCanvas.dataset},connected:window.savedCanvas.isConnected,mounted:window.__deepWaterQA.state.mounted,visibility:document.visibilityState,hidden:document.hidden})));}
}finally{await browser.close();await new Promise(resolve=>server.httpServer.close(resolve));}
