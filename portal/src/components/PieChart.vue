<template>
  <Pie :data="data" :options="options" />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { mapState } from 'pinia'
import { useStatisticStore } from '@/stores'

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
  computed: {
    ...mapState(useStatisticStore, ['getStatistics'])
  },
  data: () => ({
    data: {} as Data,
    options: {},
  }),
  methods: {
    async getConfig() {
      const statistics = this.getStatistics

      let names: string[] = []
      let totals: number[] = []

      statistics.forEach((s) => {
        names.push(s.name)
        totals.push(s.total)
      })

      this.data = {
        labels: names,
        datasets: [
          {
            backgroundColor: [
              '#0EA7C7',
              '#0FD1BE',
              '#16B97A',
              '#0FD150',
              '#0EC717',
            ],
            data: totals,
          },
        ],
      }

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
      }
    }
  },
  beforeMount() {
    this.getConfig()
  },
})
</script>