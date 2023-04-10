import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {
  LandingPage,
  Login,
  Register,
  Home,
  NewQuery,
  Doctors,
  Patients,
} from '@/views'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Consultas Médicas Online',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Registro',
    component: Register,
  },
  {
    path: '/home',
    name: 'Início',
    component: Home,
  },
  {
    path: '/newQuery',
    name: 'Nova Consulta',
    component: NewQuery,
  },
  {
    path: '/doctors',
    name: 'Doutores',
    component: Doctors,
  },
  {
    path: '/patients',
    name: 'Pacientes',
    component: Patients,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.name as string
  next()
})

export default router
