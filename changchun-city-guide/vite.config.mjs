import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9806,proxy:{'/api':'http://127.0.0.1:8806','/media':'http://127.0.0.1:8806'}},build:{outDir:'dist'}});
