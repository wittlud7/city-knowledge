import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
const root=resolve('miniprogram'),app=JSON.parse(readFileSync(resolve(root,'app.json'),'utf8'));
let failures=0;
for(const page of app.pages){let definition;const path=resolve(root,page+'.js');try{
 if(!existsSync(path)||!existsSync(resolve(root,page+'.wxml')))throw Error('缺少页面文件');
 vm.runInNewContext(readFileSync(path,'utf8'),{Page:d=>definition=d,require:()=>({}),wx:{},console,Promise,Date,JSON});
 const wxml=readFileSync(resolve(root,page+'.wxml'),'utf8');
 for(const match of wxml.matchAll(/(?:bind|catch)(?::)?[a-z]+="([\w]+)"/g))if(typeof definition[match[1]]!=='function')throw Error('事件处理器不存在：'+match[1]);
 console.log('PASS',page);
 }catch(e){console.error('FAIL',page,e.message);failures++;}}
for(const tab of app.tabBar.list)if(!app.pages.includes(tab.pagePath)){failures++;console.error('TabBar 页面未注册');}
if(failures)process.exitCode=1;else console.log('小程序页面结构、JS语法与事件绑定检查通过。此检查不替代微信编译器和真机测试。');
