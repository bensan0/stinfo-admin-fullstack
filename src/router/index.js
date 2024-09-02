import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router