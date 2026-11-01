import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9801,proxy:{'/api':'http://127.0.0.1:8801','/media':'http://127.0.0.1:8801'}},build:{outDir:'dist'}});
