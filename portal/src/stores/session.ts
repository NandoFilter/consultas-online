import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    token: localStorage.getItem('token') ?? '',
  }),
  getters: {
    getToken(state) {
      return state.token
    },
  },
  actions: {
    setToken(token: string) {
      localStorage.setItem('token', token)

      this.token = token
    },
  },
})
