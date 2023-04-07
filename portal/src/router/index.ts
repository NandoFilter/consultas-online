import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { LandingPage, Login, Register, Home, Search } from '@/views'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'landing_page',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
