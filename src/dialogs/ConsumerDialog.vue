<template>
    <v-dialog v-model="showFlag" :width="500" >
      <v-card>
        <v-card-title class="orange lighten-2">Energy Consumption</v-card-title>
        <v-card-text style="height: 350px; overflow: auto">
             <v-row class="mt-5">
              <v-col cols="12">
                <v-simple-table flat dense>
                  <template v-slot:default>
                    <tbody>
                      <tr :key="key" v-for="key in Object.keys(consumption)" ><td>{{ $t("data.label."+key)}}</td><td>{{consumption[key]|toFixed}} {{ $t("data.unit."+key)}}</td> </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>

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
    consumption () {
      return this.component ? this.component.calculateConsumptionData() : null
    }
  }
}
</script>
<style>

</style>
