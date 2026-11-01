import{defineConfig}from'vite';
export default defineConfig({server:{host:'127.0.0.1',port:9811,proxy:{'/api':'http://127.0.0.1:8811','/media':'http://127.0.0.1:8811'}},build:{outDir:'dist'}});
