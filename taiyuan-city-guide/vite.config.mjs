import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9803,proxy:{'/api':'http://127.0.0.1:8803','/media':'http://127.0.0.1:8803'}},build:{outDir:'dist'}});
