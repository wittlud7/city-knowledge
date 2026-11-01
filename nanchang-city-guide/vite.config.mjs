import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9813,proxy:{'/api':'http://127.0.0.1:8813','/media':'http://127.0.0.1:8813'}},build:{outDir:'dist'}});
