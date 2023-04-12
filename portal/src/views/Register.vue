<template>
  <div class="register">
    <v-container class="register_container fill-height">
      <v-card class="ma-auto px-6 py-8" min-width="400" max-width="500">
        <v-form fast-fail @submit.prevent="onRegister">
          <v-text-field
            v-model="name"
            :readonly="loading"
            :rules="rules.name"
            variant="underlined"
            label="Nome"
            validate-on="blur"
            required
          />

          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="rules.email"
            variant="underlined"
            label="E-mail"
            validate-on="blur"
            required
          />

          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="rules.password"
            variant="underlined"
            label="Senha"
            type="password"
            validate-on="blur"
            required
          />

          <v-btn
            block
            :loading="loading"
            class="mt-5"
            color="primary"
            type="submit"
          >
            Cadastrar
          </v-btn>

          <div class="login">
            <router-link class="login_link" to="/login">Possui uma conta? Entrar</router-link>
          </div>
        </v-form>
      </v-card>
      <router-link class="login_link" to="/">Voltar ao Início</router-link>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '../models';
import userService from '../services/userService';
import rules from '@/utils/rules'

export default defineComponent({
  data: () => ({
    name: '',
    email: '',
    password: '',
    loading: false,
    rules
  }),
  methods: {
    onRegister() {
      this.loading = true

      const user: User = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      userService.add(user).then(() => {
        this.$router.push('/')
      })

      setTimeout(() => (this.loading = false), 2000)
    }
  }
})
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;

  &_container {
    display: flex;
    flex-direction: column;
  }
}

.login {
  margin-top: 10px;
  text-align: center;

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

function validateEmail(): any {
  throw new Error('Function not implemented.')
}
