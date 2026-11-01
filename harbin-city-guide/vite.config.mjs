import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9807,proxy:{'/api':'http://127.0.0.1:8807','/media':'http://127.0.0.1:8807'}},build:{outDir:'dist'}});
