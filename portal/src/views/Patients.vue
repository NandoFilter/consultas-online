<template>
  <div>
    <Navigation />
    <div class="main">
      <div class="content">
        <div class="header">
          <ExportButton :headers="headers" :items="patients" class="header_btn" />
  
          <v-dialog v-model="dialog" max-width="700px">
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:activator="{ props }">
              <v-btn class="header_btn" prepend-icon="mdi-plus" v-bind="props">
                Adicionar
              </v-btn>
            </template>

            <!-- Adicionar / Editar  -->
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>

                  <v-row align="center">
                    <v-col>
                      <v-text-field
                        variant="underlined"
                        v-model="editedItem.name"
                        label="Nome"
                        :rules="rules.name"
                        validate-on="blur"
                        required
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        variant="underlined"
                        v-model="editedItem.email"
                        label="E-mail"
                        :rules="rules.email"
                        validate-on="blur"
                        required
                      />
                    </v-col>
                  </v-row>

                  <v-row align="center">
                    <v-col>
                      <v-text-field
                        variant="underlined"
                        type="password"
                        v-model="userPassword"
                        label="Senha"
                        :rules="rules.password"
                        validate-on="blur"
                        required
                        :disabled="patientId != -1"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        variant="underlined"
                        v-model="editedItem.city"
                        label="Cidade"
                        :rules="rules.academy"
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
                        v-model="editedItem.deficiency"
                        :items="getDeficiencyNames()"
                        :disabled="!hasDeficiency"
                        clearable
                      />
                    </v-col>
                    <v-col>
                      <v-select
                        label="Tipo de Dependência"
                        variant="underlined"
                        v-model="editedItem.dependency"
                        :items="getDependencyNames()"
                        :disabled="!hasDependency"
                        clearable
                      />
                    </v-col>
                  </v-row>

                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />

                <v-btn color="primary" variant="text" @click="save">
                  Salvar
                </v-btn>
                
                <v-btn color="primary" variant="text" @click="close">
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  
          <div class="header_txt">
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              variant="underlined"
              label="Pesquisar"
              single-line
              hide-details
              clearable
            />
          </div>
        </div>

        <v-data-table
          :headers="headers"
          :items="patients"
          :search="search"
          item-value="name"
          class="table elevation-1"
        >
          <!-- Delete Dialog -->
          <template v-slot:top>
            <v-dialog v-model="dialogDelete" max-width="379px">
              <v-card class="dialog_delete">
                <v-card-title class="text-h5"
                  >Deseja excluir este paciente?
                </v-card-title>
                <v-card-actions>
                  <v-btn color="primary" text @click="deleteItemConfirm">
                    Confirmar
                  </v-btn>

                  <v-btn color="primary" text @click="closeDelete">
                    Cancelar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-slot:item.actions="{ item }">
            <v-icon size="small" class="me-2" @click="editItem(item.raw)">
              mdi-pencil
            </v-icon>

            <v-icon size="small" @click="deleteItem(item.raw)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation } from '@/components'
import { ExportButton } from '@/components/tables'
import { Dependency, Deficiency, Patient, User } from '@/models'
import { UserService, DependencyService, DeficiencyService, PatientService, TableService } from '@/services'
import { PatientTable } from '@/models'
import rules from '@/utils/rules'

