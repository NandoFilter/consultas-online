<template>
  <div>
    <Navigation />
    <div class="main">
      <div class="content">
        <div class="header">
          <ExportButton
            :headers="headers"
            :items="filteredItems"
            title="Médicos cadastrados"
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
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        variant="underlined"
                        v-model="editedItem.name"
                        label="Nome"
                        :rules="rules.name"
                        validate-on="blur"
                        required
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
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
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        variant="underlined"
                        type="password"
                        v-model="userPassword"
                        label="Senha"
                        :rules="rules.password"
                        validate-on="blur"
                        required
                        :disabled="doctorId != -1"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        variant="underlined"
                        v-model="editedItem.academy"
                        label="Formação"
                        :rules="rules.academy"
                        validate-on="blur"
                        required
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        variant="underlined"
                        :items="getOccupationNames"
                        v-model="editedItem.occupation"
                        label="Ocupação"
                        :rules="rules.occupation"
                        validate-on="blur"
                        required
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        variant="underlined"
                        :items="getHospitalNames"
                        v-model="editedItem.hospital"
                        label="Hospital"
                        :rules="rules.hospital"
                        validate-on="blur"
                        required
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
                  >Deseja excluir este médico?
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
              class="bottom_filters_occupation"
              :items="getOccupationNames"
              v-model="filterOccupation"
              prepend-inner-icon="mdi-stethoscope"
              variant="solo"
              label="Ocupação"
              single-line
              hide-details
              clearable
            />
  
            <v-select
              class="bottom_filters_hospital"
              :items="getHospitalNames"
              v-model="filterHospital"
              prepend-inner-icon="mdi-hospital-building"
              variant="solo"
              label="Hospital"
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
import { Doctor, DoctorTable, User } from '@/models'
import { DoctorService, UserService } from '@/services'
import { useFieldStore } from '@/stores'
import rules from '@/utils/rules'
import { mapState } from 'pinia'
import { defineComponent } from 'vue'
import { TableService } from '../services'

