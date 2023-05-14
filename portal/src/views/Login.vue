<template>
  <div>
    <Header class="header" />
    <div class="login">
      <v-container class="login_container fill-height">
        <v-card class="ma-auto px-6 py-8" min-width="400" max-width="500">
          <v-form @submit.prevent="onLogin">
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
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '../models'
import { Header } from '@/components'
import SessionService from '../services/sessionService'
import { mapActions } from 'pinia'
import { useSessionStore } from '@/stores'
import rules from '@/utils/rules'

export default defineComponent({
  components: {
    Header
  },
  data: () => ({
    email: null,
    password: null,
    loading: false,
    showError: false,
    rules
  }),
  methods: {
    ...mapActions(useSessionStore, ['setToken']),
    onLogin() {
      this.loading = true
      this.showError = false

      if (this.email && this.password) {
        setTimeout(() => (this.loading = false), 2000)

        const user = {
          email: this.email,
          password: this.password
        } as User

        SessionService.login(user).then((result) => {
          this.setToken(result.token)

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
.header {
  box-shadow: 0px 1px 5px rgb(199, 199, 199);
}

.login {
  height: 90vh;

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