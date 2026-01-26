<template>
    <v-dialog v-model="showFlag" width="800" scrollable>
      <v-card>
        <DialogHeader :title="model.name" :subtitle="$t('dialog.info.subtitle')" icon="mdi-eye-outline"></DialogHeader>
        <v-card-text style="height: 350px;">
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="2" align="center" align-self="center">
              <v-img class="pt-10" max-height="150" :src="model.imageSrc" contain></v-img>
            </v-col>
            <v-col cols="8"  class="mt-5 pl-10">
              <table>
                  <thead>
                    <tr>
                      <th width="200" class="text-left">{{ $t('dialog.info.nameHeader') }}</th>
                      <th class="text-left">{{ $t('dialog.info.valueHeader') }}</th></tr>
                  </thead>
                  <tbody>
                    <tr :key="key" v-for="key in Object.keys(model.data)" >
                      <td class="text-no-wrap">{{ $t("data.label."+key)}}</td>
                      <template v-if="modelEditable">
                        <td v-if="isNumber(key)"><v-text-field :disabled="!attributeEditable(key)" :hide-details="true" dense type="number" v-model.number="model.data[key]" :suffix='$t("data.unit."+key)'></v-text-field></td> 
                        <td v-else-if="isStringValue(key)"><v-select :disabled="!attributeEditable(key)" :hide-details="true" dense :items="items(key)" v-model="model.data[key]"></v-select></td> 
                        <td v-else-if="isArrayValue(key)"><v-select :disabled="!attributeEditable(key)" :multiple="true" :hide-details="true" :items="items(key)" dense v-model="model.data[key]" ></v-select></td> 
                      </template>
                      <template v-else>
                        <td>{{model.data[key]}} {{$t("data.unit."+key)}}</td> 
                      </template>
                    </tr>
                  </tbody>
              </table>
            </v-col>
          </v-row>

          <!-- Shopping Links Expansion Panel - Always visible -->
          <v-row class="mt-4">
            <v-col cols="12">
              <v-expansion-panels flat>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <span>
                      <v-icon small class="mr-2">mdi-cart-outline</v-icon>
                      <template v-if="hasShoppingLinks">
                        {{ $t('dialog.info.shoppingLinks') }} ({{ model.shopping.length }})
                      </template>
                      <template v-else>
                        {{ $t('dialog.info.shoppingLinks') }}
                      </template>
                    </span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content style="max-height: 150px; overflow-y: auto;">
                    <v-list dense>
                      <!-- Existing Shopping Links -->
                      <template v-if="hasShoppingLinks">
                        <v-list-item v-for="(shop, index) in model.shopping" :key="index" :href="shop.link" target="_blank" class="px-0">
                          <v-list-item-icon class="mr-3">
                            <v-icon small>mdi-open-in-new</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title>{{ shop.shop }}</v-list-item-title>
                            <v-list-item-subtitle class="text-caption">
                              {{ shop.label }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle class="text-caption font-weight-bold">
                              {{ $t('dialog.info.lastKnownPrice') }}: {{ shop.lastKnownPrice.toFixed(2) }} €
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        
                        <v-divider class="my-2"></v-divider>
                      </template>
                      
                      <!-- Suggest Shop Link - Always visible -->
                      <v-list-item @click="suggestShop" class="px-0">
                        <v-list-item-icon class="mr-3">
                          <v-icon small color="primary">mdi-email-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="primary--text">
                            {{ $t('dialog.info.suggestShop') }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn                      color="primary" text @click="onCloseButtonClick">{{ $t('dialog.info.okButton') }}</v-btn>
          <v-btn v-if="valueChanged"  color="primary"      @click="onSaveButtonClick">{{ $t('dialog.common.apply') }}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
import DialogHeader from "@/components/DialogHeader.vue"
import enums from "@/enums.js"

export default {
  name: "InfoDialog",
  data() {
    return {
      showFlag: false,
      valueChanged: false,
      resolve: null,
      component: null,
      model: { shopping: [], data: {} }
    }
  },
  components: {
    DialogHeader
  },
  watch: {
    "model.data": {
      handler(val) {
        if (this.showFlag) {
          this.valueChanged = true
          const model = this.$store.getters[this.component.type + "/getByUuid"]("custom")
          const data = this.model.data
          this.model = model
          this.model.data = data
        }
      },
      deep: true
    }
  },
  computed: {
    modelEditable () {
      // it is only editable if we have a "custom" item in the collection of the type. This is the template.
      return !!this.$store.getters[this.component.type + "/getByUuid"]("custom")
    },
    hasShoppingLinks () {
      return this.model.shopping && this.model.shopping.length > 0
    }
  },
  methods: {
    async show( component ) {
      return new Promise((resolve) => {
        this.component = component
        this.model = JSON.parse(JSON.stringify(component.model)) // deep copy
 
        this.resolve = resolve
        this.valueChanged = false
        // just to ensure that the "showFlag" happen in the next cycle and the "watch"
        // can determine if the value-change happens by user interaction or by the intial dialog.show
        //
        this.$nextTick( () => { this.showFlag = true } )
      })
    },
    isNumber (key) {
      return !isNaN(this.model.data[key])
    },
    isArrayValue (key) {
      if ( this.model.type in enums) {
        if ( key in enums[this.model.type]) {
          if ( enums[this.model.type][key].type === "array") {
            return true
          }
          return false
        }
      }
      return true
    }, 
    isStringValue (key) {
      if ( this.model.type in enums) {
        if ( key in enums[this.model.type]) {
          if ( enums[this.model.type][key].type === "string") {
            return true
          }
          return false
        }
      }
      return true
    },
    attributeEditable (key) {
      if ( this.model.type in enums) {
        if ( key in enums[this.model.type]) {
          if ( "editable" in enums[this.model.type][key]) {
            return enums[this.model.type][key].editable
          }
        }
      }
      return true
    },
    items (key) {
      return enums[this.model.type][key].values
    },
    suggestShop() {
      // Prepare component data for email
      const componentName = this.model.name
      const componentType = this.$t('component.name.' + this.model.type)
      
      // Build technical data string
      let technicalData = ''
      Object.keys(this.model.data).forEach(key => {
        const label = this.$t("data.label." + key)
        const value = this.model.data[key]
        const unit = this.$t("data.unit." + key)
        technicalData += `${label}: ${value} ${unit}\n`
      })
      
      // Email subject and body
      const subject = encodeURIComponent(`Shop-Vorschlag für ${componentName}`)
      const body = encodeURIComponent(
        `Hallo,\n\n` +
        `ich möchte einen Shop-Link für folgende Komponente vorschlagen:\n\n` +
        `Komponente: ${componentName}\n` +
        `Typ: ${componentType}\n\n` +
        `Technische Daten:\n${technicalData}\n` +
        `Shop-Link:\n` +
        `[Bitte hier den Link einfügen]\n\n` +
        `Shop-Name:\n` +
        `[z.B. Amazon, eBay, etc.]\n\n` +
        `Preis:\n` +
        `[Aktueller Preis in Euro]\n\n` +
        `Vielen Dank!`
      )
      
      // Open mailto link
      window.location.href = `mailto:camping@freegroup.de?subject=${subject}&body=${body}`
    },
    onCloseButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve()
      this.component = null
      this.model = { shopping: [], data: {} }
    },
    onSaveButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve(this.model.data)
      this.component = null
      this.model = { shopping: [], data: {} }
    }
  }
}
</script>
<style>

</style>
