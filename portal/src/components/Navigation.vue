<template>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      :width="200"
      color="primary"
      class="drawer"
      permanent
    >
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="Início"
          to="/home"
        />
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="topItem in topItems"
          :key="topItem.title"
          :prepend-icon="topItem.icon"
          :title="topItem.title"
          :to="topItem.value"
        />
      </v-list>

      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-item
            v-for="botItem in botItems"
            :key="botItem.title"
            :prepend-icon="botItem.icon"
            :title="botItem.title"
            :to="botItem.value"
          />
        </v-list>
      </template>

      <v-btn
        class="resize_btn"
        variant="flat"
        :ripple="false"
        :icon="btnIcon"
        @click.stop="setRail()"
      ></v-btn>
    </v-navigation-drawer>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    drawer: true,
    rail: true,
    btnIcon: 'mdi-chevron-right',
    topItems: [
      { title: 'Nova Consulta', icon: 'mdi-heart-pulse', value: '/newQuery' },
      { title: 'Médicos', icon: 'mdi-stethoscope', value: '/doctors' },
      { title: 'Pacientes', icon: 'mdi-account-group', value: '/patients' },
    ],
    botItems: [
      { title: 'Perfil', icon: 'mdi-account', value: '/profile' },
      { title: 'Administração', icon: 'mdi-security', value: '/admin' },
      { title: 'Sair', icon: 'mdi-logout', value: '/' },
    ]
  }),
  methods: {
    setRail() {
      this.rail = !this.rail

      this.btnIcon = this.rail ? 'mdi-chevron-right' : 'mdi-chevron-left'
    }
  }
})
</script>

<style lang="scss" scoped>
.drawer {
  position: relative;
}
.resize_btn {
  position: absolute;
  right: 0;
  bottom: 50%;
}
</style>