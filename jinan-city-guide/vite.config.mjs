import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9814,proxy:{'/api':'http://127.0.0.1:8814','/media':'http://127.0.0.1:8814'}},build:{outDir:'dist'}});
