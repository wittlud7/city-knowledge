import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9825,proxy:{'/api':'http://127.0.0.1:8825','/media':'http://127.0.0.1:8825'}},build:{outDir:'dist'}});
