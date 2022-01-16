<template>
    <v-dialog v-model="showFlag" width="800" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.parallel.title')" :subtitle="$t('dialog.parallel.subtitle')" icon="mdi-eye-outline"></DialogHeader>
        <v-card-text style="height: 350px;" >
        <div class="mt-10">
          Connecting solar panels together in parallel is used to boost the total system current 
          and is the reverse of the series connection. For parallel connected solar panels you 
          connect all the positive terminals together (positive to positive) and all of the 
          negative terminals together (negative to negative) until you are left with a single 
          positive and negative connection to attach to your regulator and batteries.
        </div>
        <div class="mt-5">
          When you connect solar panels together in parallel, the total voltage output remains the 
          same as it would for a single panel, but the output current becomes the sum of the output 
          of each panel as shown.
        </div>
        <div class="text-h5 mt-5">Solar Panels in Parallel of Same Characteristics</div>
        <div style="width:100%">
          <v-img width="60%" style="margin:auto" src="@/assets/panels_parallel01.gif"></v-img>
        </div>
        <div class="mt-5">
          In this method ALL the solar panels are of the same type and power rating. Using the same three 
          6 Volt, 3.0 Amp panels as above, the total output of the panels, when connected together in 
          parallel, the output voltage still remains at the same value of 6 volts, but the total 
          amperage has now increased to 9.0 Amperes (3 + 3 + 3), producing 54 watts at full sun.
        </div>
        <div class="mt-5">
          But what if our newly acquired solar panels are non-identical, how will this affect the other 
          panels. We have seen that the currents add together, so no real problem there, just as long 
          as the panel voltages are the same and the output voltage remains constant. Lets look at 
          connecting solar panels in parallel with different nominal voltages and different current 
          ratings.
        </div>
        <div class="text-h5 mt-5">Solar Panels in Parallel with Different Voltages and Currents</div>
        <div style="width:100%">
          <v-img width="60%" style="margin:auto" src="@/assets/panels_parallel02.gif"></v-img>
        </div>

        <div class="mt-5">
          Here the parallel currents add up as before but the voltage adjusts to the lowest value, in this 
          case 3 volts. Solar panels must have the same output voltage to be useful in parallel. If one 
          panel has a higher voltage it will supply the load current to the degree that its output 
          voltage drops to that of the lower voltage panel.
        </div>

        <div class="mt-5">
          We can see that the solar panel rated at 9 volts, 5 amps, will only operate at a maximum voltage 
          of 3 volts as its operation is being influenced by the smaller panel, reducing its efficiency 
          and wasting money on the purchase of this higher power solar panel. Connecting solar panels in 
          parallel with different voltage ratings is not recommended as the solar panel with the lowest 
          rated voltage determines the voltage output of the whole array.
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
