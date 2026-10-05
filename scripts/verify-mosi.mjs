import {chromium} from 'playwright-core';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1280,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
try {
 await page.goto('http://127.0.0.1:4173/#/play/meditation');
 await page.waitForTimeout(5000);
 console.log(await page.locator('body').innerText());
 await page.screenshot({path:'artifacts/mosi/initial.png'});
 await page.waitForSelector('[data-sanctuary="meditation"][data-state="ready"]',{timeout:60000});
 const checks=[];
 for(const [name,width,height] of [['desktop',1280,900],['phone',390,844],['square',768,768]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(1000);
  await page.screenshot({path:`artifacts/mosi/${name}.png`});
  checks.push({name,canvas:await page.locator('.sanctuary-canvas').evaluate(el=>({...el.dataset,width:el.width,height:el.height})),count:await page.locator('.sanctuary-canvas').count()});
 }
 console.log(JSON.stringify({checks,errors}));await writeFile('artifacts/mosi/verification.json',JSON.stringify({checks,errors},null,2));
}finally{await browser.close()}
