import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  const toolsDir = path.resolve(__dirname, 'tools');
  const toolFiles = fs.existsSync(toolsDir) ? fs.readdirSync(toolsDir).filter(f => f.endsWith('.html')) : [];
  
  const inputs = {
    main: path.resolve(__dirname, 'index.html'),
    about: path.resolve(__dirname, 'about.html'),
    contact: path.resolve(__dirname, 'contact.html'),
    privacy: path.resolve(__dirname, 'privacy-policy.html'),
    terms: path.resolve(__dirname, 'terms.html'),
  };
  
  toolFiles.forEach(file => {
    const name = file.replace('.html', '');
    inputs[name] = path.resolve(toolsDir, file);
  });

  return {
    plugins: [],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        input: inputs
      }
    }
  };
});
