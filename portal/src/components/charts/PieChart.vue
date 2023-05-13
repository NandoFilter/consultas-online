<template>
  <Pie :data="data" :options="options" />
</template>
  
<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import ChartConfig from './chartConfig'

ChartJS.register(ArcElement, Tooltip, Legend)

type Data = {
  labels: any[]
  datasets: any[]
}

export default {
  name: 'App',
  components: {
    Pie
  },
  data: () => ({
    data: {} as Data,
    options: {},
  }),
  methods: {
    getConfig() {
      this.data = ChartConfig.getDeficiencies()
      this.options = ChartConfig.getOptions()
    }
  },
  beforeMount() {
    this.getConfig()
  }
}
</script>