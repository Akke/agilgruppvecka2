import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  //nedanstående läggs till:
  test: {
    environment: 'jsdom',
    globals: true
  }
});