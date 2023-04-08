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
      { title: 'Nome', sortable: false, align: 'start', key: 'name' },
      { title: 'Área de Atuação', align: 'start', key: 'occupation' },
      { title: 'Hospital', align: 'start', key: 'hospital' },
      { title: 'Formação', align: 'start', key: 'academy' },
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
  margin-left: 75px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>