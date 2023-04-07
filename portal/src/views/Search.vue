<template>
  <div>
    <Navigation />
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
h1 {
    margin-left: 50px;
}
</style>