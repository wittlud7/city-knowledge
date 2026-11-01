import{readFileSync,existsSync}from'node:fs';import{resolve,dirname,sep}from'node:path';import{fileURLToPath}from'node:url';import{spawn}from'node:child_process';
const program=fileURLToPath(new URL('.',import.meta.url)),root=resolve(program,'..'),all=JSON.parse(readFileSync(resolve(program,'cities.json'),'utf8')),wanted=process.argv.indexOf('--city'),cities=wanted>=0?all.filter(c=>c.id===process.argv[wanted+1]):all;
if(!cities.length)throw Error('城市编号无效，请查看 cities.json');
const npmCli=resolve(dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
function run(args,cwd){return new Promise((ok,no)=>{const useCli=existsSync(npmCli),command=useCli?process.execPath:process.platform==='win32'?'npm.cmd':'npm';const child=spawn(command,useCli?[npmCli,...args]:args,{cwd,stdio:'inherit',windowsHide:true,shell:!useCli&&process.platform==='win32'});child.on('error',no);child.on('exit',code=>code===0?ok():no(Error('npm '+args.join(' ')+' 失败，退出码 '+code)));});}
for(const c of cities){const folder=resolve(root,c.folder);if(!folder.startsWith(root+sep)||!/^[a-z]+-city-guide$/.test(c.folder)||!existsSync(resolve(folder,'package.json')))throw Error('项目文件夹不存在或路径无效：'+c.folder);}
if(process.argv.includes('--list')){console.log(cities.map(c=>c.name+' · '+c.folder).join('\n'));process.exit();}
const queue=[...cities],failures=[];
async function worker(){while(queue.length){const c=queue.shift();console.log('\n准备 '+c.name+' / '+c.folder);try{await run(['ci','--no-audit','--no-fund'],resolve(root,c.folder));await run(['run','build'],resolve(root,c.folder));console.log('完成 '+c.name);}catch(e){failures.push(c.id);console.error(c.name+'：'+e.message);}}}
await Promise.all([worker(),worker(),worker()]);if(failures.length){console.error('未完成：'+failures.join(', '));process.exitCode=1;}else console.log('项目准备完成。执行 node city-program/server.mjs 或双击 Start-Cities.cmd 打开总目录。');
