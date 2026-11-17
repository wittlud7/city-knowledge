import{readFileSync}from'node:fs';
import{resolve,dirname,sep}from'node:path';
import express from'express';

export function mountMiniPreview(app,root){
 const mini=resolve(root,'miniprogram');
 const config=()=>JSON.parse(readFileSync(resolve(mini,'app.json'),'utf8'));
 const sheet=(file,seen=new Set())=>{
  const path=resolve(mini,file);
  if(!path.startsWith(mini+sep)||!path.endsWith('.wxss'))throw Error('非法样式路径');
  if(seen.has(path))return'';seen.add(path);
  return readFileSync(path,'utf8').replace(/@import\s+["']([^"']+)["']\s*;/g,(_,name)=>sheet(resolve(dirname(path),name),seen));
 };
 app.get('/mini/app.json',(req,res)=>res.json(config()));
 app.get('/mini/theme.css',(req,res)=>{
  const css=sheet('app.wxss');
  res.type('text/css').set('Cache-Control','no-store').send(css);
 });
 app.get('/mini/page/:page/:kind',(req,res)=>{
  const{page,kind}=req.params;
  if(!config().pages.includes(`pages/${page}/${page}`)||!['js','wxml'].includes(kind))return res.status(404).json({error:'预览页面不存在'});
  res.type(kind==='js'?'text/javascript':'text/plain').set('Cache-Control','no-store').send(readFileSync(resolve(mini,'pages',page,page+'.'+kind),'utf8'));
 });
 app.use('/mini/assets',express.static(resolve(mini,'assets'),{dotfiles:'deny'}));
 app.use('/mini',express.static(resolve(root,'preview'),{dotfiles:'deny',index:'index.html',setHeaders:r=>r.set('Cache-Control','no-store')}));
}
