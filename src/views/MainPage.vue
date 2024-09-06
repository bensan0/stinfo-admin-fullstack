<template>
    <div class="main-container">
        <SideBar class="sidebar" />
        <div class="content">
            <img :src="full" class="pic" />
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import full from '@/assets/images/fullfull.jpg';

export default {
    name: 'MainPage',
    components: {
        SideBar
    },
    setup() {

        return {
            full
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
    align-items: center;
    border: solid;
}
</style>