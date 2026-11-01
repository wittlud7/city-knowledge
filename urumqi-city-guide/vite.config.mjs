import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9830,proxy:{'/api':'http://127.0.0.1:8830','/media':'http://127.0.0.1:8830'}},build:{outDir:'dist'}});
