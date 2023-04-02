<template>
  <div>
    <v-card class="mx-auto mt-15 px-6 py-8" max-width="344">
      <v-form @submit.prevent="onLogin">
        <v-text-field
          v-model="email"
          :readonly="loading"
          variant="underlined"
          label="E-mail"
        />

        <v-text-field
          v-model="password"
          :readonly="loading"
          variant="underlined"
          label="Senha"
          type="password"
        />

        <br>

        <v-btn
          class="button"
          block
          :loading="loading"
          type="submit"
        >
          Entrar
        </v-btn>

        <div class="register">
          <router-link class="register_link" to="/register">Não possui uma conta? Cadastre-se</router-link>
        </div>
      </v-form>
    </v-card>
    <router-link class="register_link" to="/">Voltar para Home</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    email: null,
    password: null,
    loading: false
  }),
  methods: {
    onLogin() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  background: $primary-color;
  color: white
}

.register {
  margin-top: 10px;

  &_link{
    text-decoration: none;
    color: black;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>