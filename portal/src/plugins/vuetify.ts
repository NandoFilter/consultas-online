// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { md3 } from 'vuetify/blueprints'

// Vuetify
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

const customTheme = {
  dark: false,
  colors: {
    primary: '#16B97A',
  },
}

export default createVuetify({
  components: {
    VDataTable
  },
  directives,
  blueprint: md3,
  ssr: true,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
})
