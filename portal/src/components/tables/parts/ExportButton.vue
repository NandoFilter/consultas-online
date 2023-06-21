<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="lowercase-text"
          prepend-icon="mdi-export-variant"
          v-bind="props"
        >Exportar</v-btn>
      </template>
      <v-list class="list">
        <v-list-item
          v-for="option in options"
          :key="option.title"
          :prepend-icon="option.icon"
          @click="generateFile(option.title)"
        >
          {{ option.title }}
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { ExportToCsv } from 'export-to-csv'

type Header = {
  title: string,
  key: string
}

export default defineComponent({
  props: {
    headers: {
      type: Array as PropType<Header[]>,
      required: true
    },
    items: {
      type: Array as PropType<any[]>,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({
    options: [
      { title: 'PDF', icon: 'mdi-file-pdf-box' },
      { title: 'CSV', icon: 'mdi-file-delimited' }
    ]
  }),
  methods: {
    generateFile(value: string) {
      value === 'PDF' ? this.generatePDF() : this.generateCSV()
    },
    generatePDF() {
      let values: Array<object> = []
      let body: Array<Array<string>> = []

      // { name: 'John Doe' } -> [ 'John Doe' ]
      this.items.forEach( (item) => values.push( Object.values(item) ) )

      // [ 'John Doe' ] -> [ ['John Doe'] ]
      values.forEach( (value) => body.push( Object.values(value) ) )

      // Document
      const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" })

      doc.text(this.title, 15, 10)

      autoTable(doc, {
        head: [ this.generateHeader() ],
        body
      })

      doc.save(`report_pdf_${this.getTodayDate()}.pdf`);
    },
    generateCSV() {
      const options = { 
        filename: `report_csv_${this.getTodayDate()}`,
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: this.title,
        useTextFile: false,
        useBom: true,
        headers: this.generateHeader()
      };

      const csvExporter = new ExportToCsv(options)

      csvExporter.generateCsv(this.items)
    },
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
        if (header.key != 'actions') {
          titles.push(header.title)
        }
      })

      return titles
    },
  }
})
</script>

<style lang="scss" scoped>
.lowercase-text {
  text-transform: unset !important;
}

.list {
  border-radius: 15px !important;
}
</style>