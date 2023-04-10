<template>
  <div>
    <Navigation />
    <div class="main">
      <div class="content">
        <div class="header">
          <ExportButton :headers="headers" :items="items" class="header_btn" />
  
          <!-- Criar componente -->
          <v-dialog v-model="dialog" max-width="700px">
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:activator="{ props }">
              <v-btn class="header_btn" prepend-icon="mdi-plus" v-bind="props"
                >Adicionar</v-btn
              >
            </template>
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
        :items="items"
        :search="search"
        item-value="name"
        class="table elevation-1"
      >
        <!-- Delete Dialog -->
        <template v-slot:top>
          <!-- <DeleteDialog v-model="dialogDelete" /> -->
        </template>

        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
          <v-icon size="small" class="me-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation, ExportButton } from '@/components'
import { Doctor, Hospital, Occupation, User } from '@/models'
import { DoctorService, UserService, HospitalService, OccupationService } from '@/services'

type DoctorTable = {
  name?: string
  hospital?: string
  occupation?: string
  academy?: string
}

export default defineComponent({
  components: {
    Navigation,
    ExportButton,
  },
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
        name: user.name,
        occupation: occupation.name,
        hospital: hospital.name,
        academy: doctor.acad_education,
      }

      items.push(item)
    })

    this.items = items
  },
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,

    headers: [
      { title: 'Nome', align: 'start', key: 'name', sortable: false },
      { title: 'Área de Atuação', align: 'start', key: 'occupation' },
      { title: 'Hospital', align: 'start', key: 'hospital' },
      { title: 'Formação', align: 'start', key: 'academy' },
      { title: 'Ações', key: 'actions', sortable: false },
    ],
    items: [] as DoctorTable[]
  }),
  methods: {
    editItem (item: any) {
      this.dialog = true
    },
    deleteItem(item: any) {
      this.dialogDelete = true
    }
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

.deleteDialog {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
</style>
