import {createServer} from 'vite';
const server=await createServer({server:{host:'127.0.0.1',port:5193,strictPort:true,hmr:false,watch:null}});
await server.listen();
try{await import('./verify-cosmic.mjs');}finally{await server.close();}
