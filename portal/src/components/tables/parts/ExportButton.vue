<template>
  <v-btn
    prepend-icon="mdi-export-variant"
    @click="generateFile()"
  >Exportar</v-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { DoctorTable, PatientTable } from '@/models';

type Header = {
  title: string
}

export default defineComponent({
  props: {
    headers: {
      type: Array as PropType<Header[]>,
      required: true
    },
    items: {
      type: Array as PropType<DoctorTable[] | PatientTable[]>,
      required: true
    }
  },
  methods: {
    getTodayDate(): string {
      const today = new Date()

      let day = today.getDate()
      let month = today.getMonth() + 1
      let year = today.getFullYear()

      return `${year}_${month}_${day}`
    },
    generateHeader(): Array<any> {
      let titles: string[] = []

      this.headers.forEach((header: Header) => {
        // Don't get Actions column
        if (this.headers[this.headers.length - 1] != header) {
          titles.push(header.title)
        }
      })

      return titles
    },
    generateFile() {
      let values: Array<object> = []
      let body: Array<Array<string>> = []

      // { name: 'John Doe' } -> [ 'John Doe' ]
      this.items.forEach( (item) => values.push( Object.values(item) ) )

      // [ 'John Doe' ] -> [ ['John Doe'] ]
      values.forEach( (value) => body.push( Object.values(value) ) )

      // Document
      const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" })

      doc.text('Cadastros', 15, 10)

      autoTable(doc, {
        head: [ this.generateHeader() ],
        body
      })

      doc.save(`report_${this.getTodayDate()}.pdf`);
    }
  }
})
</script>