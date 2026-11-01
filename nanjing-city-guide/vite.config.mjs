import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9809,proxy:{'/api':'http://127.0.0.1:8809','/media':'http://127.0.0.1:8809'}},build:{outDir:'dist'}});
