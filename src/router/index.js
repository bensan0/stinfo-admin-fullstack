import { createRouter, createWebHistory } from 'vue-router'
import { checkLogin } from '@/utils/AuthUtils';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/MainPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/user',
    name: 'UserManagement',
    component: ()=> import('@/views/UserManaPage.vue')
  },
  {
    path: '/me',
    name: 'Me',
    component: ()=> import('@/views/MePage.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  try {
    if (to.name !== 'Login' && to.name !== 'Error') {
      const isLoggedIn = await checkLogin();
      if (!isLoggedIn) {
        return { name: 'Login' };
      }
    }
  } catch (error) {
    console.error('Navigation guard error:', error);
    return { name: 'Error', params: { message: '服務暫時不可用，請稍後再試。' } };
  }
});

export default router