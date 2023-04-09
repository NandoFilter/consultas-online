<template>
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
          />
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>

</style>