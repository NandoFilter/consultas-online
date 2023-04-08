<template>
  <div>
    <div class="header">
      <v-btn class="header_btn" prepend-icon="mdi-export-variant">Exportar</v-btn>
      <v-btn class="header_btn" prepend-icon="mdi-plus">Adicionar</v-btn>

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
  ></v-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
  data: () => ({
    search: '',
  }),
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
</style>