<template>
  <div>
    <Navigation />
    <div class="main">
      <h1>Número de Pacientes com deficiências</h1>
      <div>
        <PieChart class="chart" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation, PieChart } from '@/components';

export default defineComponent({
  components: {
    Navigation,
    PieChart,
  },
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

.chart {
  width: 35%;
}
</style>