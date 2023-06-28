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
          prepend-icon="mdi-heart-pulse"
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
            @click="actionClick(botItem.action)"
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
import { mapActions } from 'pinia'
import { useSessionStore } from '@/stores'

export default defineComponent({
  data: () => ({
    drawer: true,
    rail: true,
    btnIcon: 'mdi-chevron-right',
    topItems: [
      // { title: 'Histórico', icon: 'mdi-history', value: '/history' },
      { title: 'Médicos', icon: 'mdi-stethoscope', value: '/doctors' },
      { title: 'Pacientes', icon: 'mdi-account-group', value: '/patients' },
      { title: 'Mapa', icon: 'mdi-map-marker', value: '/maps' },
    ],
    botItems: [
      // { title: 'Perfil', icon: 'mdi-account', value: '/profile' },
      // { title: 'Relatórios', icon: 'mdi-file-document-outline', value:'/reports' },
      { title: 'Gráficos', icon: 'mdi-chart-pie', value: '/charts' },
      // { title: 'Administração', icon: 'mdi-security', value: '/admin' },
      { title: 'Sair', icon: 'mdi-logout', value: '/', action: 'logout' },
    ]
  }),
  methods: {
    ...mapActions(useSessionStore, ['clearSession']),
    setRail() {
      this.rail = !this.rail

      this.btnIcon = this.rail ? 'mdi-chevron-right' : 'mdi-chevron-left'
    },
    actionClick(action?: string) {
      if (action && action === 'logout') {
        this.clearSession()
      }
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