import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    base: './',
    plugins: [vue()],
    // 其他 Vite 配置
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            '/images': 'src/assets/images',
        },
    }
})