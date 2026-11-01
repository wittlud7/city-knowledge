import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9821,proxy:{'/api':'http://127.0.0.1:8821','/media':'http://127.0.0.1:8821'}},build:{outDir:'dist'}});
