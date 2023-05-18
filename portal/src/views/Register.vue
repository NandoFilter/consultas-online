<template>
  <div>
    <Header class="header" />
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
                  :items="getDeficiencyNames"
                  :disabled="!hasDeficiency"
                  clearable
                />
              </v-col>
              <v-col>
                <v-select
                  label="Tipo de Dependência"
                  variant="underlined"
                  v-model="dependency"
                  :items="getDependencyNames"
                  :disabled="!hasDependency"
                  clearable
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
          :text="errorText"
          v-model="showError"
          closable
        />
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Header } from '@/components';
import { useFieldStore } from '@/stores';
import rules from '@/utils/rules';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
import { Deficiency, Dependency, Patient, User } from '../models';
import { DeficiencyService, DependencyService, PatientService, UserService } from '../services';

export default defineComponent({
  components: {
    Header
  },
  computed: {
    ...mapState(useFieldStore, ['getDeficiencyNames', 'getDependencyNames'])
  },
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
    errorText: 'Reveja os valores preenchidos nos campos e tente novamente',

    deficiencies: [] as Deficiency[],
    dependencies: [] as Dependency[],

    loading: false,
    showError: false,
    rules
  }),
  methods: {
    getDeficiencyId(): number | null {
      const deficiency = this.deficiencies.find((deficiency) => {
        if (deficiency.name == this.deficiency) {
          return deficiency
        }
      })

      return deficiency && this.hasDeficiency ? deficiency.id : null
    },
    getDependencyId(): number | null {
      const dependency = this.dependencies.find((dependency) => {
        if (dependency.name == this.dependency) {
          return dependency
        }
      })

      return dependency && this.hasDependency ? dependency.id : null
    },
    async createUser() {
      const user: User = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      const users = await UserService.getAll()

      const existedUser = users.find((u) => {
        return u.email == user.email
      })

      const isValidPass = user.password && user.password.length >= 8

      if (existedUser) {
        this.showError = true
        this.errorText = 'E-mail já cadastrado. Tente novamente'
      }

      if ( isValidPass && !existedUser) {
        return UserService.add(user);
      }
    },
    async onRegister() {
      this.loading = true
      this.showError = false

      const newUser: User | undefined = await this.createUser();

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

      setTimeout(() => (this.loading = false), 1000)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0px 1px 5px rgb(199, 199, 199);
}

.register {
  height: 90vh;

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