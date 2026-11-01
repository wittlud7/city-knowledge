import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9820,proxy:{'/api':'http://127.0.0.1:8820','/media':'http://127.0.0.1:8820'}},build:{outDir:'dist'}});
