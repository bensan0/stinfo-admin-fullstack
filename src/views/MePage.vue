<template>
    <div class="main-container">
        <SideBar class="sidebar" />
        <div class="content">
            <div class="info-container">
                <span>編號:{{ admin.id }}</span>
                <span>用戶名:{{ admin.username }}</span>
                <span>創建日期:{{ admin.createdAt }}</span>
                <div>
                    <span>變更密碼</span>
                    <div>現在密碼:<input type="text" v-model="nowPassword"></div>
                    <div>新密碼:<input type="text" v-model="newPassword"></div>
                    <button @click="changePassword">變更密碼</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import SideBar from '@/components/SideBar.vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { logout } from '@/utils/AuthUtils';

export default {
    name: 'Me',
    components: {
        SideBar
    },
    setup() {
        const router = useRouter()

        const nowPassword = ref(null)

        const newPassword = ref(null)

        const admin = reactive({
            id: null,
            username: null,
            createdAt: null
        })

        async function changePassword() {
            let apiUrl = import.meta.env.VITE_STINFO_BACKEND_API_URL
            try {
                let response = await axios.post(`${apiUrl}/admin/change-password`,
                    {
                        id: admin.id,
                        nowPassword: nowPassword.value,
                        newPassword: newPassword.value
                    }
                )
                if (response.data.status === '200') {
                    logout()
                    router.push("/login")
                } else {
                    alert(response.data.msg)
                }

            } catch (error) {
                console.error('獲取用戶資訊錯誤:' + error.message)
            }
        }

        onMounted(async () => {
            let apiUrl = import.meta.env.VITE_STINFO_BACKEND_API_URL
            try {
                let response = await axios.get(`${apiUrl}/admin/me`)
                admin.id = response.data.data.id
                admin.username = response.data.data.username
                admin.createdAt = response.data.data.createdAt === null ? '' : dayjs(response.data.data.createdAt, 'YYYYMMDDHHmmss').format('YYYY-MM-DD')
            } catch (error) {
                console.error('獲取用戶資訊錯誤:' + error.message)
            }
        })

        return {
            admin,
            changePassword,
            nowPassword,
            newPassword
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