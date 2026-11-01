import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9818,proxy:{'/api':'http://127.0.0.1:8818','/media':'http://127.0.0.1:8818'}},build:{outDir:'dist'}});
