import{readFileSync}from'node:fs';
export const city=JSON.parse(readFileSync(new URL('../content/city.json',import.meta.url),'utf8'));
