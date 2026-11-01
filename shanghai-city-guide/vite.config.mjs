import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9808,proxy:{'/api':'http://127.0.0.1:8808','/media':'http://127.0.0.1:8808'}},build:{outDir:'dist'}});
