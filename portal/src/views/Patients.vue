<template>
  <div>
    <Navigation />
    <div class="main">
      <div class="content">
        <div class="header">
          <ExportButton
            :headers="headers"
            :items="filteredItems"
            title="Pacientes cadastrados"
            class="header_btn"
          />
  
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
                        :rules="rules.city"
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
                        :items="getDeficiencyNames"
                        :disabled="!hasDeficiency"
                        clearable
                      />
                    </v-col>
                    <v-col>
                      <v-select
                        label="Tipo de Dependência"
                        variant="underlined"
                        v-model="editedItem.dependency"
                        :items="getDependencyNames"
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
              color="primary"
              prepend-inner-icon="mdi-magnify"
              variant="solo"
              label="Pesquisar"
              single-line
              hide-details
            />
          </div>
        </div>

        <v-data-table
          :headers="headers"
          :items="filteredItems"
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

        <!-- Filtros -->
        <div class="bottom">
          <div class="bottom_filters">
            <v-select
              class="bottom_filters_filter"
              :items="getDeficiencyNames"
              v-model="filterDeficiency"
              prepend-inner-icon="mdi-wheelchair"
              variant="solo"
              label="Deficiência"
              single-line
              hide-details
              clearable
            />
  
            <v-select
              class="bottom_filters_filter"
              :items="getDependencyNames"
              v-model="filterDependency"
              prepend-inner-icon="mdi-pill"
              variant="solo"
              label="Dependência"
              single-line
              hide-details
              clearable
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Navigation } from '@/components'
import { ExportButton } from '@/components/tables'
import { Patient, PatientTable, User } from '@/models'
import { PatientService, TableService, UserService } from '@/services'
import { useFieldStore, useStatisticStore } from '@/stores'
import rules from '@/utils/rules'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Navigation,
    ExportButton,
  },
  computed: {
    ...mapState(useFieldStore, ['getDeficiencies','getDependencies' ,'getDeficiencyNames', 'getDependencyNames']),

    formTitle () {
      return this.patientId === -1 ? 'Novo Paciente' : 'Editar Paciente'
    },
    filteredItems() {
      const searchFilter = (p: PatientTable) => {
        const search = this.search.toLowerCase()

        return p.name?.toLowerCase().includes(search) ||
               p.city?.toLowerCase().includes(search)
      }

      const deficiencyFilter = (p: PatientTable) => {
        if (this.filterDeficiency) {
          return p.deficiency?.includes(this.filterDeficiency)
        }

        return true
      }
 
      const dependencyFilter = (p: PatientTable) => {
        if (this.filterDependency) {
          return p.dependency?.includes(this.filterDependency)
        }

        return true
      }

      return this.patients.filter(searchFilter).filter(deficiencyFilter).filter(dependencyFilter)
    },
  },
  async created() {
    this.patients = await TableService.getAllPatients()
  },
  data: () => ({
    search: '',
    filterDeficiency: null,
    filterDependency: null,

    dialog: false,
    dialogDelete: false,
    patientId: -1,
    patientTableId: -1,
    userPassword: '',
    rules,

    headers: [
      { title: 'ID',          align: 'start', key: 'id',         sortable: false },
      { title: 'Nome',        align: 'start', key: 'name',       sortable: true  },
      { title: 'E-mail',      align: 'start', key: 'email',      sortable: false },
      { title: 'Cidade',      align: 'start', key: 'city',       sortable: true  },
      { title: 'Deficiência', align: 'start', key: 'deficiency', sortable: true  },
      { title: 'Dependência', align: 'start', key: 'dependency', sortable: true  },
      { title: 'Ações',       align: 'start', key: 'actions',    sortable: false },
    ],

    patients: [] as PatientTable[],

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
  methods: {
    ...mapActions(useStatisticStore, ['fetchAll']),

    getDeficiencyId(name: string): number | null {
      const deficiency = this.getDeficiencies.find((deficiency) => {
        if (deficiency.name == name) {
          return deficiency
        }
      })

      return deficiency && this.hasDeficiency ? deficiency.id : null
    },
    getDependencyId(name: string): number | null {
      const dependency = this.getDependencies.find((dependency) => {
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

      const user: User = await UserService.add(newUser)

      if (user) {
        const newPatient = {
          ref_user: user.id,
          city: item.city,
          ref_deficiency: null,
          ref_dependency: null
        } as Patient

        if (item.deficiency) {
          newPatient.ref_deficiency = this.getDeficiencyId(item.deficiency)
        }

        if (item.dependency) {
          newPatient.ref_dependency = this.getDependencyId(item.dependency)
        }

        const patient: Patient = await PatientService.add(newPatient)

        if (patient.id) {
          item.id = patient.id
        }

        return item
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

      item = await TableService.getPatientById(item.id)

      return item
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

      this.fetchAll()
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

      this.fetchAll()

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

  &_filter {
    width: 12vw;
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

.bottom {
  display: flex;
  justify-content: center;

  &_filters {
    display: flex;
    flex-direction: row;

    width: 50%;

    margin-top: 15px;
    gap: 15px;

    &_filter {
      width: 200px;
    }
  }
}
</style>
