<template>
    <v-dialog v-model="showFlag" width="900" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.balance.title')" :subtitle="$t('dialog.balance.subtitle')" icon="mdi-gauge"></DialogHeader>

        <v-card-text style="height: 350px;" v-if="output && input">
          <template>
            <v-row class="mt-5">
              <v-col align-self="center" align="center" cols="5" class="text-h6">Provider</v-col>
              <v-col cols="2"></v-col>
              <v-col align-self="center" align="center" cols="5" class="text-h6">Consumer</v-col>
            </v-row>
            <v-row class="mt-5">
              <v-col cols="5">
                <v-simple-table flat dense v-if="input">
                  <template v-slot:default>
                    <tbody>
                      <tr :key="key" v-for="key in Object.keys(input)" ><td>{{ $t("data.label."+key)}}</td><td>{{input[key]|toFixed}} {{ $t("data.unit."+key)}}</td> </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col cols="2" align-self="center" align="center">
                <v-icon class="orange--text" x-large>mdi-arrow-right-bold-outline</v-icon>
              </v-col>
              <v-col cols="5">
                <v-simple-table flat dense>
                  <template v-slot:default>
                    <tbody>
                      <tr :key="key" v-for="key in Object.keys(output)" ><td>{{ $t("data.label."+key)}}</td><td>{{output[key]|toFixed}} {{ $t("data.unit."+key)}}</td> </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </template>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onCloseButtonClick">Close</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
import DialogHeader from "@/components/DialogHeader.vue"

export default {
  name: "BalanceDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      component: null
    }
  },
  components: {
    DialogHeader
  },
  methods: {
    async show( component ) {
      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
        this.component = component
      })
    },
    onCloseButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve()
    }
  },
  watch: {
    showFlag: function (val) {
      if ( val === false ) {
        this.component = null
      }
    }
  },
  computed: {
    input () {
      return this.component ? this.component.calculateInputData() : null
    },
    output () {
      return this.component ? this.component.calculateOutputData() : null
    },
    image () {
      return this.component ? this.component.model.imageSrc : null
    }
  }
}
</script>
<style>

</style>
