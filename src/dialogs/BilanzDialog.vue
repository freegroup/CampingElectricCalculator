<template>
    <v-dialog v-model="showFlag" :width="input && output ? 900 : 500" >
      <v-card>
        <v-card-title class="orange lighten-2">Energy Bilanz</v-card-title>

        <v-card-text style="height: 350px; overflow: auto">
          <template v-if="output && input">
            <v-row class="mt-5">
              <v-col align-self="center" align="center" cols="5" class="text-h6">Input</v-col>
              <v-col cols="2"></v-col>
              <v-col align-self="center" align="center" cols="5" class="text-h6">Output</v-col>
            </v-row>
            <v-row class="mt-5">
              <v-col cols="5">
                <v-simple-table flat dense v-if="input">
                  <template v-slot:default>
                    <tbody>
                      <tr :key="key" v-for="key in Object.keys(input)" ><td>{{ $t("data.label."+key)}}</td><td>{{input[key]}} {{ $t("data.unit."+key)}}</td> </tr>
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
                      <tr :key="key" v-for="key in Object.keys(output)" ><td>{{ $t("data.label."+key)}}</td><td>{{output[key]}} {{ $t("data.unit."+key)}}</td> </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </template>
          <template v-if="output===null && input">
            <v-row class="mt-5">
              <v-col align-self="center" align="center" cols="12" class="text-h6">Consumption</v-col>
            </v-row>
            <v-row class="mt-5">
              <v-col cols="12">
                <v-simple-table flat dense>
                  <template v-slot:default>
                    <tbody>
                      <tr :key="key" v-for="key in Object.keys(input)" ><td>{{ $t("data.label."+key)}}</td><td>{{input[key]}} {{ $t("data.unit."+key)}}</td> </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </template>

          <template v-if="input===null && output">
            <v-row class="mt-5">
              <v-col align-self="center" align="center" cols="12" class="text-h6">Providing</v-col>
            </v-row>
            <v-row class="mt-5">
              <v-col cols="12">
                <v-simple-table flat dense>
                  <template v-slot:default>
                    <tbody>
                      <tr :key="key" v-for="key in Object.keys(output)" ><td>{{ $t("data.label."+key)}}</td><td>{{output[key]}} {{ $t("data.unit."+key)}}</td> </tr>
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
export default {
  name: "BilanzDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      component: null
    }
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
  computed: {
    input () {
      return this.component ? this.component.calculateInputData() : null
    },
    output () {
      return this.component ? this.component.calculateOutputData() : null
    }
  }
}
</script>
<style>

</style>
