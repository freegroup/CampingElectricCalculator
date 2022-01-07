<template>
    <v-dialog v-model="showFlag" :width="700" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.consumer.title')" :subtitle="$t('dialog.consumer.subtitle')" icon="mdi-battery-charging-outline"></DialogHeader>

        <v-card-text style="height: 350px;">
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
  computed: {
    consumption () {
      return this.component ? this.component.calculateConsumptionData() : null
    }
  }
}
</script>
<style>

</style>
