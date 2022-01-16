<template>
    <v-dialog v-model="showFlag" width="800" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.serial.title')" :subtitle="$t('dialog.serial.subtitle')" icon="mdi-eye-outline"></DialogHeader>
        <v-card-text style="height: 350px;" >
        <div class="mt-10">
          The electrical connection of solar panels in series increases the 
          total system ouput voltage. Series connected solar panels are generally used when you 
          have a grid connected inverter or charge controller that requires 24 volts or more. To 
          series wire the panels together you connect the positive terminal to the negative terminal 
          of each panel until you are left with a single positive and negative connection.
        </div>
        <div class="mt-5">
          Solar panels in series add up or sum the voltages produced by each individual panel, 
          giving the total output voltage of the array as shown.
        </div>
        <div class="text-h5 mt-5">Solar Panels in Series of Same Characteristics</div>
        <div style="width:100%">
          <v-img width="60%" style="margin:auto" src="@/assets/panels_serial01.gif"></v-img>
        </div>
        <div class="mt-5">
          In this method ALL the solar panels are of the same type and power rating. The total voltage 
          output becomes the sum of the voltage output of each panel. Using the same three 6 volt, 
          3.0 amp panels from above, we can see that when these pv panels are connected together in 
          series, the array will produce an ouput voltage of 18 Volts (6 + 6 + 6) at 3.0 Amperes, 
          giving 54 Watts (volts x amps) at full sun.
        </div>
        <div class="mt-5">
          Now lets look at connecting solar panels in series with different nominal voltages but with 
          identical current ratings.
        </div>
        <div class="text-h5 mt-5">Solar Panels in Series of Different Voltages</div>
        <div style="width:100%">
          <v-img width="60%" style="margin:auto" src="@/assets/panels_serial02.gif"></v-img>
        </div>

        <div class="mt-5">
          In this method all the solar panels are of different types and power rating but have a common 
          current rating. When they are connected together in series, the array produces 21 volts at 3.0 
          amps, or 63 watts. Again the output amperage will remain the same as before at 3.0 amps but the 
          voltage output jumps to 21 volts (5 + 7 + 9) .
        </div>
        <div class="mt-5">
          Finally, lets look at connecting solar panels in series with completely different nominal 
          voltages and different current ratings.
        </div>
        <div class="text-h5 mt-5">Solar Panels in Series of Different Currents</div>
        <div style="width:100%">
          <v-img width="60%" style="margin:auto" src="@/assets/panels_serial03.gif"></v-img>
        </div>
        <div class="mt-5">
          In this method all the solar panels are of different types and power rating. The individual 
          panel voltages will add together as before, but this time the amperage will be limited to the 
          value of the lowest panel in the series string, in this case 1 Ampere. Then the array will 
          produce 19 Volts (3 + 7 + 9) at 1.0 Ampere only, or only 19 watts out of a possible 69 watts 
          available reducing the arrays efficiency.
        </div>
        <div class="mt-5">
          We can see that the solar panel rated at 9 volts, 5 amps, will only use one fifth or 20% of 
          its maximum current potential reducing its efficiency and wasting money on the purchase of 
          this solar panel. Connecting solar panels in series with different current ratings should 
          only be used provisionally, as the solar panel with the lowest rated current determines the 
          current output of the whole array.
        </div>
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
  name: "SerialDialog",
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
    async show() {
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
