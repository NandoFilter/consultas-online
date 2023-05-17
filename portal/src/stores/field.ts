import { Deficiency, Dependency, Hospital, Occupation } from '@/models'
import {
  DeficiencyService,
  DependencyService,
  HospitalService,
  OccupationService,
} from '@/services'

import { defineStore } from 'pinia'

export const useFieldStore = defineStore('field', {
  state: () => ({
    deficiencies: [] as Deficiency[],
    dependencies: [] as Dependency[],
    hospitals: [] as Hospital[],
    occupations: [] as Occupation[],
  }),
  getters: {
    getDeficiencies(state) {
      return state.deficiencies
    },
    getDependencies(state) {
      return state.dependencies
    },
    getHospitals(state) {
      return state.hospitals
    },
    getOccupations(state) {
      return state.occupations
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
    getHospitalNames(state) {
      const names: string[] = []

      state.hospitals.forEach((hospital) => {
        names.push(hospital.name)
      })

      return names
    },
    getOccupationNames(state) {
      const names: string[] = []

      state.occupations.forEach((occupation) => {
        names.push(occupation.name)
      })

      return names
    },
  },
  actions: {
    async fetchAll() {
      this.deficiencies = await DeficiencyService.getAll()
      this.dependencies = await DependencyService.getAll()
      this.hospitals = await HospitalService.getAll()
      this.occupations = await OccupationService.getAll()
    },
  },
})
