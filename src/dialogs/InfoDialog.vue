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
                      <th width="200" class="text-left">Name</th>
                      <th class="text-left">Value</th></tr>
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
                    <tr v-if="model.shopping.length>0">
                      <td></td><td class="text-right pt-4"><a :href="model.shopping[0].link" target="_blank">More Details...</a></td>
                    </tr>
                  </tbody>
              </table>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn                      color="primary" text @click="onCloseButtonClick">Close</v-btn>
          <v-btn v-if="valueChanged"  color="primary"      @click="onSaveButtonClick">Save</v-btn>
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
