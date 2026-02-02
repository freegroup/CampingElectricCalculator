<template>
    <v-dialog v-model="showFlag" width="800" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.addComponent.title')" :subtitle="$t('dialog.addComponent.subtitle')" icon="mdi-plus-network-outline"></DialogHeader>

        <div class="dialog-warning-box pa-3 text-body-2" v-html="$t('dialog.addComponent.safetyInfo')"></div>

        <v-card-text style="height: 400px;">
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
                    <template v-for="item in components(type)">
                      <v-list-item :key="item.uuid">
                          <v-img  style="cursor:pointer" @click="onItemSelected(type, item.uuid)" max-height="100" contain class="mt-4 mb-4 mr-6" max-width="100" :src="item.imageSrc"></v-img>
                          <v-list-item-content>
                            <v-list-item-title style="cursor:pointer" @click="onItemSelected(type, item.uuid)" v-html="item.longname"></v-list-item-title>
                            <v-list-item-subtitle>{{$t("dialog.addComponent.lastKnownPrice")}}: {{lastKnownPrice(item)}}</v-list-item-subtitle>
                            <v-list-item-subtitle v-if="item.shopping.length>0">
                              <a :href="item.shopping[0].link" target="_blank">More Details...</a>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                      </v-list-item>
                      <v-divider :key="item.uuid+'fff'"></v-divider>
                    </template>
                    <!-- Suggest component item at the end of each category -->
                    <v-list-item v-if="isLoggedIn" :key="'suggest-'+type" @click="suggestComponent(type)" style="cursor:pointer" class="blue lighten-5">
                      <v-list-item-icon class="mr-3">
                        <v-icon color="primary">mdi-lightbulb-on-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title class="primary--text">{{ $t('component.name.' + type) }} vorschlagen</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-divider :key="'div:'+type"></v-divider>
              </template>
            </template>
            <template v-if="types.length === 1">
              <!-- eslint-disable-next-line vue/valid-v-for -->
              <template  v-for="type in types">
                <!-- eslint-disable-next-line vue/valid-v-for -->
                <template v-for="item in components(type)">
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
          <v-btn color="primary" @click="onCloseButtonClick">{{$t("dialog.addComponent.okButton")}}</v-btn>
        </v-card-actions>

      </v-card>

      <!-- Suggest Component Dialog -->
      <SuggestComponentDialog ref="suggestDialog" />
      
      <!-- JSON Dialog for showing complete file -->
      <JSONDialog ref="jsonDialog" />
    </v-dialog>
</template>

<script>
import DialogHeader from "@/components/DialogHeader.vue"
import SuggestComponentDialog from "@/dialogs/SuggestComponentDialog.vue"
import JSONDialog from "@/dialogs/JSONDialog.vue"
import GitHubAuth from "@/utils/GitHubAuth.js"
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
    DialogHeader,
    SuggestComponentDialog,
    JSONDialog
  },
  computed: {
    isLoggedIn() {
      return GitHubAuth.isLoggedIn()
    }
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
    async suggestComponent(type) {
      // Open the new suggest component dialog
      const result = await this.$refs.suggestDialog.show(type)
      
      if (result) {
        // Show the complete file content in JSONDialog
        await this.$refs.jsonDialog.show(result.completeFileContent)
      }
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
@import '~@/assets/colors.less';

.dialog-warning-box {
  background-color: @color-warning-light;
  border-bottom: @dialog-border;
}

.v-list-item--active,
.v-list-item--active:hover  {
  background-color: #FFF8E1 !important;
}
.theme--light.v-list-item--active:hover::before {
    opacity: 0;
}
</style>
