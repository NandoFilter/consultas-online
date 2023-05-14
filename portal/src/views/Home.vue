<template>
  <div>
    <Navigation />
    <div class="main">
      <h1>Converse com um profissional</h1>
      <div>
        <div class="card">
          <v-icon icon="mdi-brain" />
          <span>Psicólogo</span>
        </div>  
      </div>
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

.card {
  width: 15vh;
  height: 10vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border-radius: 15px;
  box-shadow: 0px 3px 5px gray;
}

.card:hover {
  cursor: pointer;

  color: $primary-color;

  box-shadow: 0px 3px 5px $primary-color;
}
</style>