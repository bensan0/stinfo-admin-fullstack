<template>
    <div class="main-container">
        <SideBar class="sidebar" />
        <div class="content">
            <div class="inputs-container">
                <div class="input">
                    用戶名:
                    <input type="text" v-model="username">
                </div>

                <div class="last-container">
                    <button @click="submit">查詢</button>
                </div>
            </div>

            <div class="info-container" v-if="user.username">
                <span>編號:{{ user.id }}</span>
                <span>用戶名:{{ user.username }}</span>
                <span>創建日期:{{ user.createdAt }}</span>
                <div>
                    <div v-if="newPassword">{{ newPassword }}</div>
                    <button @click="resetPassword">重置密碼</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import axios from 'axios';
import SideBar from '@/components/SideBar.vue';
import dayjs from 'dayjs';

export default {
    name: 'UserManagement',
    components: {
        SideBar
    },
    setup() {
        const username = ref(null)
        const newPassword = ref(null)

        const user = reactive({
            id: null,
            username: null,
            createdAt: null
        })

        async function submit() {
            let apiUrl = import.meta.env.VITE_STINFO_BACKEND_API_URL
            try {
                let response = await axios.get(`${apiUrl}/user/info`,
                    {
                        params: {
                            username: username.value
                        }
                    }
                )
                user.id = response.data.data.id    
                user.username = response.data.data.username
                user.createdAt = dayjs(response.data.data.created_at.toString(), 'YYYYMMDDHHmmss').format('YYYY-MM-DD')
            } catch (error) {
                console.error('獲取用戶資訊錯誤:' + error.message)
            }
        }

        async function resetPassword() {
            let apiUrl = import.meta.env.VITE_STINFO_BACKEND_API_URL
            try {
                let response = await axios.post(`${apiUrl}/user/reset-password`,
                    {
                        id: user.id
                    }
                )

                newPassword.value = response.data.data
            } catch (error) {
                console.error('獲取用戶資訊錯誤:' + error.message)
            }
        }

        return {
            username,
            newPassword,
            user,
            submit,
            resetPassword
        }
    }
}
</script>

<style scoped>
.main-container {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 10%;
    /* 設置側邊欄寬度為螢幕的十分之一 */
    background-color: gray;
    /* 添加背景色以區分側邊欄 */
}

.content {
    width: 90%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* 添加間距 */
}

.inputs-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    background-color: antiquewhite;
}

.input {
    justify-content: flex-start
}

.info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    background-color: antiquewhite;
}
</style>