export default defineComponent({
  components: {
    Navigation,
    ExportButton,
  },
  computed: {
    ...mapState(useFieldStore, ['getHospitals', 'getOccupations', 'getHospitalNames', 'getOccupationNames']),
    formTitle() {
      return this.doctorId === -1 ? 'Novo Médico' : 'Editar Médico'
    },
    filteredItems() {
      const searchFilter = (d: DoctorTable) => {
        const search = this.search.toLowerCase()

        return d.name?.toLowerCase().includes(search) ||
               d.academy?.toLowerCase().includes(search)
      }

      const occupationFilter = (d: DoctorTable) => {
        if (this.filterOccupation) {
          return d.occupation?.includes(this.filterOccupation)
        }

        return true
      }
 
      const hospitalFilter = (d: DoctorTable) => {
        if (this.filterHospital) {
          return d.hospital?.includes(this.filterHospital)
        }

        return true
      }

      return this.doctors.filter(searchFilter).filter(occupationFilter).filter(hospitalFilter)
    },
  },
  async created() {
    this.doctors = await TableService.getAllDoctors()
  },
  data: () => ({
    search: '',
    filterHospital: null,
    filterOccupation: null,

    dialog: false,
    dialogDelete: false,
    doctorId: -1,
    doctorTableId: -1,
    userPassword: '',
    rules,

    headers: [
      { title: 'ID',       align: 'start', key: 'id',         sortable: false },
      { title: 'Nome',     align: 'start', key: 'name',       sortable: true  },
      { title: 'E-mail',   align: 'start', key: 'email',      sortable: false },
      { title: 'Ocupação', align: 'start', key: 'occupation', sortable: true  },
      { title: 'Hospital', align: 'start', key: 'hospital',   sortable: true  },
      { title: 'Formação', align: 'start', key: 'academy',    sortable: true  },
      { title: 'Ações',    align: 'start', key: 'actions',    sortable: false },
    ],

    doctors: [] as DoctorTable[],

    editedItem: {
      id: -1,
      name: '',
      email: '',
      occupation: '',
      hospital: '',
      academy: ''
    } as DoctorTable,
  }),
  methods: {
    getOccupationId(name: string): number | null {
      const occupation = this.getOccupations.find((occupation) => {
        if (occupation.name == name) {
          return occupation
        }
      })

      return occupation ? occupation.id : null
    },
    getHospitalId(name: string): number | null {
      const hospital = this.getHospitals.find((hospital) => {
        if (hospital.name == name) {
          return hospital
        }
      })

      return hospital && hospital.id ? hospital.id : null
    },

    async createDoctor(item: DoctorTable) {
      const newUser = {
        name: item.name,
        email: item.email,
        password: this.userPassword
      } as User

      const user = await UserService.add(newUser)

      if (user) {
        const newDoctor = {
          ref_user: user.id,
          acad_education: item.academy,
          ref_occupation: null,
          ref_hospital: null
        } as Doctor

        if (item.occupation) {
          newDoctor.ref_occupation = this.getOccupationId(item.occupation)
        }

        if (item.hospital) {
          newDoctor.ref_hospital = this.getHospitalId(item.hospital)
        }

        const doctor: Doctor = await DoctorService.add(newDoctor)

        if (doctor.id) {
          item.id = doctor.id
        }

        return item
      }

      return null
    },
    async updateDoctor(item: DoctorTable) {
      let selectedDoctor: Doctor | undefined
      let selectedUser: User | undefined
      
      if (item.id) {
        selectedDoctor = await DoctorService.getById(item.id)
      }

      if (selectedDoctor && selectedDoctor.ref_user) {
        selectedUser = await UserService.getById(selectedDoctor.ref_user)

        if (item.academy) {
          selectedDoctor.acad_education = item.academy
        }

        if (item.occupation) {
          selectedDoctor.ref_occupation = this.getOccupationId(item.occupation)
        }

        if (item.hospital) {
          selectedDoctor.ref_hospital = this.getHospitalId(item.hospital)
        }

        await DoctorService.update(selectedDoctor)
      }

      if (selectedUser) {
        selectedUser.name = item.name
        selectedUser.email = item.email as string

        await UserService.update(selectedUser)
      }

      item = await TableService.getDoctorById(item.id)

      return item
    },

    // Dialog Methods -------------------------
    editItem (doctor: DoctorTable) {
      this.doctorTableId = this.doctors.indexOf(doctor)
      this.doctorId = doctor.id

      this.editedItem = Object.assign({}, doctor)
      this.dialog = true
    },
    async save () {
      if (this.doctorId > -1) {
        const doctorTable: DoctorTable = await this.updateDoctor(this.editedItem)

        Object.assign(this.doctors[this.doctorTableId], doctorTable)

        this.close()
      } else {
        const doctorTable = await this.createDoctor(this.editedItem)

        if (doctorTable) {
          this.doctors.push(doctorTable)
          this.close()
        }
      }
    },
    close () {
      this.dialog = false
      this.doctorId = -1

      this.clearFields()
    },
    deleteItem(doctor: DoctorTable) {
      this.doctorTableId = this.doctors.indexOf(doctor) 
      this.doctorId = doctor.id

      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      await DoctorService.delete(this.doctorId)

      this.doctors.splice(this.doctorTableId, 1)

      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
      this.doctorId = -1
    },
    clearFields() {
      this.editedItem = {
        id: -1,
        name: '',
        hospital: '',
        occupation: '',
        academy: ''
      } as DoctorTable

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

.bottom {
  display: flex;
  justify-content: center;

  &_filters {
    display: flex;
    flex-direction: row;

    width: 50%;

    margin-top: 15px;
    gap: 15px;

    &_occupation {
      width: 250px;
    }

    &_hospital {
      width: 400px;
    }
  }
}
</style>
