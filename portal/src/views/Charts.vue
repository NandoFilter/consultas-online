<template>
  <div>
    <Navigation />
    <div class="main">
      <h1>Número de Pacientes com deficiências</h1>
      <div>
        <PieChart class="chart" />
      </div>
      <ExportButton :headers="headers" :items="getStatistics" title="Total de Deficiências" class="export_btn" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation, PieChart } from '@/components';
import { ExportButton } from '@/components/tables'
import { mapState } from 'pinia';
import { useStatisticStore } from '@/stores';
import { Deficiency, Statistic } from '../models';
import { DeficiencyService } from '../services';

type StatisticsTable = {
  id: number,
  name: string,
  total: number
}

export default defineComponent({
  components: {
    Navigation,
    PieChart,
    ExportButton,
  },
  computed: {
    ...mapState(useStatisticStore, ['getStatistics']),
  },
  async created() {
    this.deficiencies = await DeficiencyService.getAll()
  },
  data: () => ({
    headers: [
      { title: 'Nome',  key: 'id'   },
      { title: 'Total', key: 'name' },
    ],
    deficiencies: [] as Deficiency[],
    tableValues: [] as StatisticsTable[]
  }),
  methods: {
    getStatistics() {
      const statistics = this.getStatistics

      this.tableValues.forEach((t: StatisticsTable) => {
        this.deficiencies.forEach((d: Deficiency) => {
          t.id = d.id
        })

        statistics.forEach((s: Statistic) => {
          t.name = s.name
          t.total = s.total
        })
      })
      
      return this.tableValues
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  margin-left: 75px;
  margin-top: 12vh;

  & h1 {
    margin-left: 65vh;
  }
}

.export_btn {
  margin-top: 15px;
  margin-left: 89vh;
}

.chart {
  width: 35%;
}
</style>