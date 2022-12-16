import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                mainpage: resolve(__dirname, 'mainpage.html'),
                signin: resolve(__dirname, 'signin.html'),
                signup: resolve(__dirname, 'signup.html'),
            }
        }
    }
})