<template>
  <div class="table_top">

    <div>
      <v-tabs class="tabs" v-model="tab" centered >
        <v-tab @click="onSelect(tab)" value="doctors">
          <v-icon>mdi-stethoscope</v-icon>
          Doutores
        </v-tab>

        <v-tab @click="onSelect(tab)" value="patients">
          <v-icon>mdi-account-group</v-icon>
          Pacientes
        </v-tab>
      </v-tabs>
    </div>


    <div class="header">
      <ExportButton class="header_btn" />

      <v-dialog v-model="dialog" max-width="700px">
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:activator="{ props }">
          <v-btn class="header_btn" prepend-icon="mdi-plus" v-bind="props">
            Adicionar
          </v-btn>
        </template>

        <!-- Adicionar / Editar  -->
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    variant="underlined"
                    v-model="editedItem.name"
                    label="Nome"
                    :rules="rules.name"
                    validate-on="blur"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    variant="underlined"
                    v-model="editedItem.email"
                    label="E-mail"
                    :rules="rules.email"
                    validate-on="blur"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    variant="underlined"
                    type="password"
                    v-model="userPassword"
                    label="Senha"
                    :rules="rules.password"
                    validate-on="blur"
                    required
                    :disabled="doctorId != -1"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    variant="underlined"
                    v-model="editedItem.academy"
                    label="Formação"
                    :rules="rules.academy"
                    validate-on="blur"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    variant="underlined"
                    v-model="editedItem.occupation"
                    label="Ocupação"
                    :rules="rules.occupation"
                    validate-on="blur"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    variant="underlined"
                    v-model="editedItem.hospital"
                    label="Hospital"
                    :rules="rules.hospital"
                    validate-on="blur"
                    required
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn color="primary" variant="text" @click="save">
              Salvar
            </v-btn>
            
            <v-btn color="primary" variant="text" @click="close">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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

  </div>
</template>

<script>
import { ExportButton } from '@/components/tables'

export default {
  components: {
    ExportButton
  },
  data: () => ({
    tab: null,
  }),
  methods: {
    onSelect(tab) {
      this.$emit('select-tab', tab)
    }
  }
}
</script>

<style lang="scss" scoped>
.table_top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 72vw;
}

.header {
  display: flex;
  flex-direction: row;

  &_btn {
    text-transform: unset !important;
    margin: 10px 5px;
  }

  &_txt {
    width: 25vw;
    margin-left: 10px;
  }
}
</style>