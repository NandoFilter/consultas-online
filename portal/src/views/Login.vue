<template>
  <div>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          variant="underlined"
          label="E-mail"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          variant="underlined"
          label="Senha"
          type="password"
        ></v-text-field>

        <br>

        <v-btn
          class="sign"
          block
          :loading="loading"
          type="submit"
        >
          Entrar
        </v-btn>

        <div class="register">
          <a class="register_link" href="">
            <p class=register_label>Não possui uma conta? Cadastre-se</p>
          </a>
        </div>
      </v-form>
    </v-card>
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
    onSubmit() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    }
  }
})
</script>

<style lang="scss" scoped>
.sign {
  background: $primary-color;
  color: white
}

.register {
  margin-top: 10px;

  &_link{
    text-decoration: none;
  
    &:hover {
      text-decoration: underline;
    }
  }

  &_label {
    color: black;
    font-size: 14px;
  }
}
</style>