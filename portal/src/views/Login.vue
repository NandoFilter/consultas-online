<template>
  <div class="login">
    <v-container class="login_container fill-height">
      <v-card class="ma-auto px-6 py-8" min-width="400" max-width="500">
        <v-form @submit.prevent="onLogin">
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="emailRule"
            variant="underlined"
            label="E-mail"
            validate-on="blur"
            required
          />
        
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="passwordRule"
            variant="underlined"
            label="Senha"
            type="password"
            validate-on="blur"
            required
          />

          <br>
          
          <v-btn
            block
            :loading="loading"
            color="primary"
            type="submit"
          >
            Entrar
          </v-btn>

          <div class="register">
            <router-link class="register_link" to="/register">Não possui uma conta? Cadastre-se</router-link>
          </div>
        </v-form>
      </v-card>

      <v-alert
        class="alert"
        icon="$error"
        color="error"
        title="Erro ao efetuar login"
        text="Reveja os valores preenchidos nos campos e tente novamente"
        v-model="showError"
        closable
      />

      <router-link class="register_link" to="/">Voltar ao Início</router-link>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '../models'
import SessionService from '../services/sessionService'

export default defineComponent({
  data: () => ({
    email: null,
    password: null,
    loading: false,
    showError: false,

    emailRule: [
      (v: string) => !!v || 'Informe seu e-mail'
    ],

    passwordRule: [
      (v: string) => !!v || 'Informe sua senha'
    ],
  }),
  methods: {
    onLogin() {
      this.loading = true
      this.showError = false

      if (this.email && this.password) {
        setTimeout(() => (this.loading = false), 2000)

        const user = {
          email: this.email,
          password: this.password
        } as User

        SessionService.login(user).then(() => {
          this.$router.push('/home')
        }).catch((err) => {
          this.showError = true

          throw err
        })
      } else {
        this.loading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;

  &_container {
    display: flex;
    flex-direction: column;
  }
}

.register {
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

.alert {
  position: absolute;
}
</style>