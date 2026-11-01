import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9829,proxy:{'/api':'http://127.0.0.1:8829','/media':'http://127.0.0.1:8829'}},build:{outDir:'dist'}});
