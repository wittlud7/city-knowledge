import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9826,proxy:{'/api':'http://127.0.0.1:8826','/media':'http://127.0.0.1:8826'}},build:{outDir:'dist'}});
