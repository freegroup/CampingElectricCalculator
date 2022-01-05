<template>
    <v-dialog v-model="showFlag" width="700" >
      <v-card>
        <v-card-title class="orange lighten-2">{{model.name}}</v-card-title>
        <v-card-text style="height: 350px; overflow: scroll">
        <v-row no-gutters justify="center">
          <v-col cols="12"  class="mb-5">
           <div class="text-subtitle-1">{{model.description}}</div>
          </v-col>
          <v-col cols="6">
            <v-img class="pt-10" :src="model.imageSrc" contain></v-img>
          </v-col>
          <v-col cols="12"  class="mt-5 pl-10">
            <v-row>
              <v-icon class="mr-2" >mdi-clipboard-outline</v-icon> {{ $t("view.shopping.factsheet")}}
            </v-row>
            <v-row>
              <v-simple-table flat dense>
                <template v-slot:default>
                  <thead>
                    <tr><th width="200" class="text-left">Name</th>    <th class="text-left">Value</th></tr>
                  </thead>
                  <tbody>
                    <tr :key="key" v-for="key in Object.keys(model.data)" ><td>{{ $t("data.label."+key)}}</td><td>{{model.data[key]}} {{ $t("data.unit."+key)}}</td> </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-row>
            <template v-if="model.shopping.length > 0">
              <v-row class="mt-10">
                <v-icon class="mr-2" >mdi-cart-outline</v-icon> {{ $t("view.shopping.shops")}}
              </v-row>
              <v-row  class="mb-5">
                <v-simple-table flat dense>
                  <template v-slot:default>
                    <tbody>
                      <tr :key="index+'shop'" v-for="(shop, index) in model.shopping" ><td>{{ shop.shop}}</td><td><v-btn target="_blank" class="ma-1 darken-1" color="red" plain :href="shop.link"> {{shop.label}} <v-icon small >mdi-open-in-new</v-icon></v-btn></td> </tr>
                    </tbody>
                  </template>
                </v-simple-table>
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
export default {
  name: "InfoDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      model: { shopping: [], data: {} }
    }
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
