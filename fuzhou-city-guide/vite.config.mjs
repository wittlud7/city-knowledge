import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9812,proxy:{'/api':'http://127.0.0.1:8812','/media':'http://127.0.0.1:8812'}},build:{outDir:'dist'}});
