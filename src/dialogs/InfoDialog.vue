<template>
    <v-dialog v-model="showFlag" width="800" scrollable>
      <v-card>
        <DialogHeader :title="model.name" :subtitle="$t('dialog.info.subtitle')" icon="mdi-eye-outline"></DialogHeader>
        <v-card-text style="height: 350px;">
          <v-row>
            <v-col cols="4" align="center" align-self="center">
              <v-img class="pt-10" :src="model.imageSrc" contain></v-img>
            </v-col>
            <v-col cols="8"  class="mt-5 pl-10">
              <v-simple-table flat dense style="font-size:50%">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th width="200" class="text-left">Name</th>
                      <th class="text-left">Value</th></tr>
                  </thead>
                  <tbody>
                    <tr :key="key" v-for="key in Object.keys(model.data)" >
                      <td class="text-no-wrap">{{ $t("data.label."+key)}}</td>
                      <td>{{model.data[key] | toFixed}} {{ $t("data.unit."+key)}}</td> </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <template v-if="model.shopping.length > 0">
                <v-row class="mt-0">
                  <v-icon class="mr-2" >mdi-cart-outline</v-icon> {{ $t("view.shopping.shops")}}
                </v-row>
                <v-row  :key="index+'shop'" v-for="(shop, index) in model.shopping" >
                  <v-col cols="2">
                    {{ shop.shop}}
                  </v-col>
                  <v-col align="start">
                    <a target="_blank" class="darken-1" :href="shop.link"> {{shop.label}} <v-icon class="ml-4" small >mdi-open-in-new</v-icon></a>
                  </v-col>
                </v-row>
              </template>
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
  name: "InfoDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      model: { shopping: [], data: {} }
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
        this.model = component.model
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
