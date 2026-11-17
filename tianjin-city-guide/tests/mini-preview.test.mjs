import test from'node:test';
import assert from'node:assert/strict';
import express from'express';
import{resolve}from'node:path';
import{mountMiniPreview}from'../server/mini-preview.mjs';

test('mini preview exposes only registered page templates and approved source types',async t=>{
 const app=express();mountMiniPreview(app,resolve('.'));
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));t.after(()=>server.close());
 const base='http://127.0.0.1:'+server.address().port;
 const source=await fetch(base+'/mini/page/home/wxml');assert.equal(source.status,200);assert.match(await source.text(),/city-search/);
 for(const path of ['/mini/page/missing/js','/mini/page/home/env','/mini/page/..%2F..%2Fdata/js','/mini/.env','/mini/project.private.config.json'])assert.equal((await fetch(base+path)).status,404,path);
 const icon=await fetch(base+'/mini/assets/ui/house.png');assert.equal(icon.status,200);assert.equal(Buffer.from(await icon.arrayBuffer()).subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 const theme=await fetch(base+'/mini/theme.css');assert.match(await theme.text(),/field-primary/);
 const html=await fetch(base+'/mini/');assert.equal(html.status,200);assert.match(await html.text(),/真实 WXML/);
});
