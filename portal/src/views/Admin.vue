<template>
  <div>
    <Navigation />
    <div class="main">
      <TablesTop class="top" @select-tab="onClickChild" />

      <v-card>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="doctors">
              <DoctorsTable />
            </v-window-item>
          
            <v-window-item value="patients">
              <PatientsTable />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation } from '@/components';
import { TablesTop, DoctorsTable, PatientsTable } from '@/components/tables'
import rules from '@/utils/rules'

export default defineComponent({
  components: {
    Navigation,
    TablesTop,
    DoctorsTable,
    PatientsTable
  },
  computed: {
    formTitle () {
      return this.doctorId === -1 ? 'Novo Médico' : 'Editar Médico'
    },
  },
  data: () => ({
    tab: null,
    search: '',
    dialog: false,
    dialogDelete: false,
    doctorId: -1,
    doctorTableId: -1,
    userPassword: '',
    rules,

    doctors: [] as any[],
    occupations: [] as any[],
    hospitals: [] as any[],

    editedItem: {
      id: -1,
      name: '',
      email: '',
      hospital: '',
      occupation: '',
      academy: ''
    }
  }),
  methods: {
    onClickChild(value: any) {
      this.tab = value
    },
    async save () {
      // if (this.doctorId > -1) {
      //   const doctorTable: DoctorTable = await this.updateDoctorFromTable(this.editedItem)

      //   Object.assign(this.doctors[this.doctorTableId], doctorTable)

      //   this.close()
      // } else {
      //   const doctorTable = await this.createDoctorFromTable(this.editedItem)

      //   if (doctorTable) {
      //     this.doctors.push(doctorTable)
      //     this.close()
      //   }
      // }
    },
    close () {
      // this.dialog = false
      // this.doctorId = -1

      // this.clearFields()
    },
  }
})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 75px;
}
</style>