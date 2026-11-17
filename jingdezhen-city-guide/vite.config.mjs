import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9801,proxy:{'/api':'http://127.0.0.1:8842','/media':'http://127.0.0.1:8842'}},build:{outDir:'dist'}});
