import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9801,proxy:{'/api':'http://127.0.0.1:8832','/media':'http://127.0.0.1:8832'}},build:{outDir:'dist'}});
