import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9805,proxy:{'/api':'http://127.0.0.1:8805','/media':'http://127.0.0.1:8805'}},build:{outDir:'dist'}});
