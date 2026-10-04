import {createServer} from 'vite';
import {chromium} from 'playwright-core';
const server=await createServer({server:{host:'127.0.0.1',port:5194,strictPort:true,hmr:false,watch:null}});await server.listen();
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1,serviceWorkers:'block'});
 page.on('console',m=>{if(m.type()==='error')console.log('ERROR',m.text());});page.on('pageerror',e=>console.log('PAGE',e));
 await page.goto('http://127.0.0.1:5194/components/immersiveWorlds/cosmic/validation/index.html');
 console.log('loaded');await page.waitForSelector('.cosmic-world[data-state=ready]',{timeout:120000});console.log('ready');
 await page.getByRole('button',{name:'Pause',exact:true}).dispatchEvent('click');await page.waitForTimeout(1800);console.log('paused');
 await page.screenshot({path:'components/immersiveWorlds/cosmic/validation/screenshots/cosmic-desktop.png'});console.log('captured');
 console.log(await page.locator('canvas').evaluate(e=>({...e.dataset})));
}finally{await browser.close();await server.close();}
