import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9816,proxy:{'/api':'http://127.0.0.1:8816','/media':'http://127.0.0.1:8816'}},build:{outDir:'dist'}});
