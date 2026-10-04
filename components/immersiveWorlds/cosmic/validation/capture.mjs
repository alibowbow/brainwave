import {createServer} from 'vite';
import {chromium} from 'playwright-core';
import {mkdir,writeFile} from 'node:fs/promises';
const output='components/immersiveWorlds/cosmic/validation/screenshots';await mkdir(output,{recursive:true});
const server=await createServer({server:{host:'127.0.0.1',port:5194,strictPort:true,hmr:false,watch:null}});await server.listen();
const browser=await chromium.launch({executablePath:process.env.SCENE_BROWSER_PATH,headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const report={captures:[],errors:[]};
try{
 const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
 page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto('http://127.0.0.1:5194/components/immersiveWorlds/cosmic/validation/index.html?clean&still');
 await page.waitForSelector('.cosmic-world[data-state=ready][data-motion=paused]',{timeout:120000});
 for(const [name,width,height] of [['desktop',1280,800],['fold-portrait',344,882],['fold-landscape',882,344]]){
  await page.setViewportSize({width,height});
  await page.waitForFunction(()=>{const c=document.querySelector('canvas');return c&&Math.abs(c.width/c.height-innerWidth/innerHeight)<.015;});
  await page.screenshot({path:`${output}/cosmic-${name}.jpg`,type:'jpeg',quality:93,timeout:120000});
  const stats=await page.locator('canvas').evaluate(e=>({...e.dataset}));report.captures.push({name,width,height,stats});console.log('captured',name,stats);
 }
 if(report.errors.length)throw new Error(JSON.stringify(report.errors));
 await writeFile(`${output}/capture-report.json`,JSON.stringify(report,null,2)+'\n');
}finally{await browser.close();await server.close();}
