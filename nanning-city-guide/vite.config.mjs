import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9819,proxy:{'/api':'http://127.0.0.1:8819','/media':'http://127.0.0.1:8819'}},build:{outDir:'dist'}});
