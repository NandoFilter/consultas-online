import { Deficiency, Dependency } from '@/models'
import { DeficiencyService, DependencyService } from '@/services'
import { defineStore } from 'pinia'

export const useFieldStore = defineStore('field', {
  state: () => ({
    deficiencies: [] as Deficiency[],
    dependencies: [] as Dependency[],
  }),
  getters: {
    getDeficiencies(state) {
      return state.deficiencies
    },
    getDependencies(state) {
      return state.dependencies
    },

    getDeficiencyNames(state) {
      const names: string[] = []

      state.deficiencies.forEach((deficiency) => {
        names.push(deficiency.name)
      })

      return names
    },
    getDependencyNames(state) {
      const names: string[] = []

      state.dependencies.forEach((dependency) => {
        names.push(dependency.name)
      })

      return names
    },
  },
  actions: {
    async fetchAll() {
      this.deficiencies = await DeficiencyService.getAll()
      this.dependencies = await DependencyService.getAll()
    },
  },
})
