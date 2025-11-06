import { defineConfig } from 'vite';

export default defineConfig({
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

