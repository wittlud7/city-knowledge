import{mkdirSync,writeFileSync}from'node:fs';import{deflateSync}from'node:zlib';
const width=40,height=52,raw=Buffer.alloc((width*4+1)*height);
for(let y=0;y<height;y++){for(let x=0;x<width;x++){const dx=x-20,dy=y-19;const circle=dx*dx+dy*dy<=17*17;const point=y>=24&&y<=49&&Math.abs(dx)<(50-y)*.5;const inner=dx*dx+dy*dy<6*6;const p=y*(width*4+1)+1+x*4;if(circle||point){raw[p]=inner?248:47;raw[p+1]=inner?250:85;raw[p+2]=inner?240:65;raw[p+3]=255;}}}
function crc(buf){let n=0xffffffff;for(const b of buf){n^=b;for(let j=0;j<8;j++)n=(n>>>1)^((n&1)?0xedb88320:0);}return(n^0xffffffff)>>>0;}
function chunk(type,data){const t=Buffer.from(type),len=Buffer.alloc(4),sum=Buffer.alloc(4);len.writeUInt32BE(data.length);sum.writeUInt32BE(crc(Buffer.concat([t,data])));return Buffer.concat([len,t,data,sum]);}
const head=Buffer.alloc(13);head.writeUInt32BE(width,0);head.writeUInt32BE(height,4);head[8]=8;head[9]=6;mkdirSync('miniprogram/assets',{recursive:true});writeFileSync('miniprogram/assets/pin.png',Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',head),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]));
