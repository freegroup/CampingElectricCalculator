<template>
    <v-dialog v-model="showFlag" width="700" scrollable>
      <v-card >
        <DialogHeader :title="$t('dialog.wire.title')" :subtitle="$t('dialog.wire.subtitle')" icon="mdi-diameter-outline"></DialogHeader>

        <v-card-text style="height: 350px; overflow:auto;">
          <v-container class="grey lighten-5 mt-3">
            <v-row no-gutters>
              <v-col cols="2"> <v-img :src="sourceImg"></v-img></v-col>
              <v-col cols="8" align-self="end" align="center" class="pt-5 pl-6 pr-6"> 
                <v-divider style="border: 2px solid white" class="red darken-1 ma-1"></v-divider> 
                <v-divider style="border: 2px solid white" class="grey darken-3 ma-1"></v-divider> 
                <v-container class="ma-0 pa-0 mb-5">
                  <v-row cols="12" class="ma-0 pa-0">
                    <v-col class="ma-0 pa-0" cols="12">Wire Length: {{length}} cm</v-col>
                  </v-row>
                </v-container>
                <v-slider class="lengthSlider" v-model="length" step="1" min="50" max="700" dense></v-slider>
              </v-col>
              <v-col cols="2"> <v-img :src="targetImg"></v-img></v-col>
            </v-row>
          </v-container>
          <v-container  class="pt-5 pb-10 mt-0">
            <v-row>
              <v-col></v-col>
              <v-col align="center" align-self="center" class="pa-0">
                <v-container class="pa-0 text-no-wrap">L * 2 * I <span class="index">max</span></v-container>
                <v-divider class="black darken-1 ma-1"></v-divider>
                <v-container class="pa-0 text-no-wrap">&#916; * U * &#947;</v-container>
              </v-col>
              <v-col cols="1" align="center" align-self="center" class="pa-0">=</v-col>
              <v-col align="center" align-self="center" class="pa-0">
                <v-container class="pa-0 text-no-wrap">{{(length/100).toFixed(2)}}m * 2 * {{strom}} A</v-container>
                <v-divider class="black darken-1 ma-1"></v-divider>
                <v-container class="pa-0 text-no-wrap">{{delta*100}}% * {{spannung}}V * {{gamma}}</v-container>
              </v-col>
              <v-col cols="1" align="center" align-self="center" class="pa-0" >=</v-col>
              <v-col align="start" align-self="center" class="text-no-wrap text-h6" >{{querschnitt}} mm&#178;</v-col>
              <v-col></v-col>
            </v-row>
          </v-container>
          <v-alert dense type="info" v-html='$t("dialog.wire.suggest", { d: kabelquerschnitt })'>
            
          </v-alert>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onOkButtonClick">Close</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
import DialogHeader from "@/components/DialogHeader.vue"

export default {
  name: "WireSettingsDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      length: 2,
      delta: 0.02,
      gamma: 57.18,
      component: null
    }
  },
  components: {
    DialogHeader
  },
  computed: {
    strom () {
      console.log(this.component)
      return this.component?.calculateOutputData()?.strom?.toFixed(2)
    },
    spannung () {
      return this.component?.calculateOutputData()?.spannung?.toFixed(2)
    },
    kabelquerschnitt () {
      const q = this.querschnitt * 1.12 // 12% Sicherheit dazurechnen
      let diameters = [1, 2.5, 4, 6, 8, 10, 16, 25, 35, 50, 60, 100, 150, 200, 500, q]
      diameters = diameters.sort( (a, b) => a - b )
      const index = diameters.indexOf(q)
      return diameters[index + 1]
    },
    querschnitt () {
      return (((this.length / 100) * 2 * this.strom) / ( this.delta * this.spannung * this.gamma)).toFixed(2)
    },
    sourceImg () {
      return this.component?.model?.imageSrc
    },
    targetImg () {
      return this.component?.parent?.model?.imageSrc
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
    onOkButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve(this.uuid)
    },
    onCancelButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve(false)
    }
  }
}
</script>
<style lang="less">
  .lengthSlider{
    .v-messages{
      display: none;
    }
  }
  .index {
    top: 7px;
    position: relative;
    font-size:60%;
  }
</style>
