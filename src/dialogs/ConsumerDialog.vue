<template>
    <v-dialog v-model="showFlag" :width="700" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.consumer.title')" :subtitle="$t('dialog.consumer.subtitle')" icon="mdi-gauge"></DialogHeader>

        <v-card-text style="height: 350px;">
             <v-row class="mt-5">
              <v-col cols="12">
                <v-simple-table flat dense>
                  <template v-slot:default>
                    <tbody>
                      <!-- All values except amperestunden -->
                      <tr :key="key" v-for="key in consumptionKeysWithoutAh">
                        <td>{{ $t("data.label."+key)}}</td>
                        <td>{{consumption[key]|toFixed}} {{ $t("data.unit."+key)}}</td>
                      </tr>
                      <!-- Amperestunden as final result with separator line -->
                      <tr v-if="consumption.amperestunden !== undefined" style="font-weight: bold; border-top: 2px solid #000;">
                        <td style="padding-top: 12px;">{{ $t("data.label.amperestunden")}}</td>
                        <td style="padding-top: 12px;">{{consumption.amperestunden|toFixed}} {{ $t("data.unit.amperestunden")}}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>

        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onCloseButtonClick">{{ $t('dialog.common.close') }}</v-btn>
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
    },
    consumptionKeysWithoutAh () {
      if (!this.consumption) return []
      return Object.keys(this.consumption).filter(key => key !== 'amperestunden')
    }
  }
}
</script>
<style>

</style>
