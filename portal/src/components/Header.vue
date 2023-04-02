<template>
  <div class="header">
    <v-btn variant="text">
      <router-link to="/">Home</router-link>
    </v-btn>
    <nav>
      <v-btn variant=text>
        <router-link to="/login">Entrar</router-link>
      </v-btn>

      <v-btn variant=text>
        <router-link to="/register">Cadastre-se</router-link>
      </v-btn>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
.header {
  background: $primary-color;
  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

</style>