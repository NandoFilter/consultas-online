import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useSessionStore } from '@/stores'

import {
  LandingPage,
  Login,
  Register,
  Home,
  NewQuery,
  Doctors,
  Patients,
  Profile,
  Admin,
} from '@/views'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Consultas Médicas Online',
    component: LandingPage,
    meta: {
      onlyGuests: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      onlyGuests: true,
    },
  },
  {
    path: '/register',
    name: 'Registro',
    component: Register,
    meta: {
      onlyGuests: true,
    },
  },
  {
    path: '/home',
    name: 'Início',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/newQuery',
    name: 'Nova Consulta',
    component: NewQuery,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/doctors',
    name: 'Doutores',
    component: Doctors,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/patients',
    name: 'Pacientes',
    component: Patients,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'Administração',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/logout',
    redirect: '/',
    beforeEnter(to, from, next) {
      const session = useSessionStore()

      session.clearSession()

      next()
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // const session = useSessionStore()

  // document.title = to.name as string

  // const isTokenValid = jwt.isTokenValid(session.token)

  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //   if (!isTokenValid) {
  //     next({ path: '/login' })
  //   } else {
  //     next()
  //   }
  // } else if (to.matched.some((record) => record.meta.onlyGuests)) {
  //   if (isTokenValid) {
  //     next({ path: '/home' })
  //   } else {
  //     next()
  //   }
  // } else {
    next()
  // }
})

export default router
