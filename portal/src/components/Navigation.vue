<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        color="primary"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item v-for="item in items" :key="item.title" :prepend-icon="item.icon" :title="item.title" value="myfiles"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    items: [
      { title: 'Início', icon: 'mdi-home', value: '/' },
      { title: 'Pesquisar', icon: 'mdi-magnify' },
      { title: 'Relatórios', icon: 'mdi-file-document-outline'},
      { title: 'Administração', icon: 'mdi-security'},
      { title: 'Sair', icon: 'mdi-logout' },
    ]
  })
})
</script>

<style lang="scss" scoped>

</style>