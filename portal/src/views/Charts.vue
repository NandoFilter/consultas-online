<template>
  <div>
    <Navigation />
    <div class="main">
      <PieChart />
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
}
</style>