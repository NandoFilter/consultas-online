import { Deficiency } from '@/models'
import { DeficiencyService } from '@/services'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    deficiencies: [] as Deficiency[],
  }),
  getters: {
    getDeficiencies(state) {
      return state.deficiencies
    },
    getDeficiencyNames(state) {
      const names: string[] = []

      state.deficiencies.forEach((deficiency) => {
        names.push(deficiency.name)
      })

      return names
    },
  },
  actions: {
    async fetchAll() {
      this.deficiencies = await DeficiencyService.getAll()
    },
  },
})
