import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9810,proxy:{'/api':'http://127.0.0.1:8810','/media':'http://127.0.0.1:8810'}},build:{outDir:'dist'}});
