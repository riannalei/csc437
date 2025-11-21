import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
      "/images": "http://localhost:3000"
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        login: './login.html',
        newuser: './newuser.html'
      }
    }
  }
});

