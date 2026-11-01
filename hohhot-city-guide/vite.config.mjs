import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9804,proxy:{'/api':'http://127.0.0.1:8804','/media':'http://127.0.0.1:8804'}},build:{outDir:'dist'}});
