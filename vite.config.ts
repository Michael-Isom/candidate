import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Set the base path for GitHub Pages deployment
  base: '/candidate-search/',  // Replace with your repo name

  // Directory for environment variables
  envDir: './env',

  // React plugin
  plugins: [react()],
});