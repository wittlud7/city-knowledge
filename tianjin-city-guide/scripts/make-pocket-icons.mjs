/* Render installed Lucide SVG icons to native-compatible PNGs. */
import{createElement}from'react';import{renderToStaticMarkup}from'react-dom/server';import*as icons from'lucide-react';
import{mkdirSync,writeFileSync,copyFileSync}from'node:fs';import{resolve}from'node:path';
const{Resvg}=await import('@resvg/resvg-js').catch(()=>{throw Error('仅重新生成图标时需要开发工具：npm install --no-save --package-lock=false @resvg/resvg-js。运行项目不需要。');});
const dest=resolve('miniprogram/assets/ui');mkdirSync(dest,{recursive:true});
const names={'map-pin':'MapPin',search:'Search',house:'House','briefcase-business':'BriefcaseBusiness','graduation-cap':'GraduationCap','circle-plus':'CirclePlus','train-front':'TrainFront','clipboard-list':'ClipboardList','chevron-right':'ChevronRight','book-open':'BookOpen','message-circle':'MessageCircle','user-round':'UserRound','shield-check':'ShieldCheck'};
for(const[file,name]of Object.entries(names)){const svg=renderToStaticMarkup(createElement(icons[name],{size:64,color:'#477a56',strokeWidth:1.8}));writeFileSync(resolve(dest,file+'.svg'),svg);writeFileSync(resolve(dest,file+'.png'),new Resvg(svg).render().asPng());}
for(const[file,name]of Object.entries({home:'House',knowledge:'ClipboardList',ask:'MessageCircle',me:'UserRound'}))for(const[selected,color]of [[false,'#8a9489'],[true,'#477a56']]){const svg=renderToStaticMarkup(createElement(icons[name],{size:64,color,strokeWidth:1.8}));writeFileSync(resolve(dest,'tab-'+file+(selected?'-selected':'')+'.png'),new Resvg(svg).render().asPng());}
copyFileSync(resolve('node_modules/lucide-react/LICENSE'),resolve(dest,'LICENSE.txt'));console.log('Native PNG icons generated; ISC license preserved.');
