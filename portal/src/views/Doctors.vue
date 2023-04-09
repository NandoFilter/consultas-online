<template>
  <div>
    <Navigation />
    <div class="main">
      <DataTable :headers="headers" :items="items" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation, DataTable } from '@/components';

export default defineComponent({
  components: {
    Navigation,
    DataTable,
  },
  data: () => ({
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
  })
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