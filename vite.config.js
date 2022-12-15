import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'public/index.html'),
                mainpage: resolve(__dirname, 'public/mainpage.html'),
                signin: resolve(__dirname, 'public/signin.html'),
                signup: resolve(__dirname, 'public/signup.html'),
            }
        }
    }
})