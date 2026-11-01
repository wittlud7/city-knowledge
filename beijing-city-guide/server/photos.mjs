import{readFileSync}from'node:fs';
export const photos=JSON.parse(readFileSync(new URL('../content/photos.json',import.meta.url),'utf8')).map(p=>({...p,url:'/media/'+p.local,miniUrl:'/assets/photos/'+p.local,displayNote:'历史实景照片，非实时画面；页面可能裁切展示，图片文件未作修改。'}));
export const placePhotoIds={'capital-library':'library',shougang:'industry'};
