import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

axios.interceptors.request.use(config => {
    config.headers.AuthToken = localStorage.getItem('token');
    return config;
});

axios.interceptors.response.use(
    response => {
        // 檢查自定義狀態碼
        if (response.data && response.data.status === '401') {
            // 清除 localStorage 中的 token
            localStorage.removeItem('token')

            // 如果當前不在登錄頁，則重定向到登錄頁
            if (router.currentRoute.value.path !== '/login') {
                router.push('/login')
            }

            // 可以選擇拋出一個錯誤或者返回一個被拒絕的 promise
            return Promise.reject(new Error('Unauthorized'))
        }

        // 如果不是 401，則正常返回響應
        return response
    },
    error => {
        // 處理網絡錯誤等其他類型的錯誤
        return Promise.reject(error)
    }
)

createApp(App).use(router).mount('#app')
