import {createServer} from 'vite';
// COSMIC_PORT lets parallel QA runs choose a free port.
const port=Number(process.env.COSMIC_PORT||5193);
process.env.SCENE_BASE_URL??=`http://127.0.0.1:${port}`;
const server=await createServer({server:{host:'127.0.0.1',port,strictPort:true,hmr:false,watch:null}});
await server.listen();
try{await import('./verify-cosmic.mjs');}finally{await server.close();}
