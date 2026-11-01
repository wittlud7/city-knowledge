import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9828,proxy:{'/api':'http://127.0.0.1:8828','/media':'http://127.0.0.1:8828'}},build:{outDir:'dist'}});
