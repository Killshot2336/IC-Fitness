import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        format: 'iife',
        name: 'ICFitnessTierDemo',
        entryFileNames: 'tier-demo.js',
        assetFileNames: 'tier-demo.[ext]',
        inlineDynamicImports: true,
      },
    },
  },
});
