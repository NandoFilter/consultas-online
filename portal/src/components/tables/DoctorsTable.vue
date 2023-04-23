<template>
  <div class="content">
    <v-data-table
      :headers="headers"
      :items="doctors"
      :search="search"
      item-value="name"
      class="table"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Doctor, Hospital, Occupation, User } from '@/models'
import { DoctorService, UserService, HospitalService, OccupationService } from '@/services'
import rules from '@/utils/rules'

type DoctorTable = {
  id: number
  name?: string
  email?: string,
  hospital?: string
  occupation?: string
  academy?: string
}

export default defineComponent({
  async created() {
    const doctors = await DoctorService.getAll()
    const users = await UserService.getAll()
    const hospitals = await HospitalService.getAll()
    const occupations = await OccupationService.getAll()

    const items: Array<DoctorTable> = []

    doctors.forEach(async (doctor: Doctor) => {
      const user = users.find((user: User) => {
        if (doctor.ref_user == user.id) {
          return user
        }
      }) as User

      const hospital = hospitals.find((hospital: Hospital) => {
        if (doctor.ref_hospital == hospital.id) {
          return hospital
        }
      }) as Hospital

      const occupation = occupations.find((occupation: Occupation) => {
        if (doctor.ref_occupation == occupation.id) {
          return occupation
        }
      }) as Occupation

      const item: DoctorTable = {
        id: doctor.id as number,
        name: user.name,
        email: user.email,
        occupation: occupation.name,
        hospital: hospital.name,
        academy: doctor.acad_education,
      }

      items.push(item)
    })

    this.doctors = items
    this.hospitals = hospitals
    this.occupations = occupations
  },
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    doctorId: -1,
    doctorTableId: -1,
    userPassword: '',
    rules,

    headers: [
      { title: 'ID', align: 'start', key: 'id', sortable: false },
      { title: 'Nome', align: 'start', key: 'name' },
      { title: 'E-mail', align: 'start', key: 'email', sortable: false },
      { title: 'Ocupação', align: 'start', key: 'occupation' },
      { title: 'Hospital', align: 'start', key: 'hospital' },
      { title: 'Formação', align: 'start', key: 'academy' },
      { title: 'Ações', key: 'actions', sortable: false },
    ],

    doctors: [] as DoctorTable[],
    occupations: [] as Occupation[],
    hospitals: [] as Hospital[],

    editedItem: {
      id: -1,
      name: '',
      email: '',
      hospital: '',
      occupation: '',
      academy: ''
    } as DoctorTable,
  }),
  computed: {
    formTitle () {
      return this.doctorId === -1 ? 'Novo Médico' : 'Editar Médico'
    },
  },
  methods: {
    getOccupationNames() {
      const names: string[] = []

      this.occupations.forEach((occupation) => {
        names.push(occupation.name)
      })

      return names
    },
    getHospitalNames() {
      const names: string[] = []

      this.hospitals.forEach((hospital) => {
        names.push(hospital.name)
      })

      return names
    },
    async createDoctorFromTable(item: DoctorTable) {
      const newUser = {
        name: item.name,
        email: item.email,
        password: this.userPassword
      } as User

      const user = await UserService.add(newUser)

      const hospital = this.hospitals.find((hospital) => {
        if (item.hospital == hospital.name) {
          return hospital
        }
      }) as Hospital

      const occupation = this.occupations.find((occupation) => {
        if (item.occupation == occupation.name) {
          return occupation
        }
      }) as Occupation

      if (user) {
        const doctor = {
          ref_user: user.id,
          acad_education: item.academy,
          ref_occupation: occupation?.id,
          ref_hospital: hospital.id
        } as Doctor

        const newDoctor = await DoctorService.add(doctor)

        const doctorTable = {
          id: newDoctor.id,
          name: user.name,
          email: user.email,
          hospital: hospital.name,
          occupation: occupation.name,
          academy: item.academy,
        } as DoctorTable

        return doctorTable
      }

      return null
    },
    async updateDoctorFromTable(item: DoctorTable) {
      let selectedDoctor: Doctor = await DoctorService.getById(item.id)
      let selectedUser: User = await UserService.getById(selectedDoctor.ref_user)
      
      const hospital = this.hospitals.find((hospital) => {
        if (item.hospital == hospital.name) {
          return hospital
        }
      }) as Hospital

      const occupation = this.occupations.find((occupation) => {
        if (item.occupation == occupation.name) {
          return occupation
        }
      }) as Occupation

      selectedUser = {
        id: selectedUser.id,
        name: item.name,
        email: item.email
      } as User

      if (this.userPassword) {
        selectedUser.password = this.userPassword
      }

      selectedDoctor = {
        id: selectedDoctor.id,
        ref_user: selectedUser.id,
        acad_education: item.academy,
        ref_occupation: occupation.id,
        ref_hospital: hospital.id
      } as Doctor

      const updatedUser = await UserService.update(selectedUser)
      const updatedDoctor = await DoctorService.update(selectedDoctor)

      const doctorTable = {
        id: updatedDoctor.id,
        name: updatedUser.name,
        email: updatedUser.email,
        hospital: hospital.name,
        occupation: occupation.name,
        academy: item.academy,
      } as DoctorTable

      return doctorTable
    },
    async getDoctorUser(doctorId: number) {
      let selectedDoctor: Doctor = await DoctorService.getById(doctorId)

      return UserService.getById(selectedDoctor.ref_user)
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
        const doctorTable: DoctorTable = await this.updateDoctorFromTable(this.editedItem)

        Object.assign(this.doctors[this.doctorTableId], doctorTable)

        this.close()
      } else {
        const doctorTable = await this.createDoctorFromTable(this.editedItem)

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
      DoctorService.delete(this.doctorId)

      const user: User = await this.getDoctorUser(this.doctorId)

      if (user.id) {
        UserService.delete(user.id)
      }

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
.content {
  display: flex;
  flex-direction: column;
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
