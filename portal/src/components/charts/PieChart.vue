<template>
  <Pie :data="data" :options="options" />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { Deficiency } from '../../models'
import { DeficiencyService } from '@/services'
import { toRaw } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

type Data = {
  labels: any[]
  datasets: any[]
}

export default defineComponent ({
  name: 'App',
  components: {
    Pie
  },
  async created() {
    this.deficiencies = await DeficiencyService.getAll()
  },
  data: () => ({
    data: {} as Data,
    options: {},
    deficiencies: [] as Deficiency[]
  }),
  methods: {
    async getDeficiencyNames() {
      // let names: string[] = []
      // const deficiencies: Deficiency[] = toRaw(await DeficiencyService.getAll())

      // deficiencies.forEach((deficiency) => {
      //   names.push(deficiency.name)
      // })

      return null
    },
    async getConfig() {
      const test = ['Visual', 'Motora', 'Surdez', 'Autismo', 'Síndrome de Down']

      this.data = {
        labels: test,
        datasets: [
          {
            backgroundColor: [
              '#0EA7C7',
              '#0FD1BE',
              '#16B97A',
              '#0FD150',
              '#0EC717',
            ],
            data: [40, 20, 80, 10, 50],
          },
        ],
      }

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
      }
    }
  },
  async beforeMount() {
    await this.getConfig()
  }
})
</script>