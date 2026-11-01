import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9822,proxy:{'/api':'http://127.0.0.1:8822','/media':'http://127.0.0.1:8822'}},build:{outDir:'dist'}});