export default defineComponent({
  components: {
    Navigation,
    ExportButton,
  },
  async created() {
    this.patients = await TableService.getAllPatients()
    this.deficiencies = await DeficiencyService.getAll()
    this.dependencies = await DependencyService.getAll()
  },
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    patientId: -1,
    patientTableId: -1,
    userPassword: '',
    rules,

    headers: [
      { title: 'ID', align: 'start', key: 'id', sortable: false },
      { title: 'Nome', align: 'start', key: 'name' },
      { title: 'E-mail', align: 'start', key: 'email', sortable: false },
      { title: 'Cidade', align: 'start', key: 'city' },
      { title: 'Deficiência', align: 'start', key: 'deficiency' },
      { title: 'Dependência', align: 'start', key: 'dependency' },
      { title: 'Ações', key: 'actions', sortable: false },
    ],

    patients: [] as PatientTable[],
    deficiencies: [] as Deficiency[],
    dependencies: [] as Dependency[],

    editedItem: {
      id: -1,
      name: '',
      email: '',
      city: '',
      deficiency: '',
      dependency: ''
    } as PatientTable,

    hasDeficiency: false,
    hasDependency: false,
  }),
  computed: {
    formTitle () {
      return this.patientId === -1 ? 'Novo Paciente' : 'Editar Paciente'
    },
  },
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
    getDeficiencyId(name: string): number | null {
      const deficiency = this.deficiencies.find((deficiency) => {
        if (deficiency.name == name) {
          return deficiency
        }
      })

      return deficiency && this.hasDeficiency ? deficiency.id : null
    },
    getDependencyId(name: string): number | null {
      const dependency = this.dependencies.find((dependency) => {
        if (dependency.name == name) {
          return dependency
        }
      })

      return dependency && this.hasDependency ? dependency.id : null
    },

    async createPatient(item: PatientTable) {
      const newUser = {
        name: item.name,
        email: item.email,
        password: this.userPassword
      } as User

      const user = await UserService.add(newUser)

      if (user) {
        // const patient = {
        //   ref_user: user.id,
        //   acad_education: item.academy,
        //   ref_occupation: occupation?.id,
        //   ref_hospital: hospital.id
        // } as Patient

        // const newDoctor = await DoctorService.add(doctor)

        // const PatientTable = {
        //   id: newDoctor.id,
        //   name: user.name,
        //   email: user.email,
        //   hospital: hospital.name,
        //   occupation: occupation.name,
        //   academy: item.academy,
        // } as PatientTable

        // return PatientTable
      }

      return null
    },
    async updatePatient(item: PatientTable) {
      let selectedPatient: Patient | undefined
      let selectedUser: User | undefined

      if (item.id) {
        selectedPatient = await PatientService.getById(item.id)
      }

      if (selectedPatient && selectedPatient.ref_user) {
        selectedUser = await UserService.getById(selectedPatient.ref_user)

        if (item.city) {
          selectedPatient.city = item.city as string
        }

        if (item.deficiency) {
          selectedPatient.ref_deficiency = this.getDeficiencyId(item.deficiency)
        }

        if (item.dependency) {
          selectedPatient.ref_dependency = this.getDependencyId(item.dependency)
        }

        await PatientService.update(selectedPatient)
      }
      
      if (selectedUser) {
        selectedUser.name = item.name
        selectedUser.email = item.email as string

        await UserService.update(selectedUser)
      }

      // return patientTable
      return undefined
    },
    async getUser(patientId: number) {
      let selectedPatient: Patient = await PatientService.getById(patientId)

      return UserService.getById(selectedPatient.ref_user)
    },

    // Dialog Methods -------------------------
    editItem (patient: PatientTable) {
      this.patientTableId = this.patients.indexOf(patient)
      this.patientId = patient.id

      this.hasDeficiency = !!patient.deficiency
      this.hasDependency = !!patient.dependency

      this.editedItem = Object.assign({}, patient)
      this.dialog = true
    },
    async save () {
      if (this.patientId > -1) {
        const patientTable = await this.updatePatient(this.editedItem)

        Object.assign(this.patients[this.patientTableId], patientTable)

        this.close()
      } else {
        const patientTable = await this.createPatient(this.editedItem)

        if (patientTable) {
          this.patients.push(patientTable)
          this.close()
        }
      }
    },
    close () {
      this.dialog = false
      this.patientId = -1

      this.clearFields()
    },
    deleteItem(patient: PatientTable) {
      this.patientTableId = this.patients.indexOf(patient) 
      this.patientId = patient.id

      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      await PatientService.delete(this.patientId)

      this.patients.splice(this.patientTableId, 1)

      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
      this.patientId = -1
    },
    clearFields() {
      this.editedItem ={
        id: -1,
        name: '',
        email: '',
        city: '',
        deficiency: '',
        dependency: ''
      },

      this.userPassword = ''
    },
    // -----------------------------------------
  }
})
</script>

<style lang="scss" scoped>
.main {
  margin-top: 75px;
  margin-left: 75px;

  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: end;

  margin-right: 30px;
  margin-bottom: 15px;

  &_btn {
    text-transform: unset !important;
    margin: 10px 5px;
  }

  &_txt {
    width: 25vw;
    margin-left: 10px;
  }
}

.table {
  width: 75vw;
  padding: 5px;
  border-radius: 10px;
}

.dialog_delete {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
</style>
