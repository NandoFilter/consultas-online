import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { LandingPage, Login, Register, Home } from '@/views'

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
  // {
  //   path: '/register',
  //   name: 'register',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/Register.vue'),
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
