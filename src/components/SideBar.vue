<template>
  <div class="left-panel">
    <div class="top">
      人恐我貪管理後台
       <img :src="stareofdora" class="pic" />
    </div>
    <div class="center">
      <nav>
        <p><router-link to="/">首頁</router-link></p>
        <p><router-link to="/user">用戶管理</router-link></p>
        <p><router-link to="/me">Me</router-link></p>
      </nav>
    </div>
    <br>
    <div class="bottom">
      <div><p class="bold-text">管理員: {{ username }}</p></div>
      <button @click="handleLogout" class="button">登出</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { logout } from '@/utils/AuthUtils';
import { useRouter } from 'vue-router';
import stareofdora from '@/assets/images/stareofdora2.jpg';

export default {
  name: 'SideBar',
  setup() {
    const router = useRouter()

    const username = ref(localStorage.getItem('username'))

    function handleLogout() {
      logout()
      router.push('/login')
    }

    return {
      handleLogout,
      stareofdora,
      username
    }
  }
}
</script>

<style scoped>
.left-panel {
  height: 100vh;
  width: 100%;
  /*使用 100% 寬度，實際寬度將由父元素控制*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  /* 添加一些上下內邊距 */
  align-items: center;
  bottom: 0;
}

.top{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.center {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bottom {
  /* margin-top: auto; */
  /* 將底部元素推到面板底部 */
  padding: 0 10px;
  /* 添加一些左右內邊距 */
  align-items: center
}

nav {
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  display: block;
  margin-bottom: 15px;
  /* 增加連結之間的間距 */
  text-decoration: none;
  /* 移除下劃線 */
}

nav a.router-link-exact-active {
  color: #42b983;
}

.button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  /* 添加背景顏色 */
  color: white;
  /* 文字顏色設為白色 */
  border: none;
  /* 移除邊框 */
  cursor: pointer;
  /* 滑鼠懸停時顯示指針 */
}

.button:hover {
  background-color: #3aa876;
  /* 滑鼠懸停時的顏色 */
}

.pic{
  width: 70%;
}

.bold-text{
  font-weight: bold;
}
</style>