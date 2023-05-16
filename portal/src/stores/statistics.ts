import { Statistic } from '@/models'
import { DeficiencyService } from '@/services'
import { defineStore } from 'pinia'

export const useStatisticStore = defineStore('statistic', {
  state: () => ({
    statistics: [] as Statistic[],
  }),
  getters: {
    getStatistics(state) {
      return state.statistics
    },
  },
  actions: {
    async fetchAll() {
      this.statistics = await DeficiencyService.getStatistics()
    },
  },
})
