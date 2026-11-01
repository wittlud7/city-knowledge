import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9817,proxy:{'/api':'http://127.0.0.1:8817','/media':'http://127.0.0.1:8817'}},build:{outDir:'dist'}});
