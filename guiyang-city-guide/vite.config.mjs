import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9823,proxy:{'/api':'http://127.0.0.1:8823','/media':'http://127.0.0.1:8823'}},build:{outDir:'dist'}});
