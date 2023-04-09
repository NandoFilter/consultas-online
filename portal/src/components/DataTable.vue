<template>
  <div>
    <div class="header">
      <ExportButton
        :headers="headers"
        :items="items"
        class="header_btn"
      />

      <!-- Criar componente -->
      <v-dialog v-model="dialog" max-width="700px">
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:activator="{ props }">
          <v-btn class="header_btn" prepend-icon="mdi-plus" v-bind="props" >Adicionar</v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="text-h5">Adicionar item</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="Dessert name"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              variant="text"
            >
              Adicionar
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
      :items="items"
      :search="search"
      item-value="name"
      class="table elevation-1"
    >

      <!-- Delete Dialog -->
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="375px">
          <v-card class="deleteDialog">
            <v-card-title class="text-h5"
              >Deseja excluir este item?</v-card-title
            >
            <v-card-actions>
              <v-btn color="primary" text @click="deleteItemConfirm"
                >Confirmar</v-btn
              >
              <v-btn color="primary" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>

    </v-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExportButton from './ExportButton.vue'

export default defineComponent({
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
  },
  components: {
    ExportButton
  },
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
  }),
  methods: {
    editItem (item: any) {
      this.dialog = true
    },
    deleteItem(item: any) {
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
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