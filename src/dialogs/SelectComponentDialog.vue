<template>
    <v-dialog v-model="showFlag" width="900" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.selectComponent.title')" :subtitle="$t('dialog.selectComponent.subtitle')" icon="mdi-swap-horizontal"></DialogHeader>

        <v-card-text style="height: 350px;">
          <v-list dense>
  
                <template v-for="item in components" >
                  <v-list-item :key="item.uuid">
                    <v-img style="cursor:pointer" @click="onItemSelected(type, item.uuid)" max-height="100" class="mt-4 mb-4 mr-6" max-width="100" :src="item.imageSrc"></v-img>
                    <v-list-item-content>
                        <v-list-item-title style="cursor:pointer" @click="onItemSelected(type, item.uuid)"  v-html="item.name"></v-list-item-title>
                        <v-list-item-subtitle>{{$t("dialog.addComponent.shopLabel")}}: 
                          <template v-for="shop in item.shopping"><a :key="shop.link" :href="shop.link" target="_blank">{{shop.shop}}</a>&nbsp;&nbsp;</template>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>{{$t("dialog.addComponent.lastKnownPrice")}}: {{lastKnownPrice(item)}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
          </v-list>
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
  name: "SelectComponentDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      type: null
    }
  },
  components: {
    DialogHeader
  },
  computed: {
    components() {
      if ( this.type === null ) {
        return []  
      }
      return this.$store.state[this.type].components
    }
  },
  methods: {
    async show( type) {
      this.type = type
      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
      })
    },
    lastKnownPrice ( item ) {
      if (item.shopping.length === 0) {
        return "-"
      }
      const low = item.shopping.reduce((prev, curr) => prev.lastKnownPrice < curr.lastKnownPrice ? prev : curr)
      const high = item.shopping.reduce((prev, curr) => prev.lastKnownPrice > curr.lastKnownPrice ? prev : curr)
      if (low.lastKnownPrice === high.lastKnownPrice ) {
        return (low.lastKnownPrice).toFixed(2) + " €"
      }
      return (low.lastKnownPrice).toFixed(2) + " - " + (high.lastKnownPrice).toFixed(2) + " €"
    },
    onItemSelected(uuid) {
      this.showFlag = false
      this.resolve && this.resolve(uuid)
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
