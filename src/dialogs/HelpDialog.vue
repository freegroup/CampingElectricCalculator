<template>
    <v-dialog v-model="showFlag" width="90%" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.help.title')" :subtitle="$t('dialog.help.subtitle')" icon="mdi-help-circle-outline"></DialogHeader>
        <v-card-text style="height: 90%;">
        <v-row no-gutters >
          <div>
            <h1 class="mt-5">Daily Power Usage</h1>
            <v-card class="pa-4 mt-5" >
              <div class="pt-4">
                The <strong>daily energy usage</strong> is pretty much running the whole show. Indeed, consuming more energy means that a bigger battery bank is needed; 
                consequently, bigger charge sources are needed as well. So the very first thing to do is calculate how much energy we consume each day. To 
                find out, the daily energy usage of each individual load is added:
              </div>

              <h3 style="text-align:center; width:100%" class="pa-10">
                DAILY ENERGY USAGE (Ah) = CURRENT (A) x TIME (h)
              </h3>
              <div>
                <div class="mb-5">
                  <strong>DAILY ENERGY USAGE: </strong> Amount of energy required per day. The unit of measure is Ampere x hour, or Ah. 
                  The shower analogy would be how many gallons of water you need per day to shower.
                </div>
                
                <div class="mb-5">
                  <strong>Current: </strong> Instantaneous flow of energy. The unit is Ampere, or A. The shower analogy would be how 
                  many liter your shower is able to deliver each minute (liter per minute, or lpm)
                </div>
                
                <div>
                  <strong>Time: </strong> How many hours per day the load is used. The shower analogy would be how much time you need 
                  to wait for your loved one to get out of the shower so you can use the toilet. 
                </div>
                
                <div class="mt-5 purple--text">
                  <strong>To make things easy, I created this calculator.  Your job is to find the current draw for each of your loads (check the owner's manual, 
                  spec sheet, product website, etc.), and the calculator will do the rest. </strong>
                </div>
              </div>
            
            </v-card>
          
          </div>

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
  name: "HelpDialog",
  data() {
    return {
      showFlag: false,
      resolve: null
    }
  },
  components: {
    DialogHeader
  },
  methods: {
    async show( ) {
      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
      })
    },
    onCloseButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve()
    }
  }
}
</script>
<style>

</style>
