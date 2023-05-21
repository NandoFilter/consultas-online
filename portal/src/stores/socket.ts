import { defineStore } from 'pinia'
import io from 'socket.io-client'

export const useSocketStore = defineStore('socket', {
  state: () => ({
    socket: undefined as any | undefined,
  }),
  getters: {
    getSocket(state) {
      return state.socket
    },
  },
  actions: {
    connect() {
      this.socket = io('localhost:3333')
    },
  },
})
