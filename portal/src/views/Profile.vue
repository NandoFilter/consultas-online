<template>
  <div>
    <Navigation />
    <div class="main">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation } from '@/components';

export default defineComponent({
  components: {
    Navigation
  }
})
</script>

<style lang="scss" scoped>
.main {
  margin-left: 75px;
}
</style>