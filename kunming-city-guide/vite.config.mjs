import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9824,proxy:{'/api':'http://127.0.0.1:8824','/media':'http://127.0.0.1:8824'}},build:{outDir:'dist'}});
