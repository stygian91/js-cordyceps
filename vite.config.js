import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'cordyceps',
      fileName: (format) => `cordyceps.${format}.js`
    }
  }
});
