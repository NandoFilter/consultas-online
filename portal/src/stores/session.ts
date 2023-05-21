import { User } from '@/models'
import jwt from '@/plugins/jwt'
import { UserService } from '@/services'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    token: localStorage.getItem('token') ?? '',
    actualUser: undefined as User | undefined,
  }),
  getters: {
    getToken(state) {
      return state.token
    },
    getActualUser(state) {
      return state.actualUser
    },
  },
  actions: {
    setToken(token: string) {
      localStorage.setItem('token', token)

      this.token = token
    },
    clearSession() {
      localStorage.removeItem('token')

      this.token = ''
    },
    async setActualUser() {
      const userId = jwt.decode(this.token).payload.id

      this.actualUser = await UserService.getById(userId)
    },
  },
})
