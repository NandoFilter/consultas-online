<template>
  <v-dialog v-model="dialog" max-width="375px">
    <v-card class="deleteDialog">
      <v-card-title class="text-h5"> Deseja excluir este item? </v-card-title>
      <v-card-actions>
        <v-btn color="primary" text> Confirmar </v-btn>

        <v-btn color="primary" text> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    dialog: false,
    response: null,
    confirm: false,
  }),
  methods: {
    confirmDialog() {
      this.confirm = true
    }
  }
})
</script>
