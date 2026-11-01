import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9827,proxy:{'/api':'http://127.0.0.1:8827','/media':'http://127.0.0.1:8827'}},build:{outDir:'dist'}});
