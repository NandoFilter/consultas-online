<template>
  <div class="register">
    <v-container class="register_container fill-height">
      <v-card class="ma-auto px-6 py-8" min-width="650" max-width="500">
        <v-form fast-fail @submit.prevent="onRegister">
          <v-row align="center">
            <v-col>
              <v-text-field
                v-model="name"
                :readonly="loading"
                :rules="rules.name"
                variant="underlined"
                label="Nome"
                validate-on="blur"
                required
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="rules.email"
                variant="underlined"
                label="E-mail"
                validate-on="blur"
                required
              />
            </v-col>
          </v-row>
          
          <v-row align="center">
            <v-col>
              <v-text-field
                v-model="city"
                :readonly="loading"
                :rules="rules.city"
                variant="underlined"
                label="Cidade"
                validate-on="blur"
                required
              />
            </v-col>
            <v-col>
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
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col>
              <v-checkbox
                label="Possui deficiência?"
                v-model="hasDeficiency"
                color="primary"
                hide-details
              />
            </v-col>
            <v-col>
              <v-checkbox
                label="Possui dependência?"
                v-model="hasDependency"
                color="primary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col>
              <v-select
                label="Tipo de Deficiência"
                variant="underlined"
                v-model="deficiency"
                :items="getDeficiencyNames()"
                :disabled="!hasDeficiency"
              />
            </v-col>
            <v-col>
              <v-select
                label="Tipo de Dependência"
                variant="underlined"
                v-model="dependency"
                :items="getDependencyNames()"
                :disabled="!hasDependency"
              />
            </v-col>
          </v-row>

          <v-btn
            block
            :loading="loading"
            class="mt-5"
            color="primary"
            type="submit"
          >
            Cadastrar
          </v-btn>  
        </v-form>
        <div class="login">
          <router-link class="login_link" to="/login">Possui uma conta? Entrar</router-link>
        </div>
      </v-card>

      <v-alert
        class="alert"
        icon="$error"
        color="error"
        title="Erro ao efetuar cadastro"
        text="Reveja os valores preenchidos nos campos e tente novamente"
        v-model="showError"
        closable
      />

      <router-link class="login_link" to="/">Voltar ao Início</router-link>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Deficiency, Dependency, Patient, User } from '../models';
import { UserService, PatientService, DeficiencyService, DependencyService } from '../services'
import rules from '@/utils/rules'

export default defineComponent({
  async created() {
    [this.deficiencies, this.dependencies] = await Promise.all([
      DeficiencyService.getAll(),
      DependencyService.getAll()
    ])
  },
  data: () => ({
    name: '',
    email: '',
    city: '',
    password: '',
    hasDeficiency: false,
    hasDependency: false,
    deficiency: '',
    dependency: '',

    deficiencies: [] as Deficiency[],
    dependencies: [] as Dependency[],

    loading: false,
    showError: false,
    rules
  }),
  methods: {
    getDeficiencyNames() {
      const names: string[] = []

      this.deficiencies.forEach((deficiency) => {
        names.push(deficiency.name)
      })

      return names
    },
    getDependencyNames() {
      const names: string[] = []

      this.dependencies.forEach((dependency) => {
        names.push(dependency.name)
      })

      return names
    },
    getDeficiencyId(): number | null {
      const deficiency = this.deficiencies.find((deficiency) => {
        if (deficiency.name == this.deficiency) {
          return deficiency
        }
      })

      return deficiency ? deficiency.id : null
    },
    getDependencyId(): number | null {
      const dependency = this.dependencies.find((dependency) => {
        if (dependency.name == this.dependency) {
          return dependency
        }
      })

      return dependency ? dependency.id : null
    },
    async generateUser() {
      const user: User = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      if (user.password) {
        return UserService.add(user);
      }
    },
    async onRegister() {
      this.loading = true
      this.showError = false

      const newUser: User | undefined = await this.generateUser();

      if (newUser) {
        const patient: Patient = {
          ref_user: newUser.id as number,
          city: this.city,
          ref_dependency: this.getDependencyId(),
          ref_deficiency: this.getDeficiencyId()
        }

        PatientService.add(patient).then(() => {
          this.$router.push('/login')
        }).catch((err) => {
          this.showError = true

          throw err
        })
      } else {
        this.showError = true
      }

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

.alert {
  position: absolute;
}
</style>