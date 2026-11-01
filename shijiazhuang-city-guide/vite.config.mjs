import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9802,proxy:{'/api':'http://127.0.0.1:8802','/media':'http://127.0.0.1:8802'}},build:{outDir:'dist'}});
