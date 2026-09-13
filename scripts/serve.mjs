import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('.');
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.md':'text/plain'};
http.createServer(async(req,res)=>{try{const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403).end();return;}const file=path===root?resolve(root,'index.html'):path;const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);}catch{res.writeHead(404).end('Not found');}}).listen(4173,'0.0.0.0',()=>console.log('Bumpkin Town: http://localhost:4173'));
