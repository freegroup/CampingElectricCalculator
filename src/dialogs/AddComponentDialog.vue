<template>
    <v-dialog v-model="showFlag" width="800" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.addComponent.title')" :subtitle="$t('dialog.addComponent.subtitle')" icon="mdi-plus-network-outline"></DialogHeader>

        <v-card-text style="height: 350px;">
          <v-list two-line>
            <template v-if="types.length > 1">
              <template v-for="type in types">
                <v-list-group :value="false" :key="type">
                    <template v-slot:activator>
                      <v-list-item style="padding-left:0">
                        <v-list-item-title >{{ $t('component.name.' + type)}}</v-list-item-title>
                      </v-list-item>
                    </template>
                    <v-list-item class="amber lighten-5">
                    <v-list-item-subtitle style="white-space: normal">{{ $t('component.description.' + type)}}</v-list-item-subtitle>
                    </v-list-item>
                    <template v-for="(item, index) in components(type)" >
                      <v-list-item :key="item.uuid">
                          <v-img  style="cursor:pointer" @click="onItemSelected(type, item.uuid)" max-height="100" contain class="mt-4 mb-4 mr-6" max-width="100" :src="item.imageSrc"></v-img>
                          <v-list-item-content>
                            <v-list-item-title  style="cursor:pointer" @click="onItemSelected(type, item.uuid)" v-html="item.name"></v-list-item-title>
                            <v-list-item-subtitle>{{$t("dialog.addComponent.shopLabel")}}: 
                              <template v-for="shop in item.shopping"><a :key="shop.link" :href="shop.link" target="_blank">{{shop.shop}}</a>&nbsp;&nbsp;</template>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>{{$t("dialog.addComponent.lastKnownPrice")}}: {{lastKnownPrice(item)}}</v-list-item-subtitle>
                          </v-list-item-content>
                      </v-list-item>
                      <v-divider :key="item.uuid+'fff'" v-if="index !== (components(type).length - 1)"></v-divider>
                    </template>
                </v-list-group>
                <v-divider :key="'div:'+type"></v-divider>
              </template>
            </template>
            <template v-if="types.length === 1">
              <template  v-for="type in types">
                <template v-for="item in components(type)" >
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
              </template>
            </template>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined href="https://github.com/freegroup/CampingElectricCalculator/issues/new/choose" target="_blank">
            <v-icon>mdi-lightbulb-on-outline</v-icon>
            {{$t("dialog.addComponent.suggestComponent")}}
          </v-btn>
          <v-btn color="primary" @click="onCloseButtonClick">{{$t("dialog.addComponent.okButton")}}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
import DialogHeader from "@/components/DialogHeader.vue"
import { toFixed } from "@/utils/Wire.js"

export default {
  name: "AddComponentDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      types: []
    }
  },
  components: {
    DialogHeader
  },
  methods: {
    components(type) {
      return this.$store.state[type].components.filter( element => element.uuid !== "custom" )
    },
    async show( types) {
      this.types = types
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
        return toFixed(low.lastKnownPrice) + " €"
      }
      return toFixed(low.lastKnownPrice) + " - " + toFixed(high.lastKnownPrice) + " €"
    },
    onItemSelected(type, uuid) {
      this.showFlag = false
      this.resolve && this.resolve({ type: type, uuid: uuid })
    },
    onCloseButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve({ type: undefined, uuid: undefined })
    }
  }
}
</script>
<style lang="less">
.v-list-item--active,
.v-list-item--active:hover  {
  background-color: #FFF8E1 !important;
}
.theme--light.v-list-item--active:hover::before {
    opacity: 0;
}
</style>
