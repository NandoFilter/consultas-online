<template>
  <div>
    <v-card class="mx-auto mt-15 px-6 py-8" max-width="344">
      <v-form @submit.prevent="onRegister">
        <v-text-field
          v-model="name"
          :readonly="loading"
          variant="underlined"
          label="Nome"
        />

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

        <v-btn
          class="button"
          block
          :loading="loading"
          type="submit"
        >
          Cadastrar
        </v-btn>

        <div class="login">
          <router-link class="login_link" to="/login">Possui uma conta? Entrar</router-link>
        </div>
      </v-form>
    </v-card>
    <router-link class="login_link" to="/">Voltar para Home</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    name: null,
    email: null,
    password: null,
    loading: false
  }),
  methods: {
    onRegister() {
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

.login {
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
