<template>
  <div class="header">
    <v-btn class="header_btn" variant="text">
      <router-link class="logo" to="/">
        <v-icon size="x-large">mdi-heart-pulse</v-icon>
        Consultas
      </router-link>
    </v-btn>
    <nav>
      <v-btn class="header_btn" variant=text>
        <router-link to="/login">Entrar</router-link>
      </v-btn>

      <v-btn class="header_btn">
        <router-link class="register" to="/register">Cadastre-se</router-link>
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
  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &_btn {
    text-transform: unset !important;
  }
}

.logo {
  color: $primary-color;
  font-weight: bold;
}

.register {
  color: #fff;
}

a {
  color: #000;
  text-decoration: none;
}

</style>