import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/components'),
      Images: path.resolve(__dirname, './src/images'),
      Hooks: path.resolve(__dirname, './src/hooks'),
      Contexts: path.resolve(__dirname, './src/contexts'),
    },
  },
  plugins: [react(), tsconfigPaths()],
});
