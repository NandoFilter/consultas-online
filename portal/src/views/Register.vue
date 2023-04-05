<template>
  <div class="register">
    <v-container class="register_container fill-height">
      <v-card class="ma-auto px-6 py-8" min-width="400" max-width="500">
        <v-form fast-fail @submit.prevent="onRegister">
          <v-text-field
            v-model="name"
            :readonly="loading"
            :rules="nameRule"
            variant="underlined"
            label="Nome"
            validate-on="blur"
            required
          />

          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="emailRules"
            variant="underlined"
            label="E-mail"
            validate-on="blur"
            required
          />

          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="passwordRules"
            variant="underlined"
            label="Senha"
            type="password"
            validate-on="blur"
            required
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
      <router-link class="login_link" to="/">Voltar ao Início</router-link>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '../models';
import userService from '../services/userService';

export default defineComponent({
  data: () => ({
    name: '',
    email: '',
    password: '',
    loading: false,

    nameRule: [
      (v: string) => !!v || 'Informe seu nome',
    ],

    emailRules: [
        (v: string) => !!v || 'Informe seu e-mail',
    ],

    passwordRules: [
      (v: string) => !!v || 'Digite uma senha',
      (v: string) => v.length >= 8 || 'A senha precisa possuir 8 ou mais caractéres',
    ]
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

.button {
  background: $primary-color;
  color: white;

  margin-top: 10px;
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

function validateEmail(): any {
  throw new Error('Function not implemented.')
}
