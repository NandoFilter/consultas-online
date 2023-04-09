<template>
  <div>
    <Navigation />
    <div class="main">
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
          <DeleteDialog v-model="dialogDelete" />
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation, ExportButton } from '@/components'
import DeleteDialog from '@/components/dialogs/DeleteDialog.vue'

export default defineComponent({
  components: {
    Navigation,
    ExportButton,
    DeleteDialog
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
    items: [
      {
        name: 'Fernando Filter',
        occupation: 'Psicólogo',
        hospital: 'Hospital Bruno Born',
        academy: 'Univates',
      },
      {
        name: 'Jorge da Silva',
        occupation: 'Nutricionista',
        hospital: 'Hospital Albert Einstein',
        academy: 'USP',
      },
      {
        name: 'Mariana Cunha',
        occupation: 'Dermatologista',
        hospital: 'Hospital Nove de Julho',
        academy: 'UFRGS',
      },
    ],
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
  align-items: center;
}
</style>
