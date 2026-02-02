<template>
    <v-dialog v-model="showFlag" :width="700" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.timer.title')" :subtitle="$t('dialog.timer.subtitle')" icon="mdi-timer-outline"></DialogHeader>

        <v-card-text style="height: 350px; overflow: auto">
             <v-row class="mt-5">
              <v-col cols="12">
                    <div v-html="$t('dialog.timer.description')"></div>
              </v-col>
            </v-row>
             <v-row class="mt-10">
              <v-col cols="12">
                    <v-slider
                      :hint="$t('dialog.timer.sliderDescription')"
                      v-model="operationHours"
                      :label="$t('dialog.timer.sliderLabel')"
                      min="0.5"
                      max="24"
                      step="0.5"
                      thumb-label="always"
                    ></v-slider>
              </v-col>
            </v-row>

        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onCloseButtonClick">{{ $t('dialog.timer.okButton') }}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
import DialogHeader from "@/components/DialogHeader.vue"

export default {
  name: "TimerDialog",
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
    operationHours: {
      get () {
        return this.component ? this.component.model.operationHours : 1
      },
      set (value) {
        if ( this.component ) {
          this.component.setOperationHours(value)
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/colors.less';

::v-deep .v-card {
  border: @dialog-border-style !important;
  border-radius: @dialog-corner-radius !important;
  box-sizing: border-box !important;
}
</style>
