<template>
    <v-app>
    <v-app-bar app color="#E39623" dense dark>
      <router-link to="/">
        <v-avatar class="mr-4">
          <img src="@/assets/logo.svg">
        </v-avatar>

      </router-link>
        <v-toolbar-title>Camper Electric Configuration 
          <img 
            style="top: 4px;position: relative;padding-left: 10px;" 
            src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ffreegroup%2FCampingElectricCalculator&count_bg=%23E39623&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"
          />
        </v-toolbar-title>
      <v-spacer></v-spacer>
          <v-btn @click="load" class="ml-1" small>
            <v-icon>mdi-open-in-app</v-icon>
            <div class="ml-3 d-none d-lg-block">Open</div>
          </v-btn>
                    
          <v-btn @click="save" class="ml-1" small>
            <v-icon>mdi-content-save-outline</v-icon>
            <div class="ml-3 d-none d-lg-block">Save</div>
          </v-btn>
          
          <v-btn @click="exportPdf" class="ml-1" small>
            <v-icon>mdi-text-box-check-outline</v-icon> 
            <div class="ml-3 d-none d-lg-block">Parts</div>
          </v-btn>

          <v-btn @click="help" class="ml-1" small>
            <v-icon>mdi-help-circle-outline</v-icon>
            <div class="ml-3 d-none d-lg-block">Help</div>
          </v-btn>

          <v-btn href="https://www.paypal.com/paypalme/freegroup/2.50" target="_blank" class="teal accent-4 ml-1" small>
            <v-icon>mdi-coffee-outline</v-icon>
            <div class="ml-3 d-none d-lg-block">Send Me a Coffee</div>
          </v-btn>

          <template v-slot:extension>
            <div style="width:100%">{{name}} <span class="float-right">Estimated Cost: {{(price.low).toFixed(2)}} Euro</span></div>
          </template>
    </v-app-bar>
    <v-main>
      <ComponentMap ref="mindmap" @configLoaded="onConfigLoaded"/>
    </v-main>
   <JsonDialog ref="jsonDialog"/>
   <HelpDialog ref="helpDialog"/>
   <FileOpenDialog ref="fileOpenDialog"/>
  </v-app>
</template>

<script>
import JsonDialog from '@/dialogs/JsonDialog.vue'
import HelpDialog from '@/dialogs/HelpDialog.vue'
import FileOpenDialog from '@/dialogs/FileOpenDialog.vue'
import ComponentMap from '@/components/ComponentMap.vue'
import { mapState } from 'vuex'

export default {
  name: 'Map',
  components: {
    ComponentMap,
    JsonDialog,
    FileOpenDialog,
    HelpDialog
  },
  data: () => ({
    name: "",
    group: null,
    price: { low: 0, high: 0 }
  }),
  mounted() {
    this.price = this.$refs.mindmap.price
    this.$watch("$refs.mindmap.price.low", (newValue, oldValue) => { this.price.low = newValue } )
    this.$watch("$refs.mindmap.price.high", (newValue, oldValue) => { this.price.high = newValue } )
  },
  methods: {
    onConfigLoaded() {
      this.name = this.$refs.mindmap.getName()
    },
    center() {
      this.$refs.mindmap.center()
    },
    exportJson() {
      const json = this.$refs.mindmap.toJson()
      this.$refs.jsonDialog.show(json)
    },
    async load() {
      const profileId = await this.$refs.fileOpenDialog.show()
      if ( profileId ) {
        if ( profileId === "local" ) {
          const options = {
            types: [
              {
                description: 'JSON Files',
                accept: {
                  'application/json': ['.json']
                }
              }
            ]
          }
          const [fileHandle] = await window.showOpenFilePicker(options)
          const file = await fileHandle.getFile()
          const contents = await file.text()
          this.$refs.mindmap.loadConfiguration({ id: "user", name: "User", config: JSON.parse(contents) })
        } else {
          this.$router.push({ path: '/map/' + profileId })
        }
      }
    },
    async save() {
      let json = this.$refs.mindmap.toJson()
      json = JSON.stringify(json, undefined, 2)
      var blob = new Blob([json], { type: "application/json;charset=utf-8" })
      const fileHandle = await window.showSaveFilePicker({
        _preferPolyfill: false,
        suggestedName: 'CamperElectricConfiguration.json',
        types: [
          { accept: { "application/json": [".json"] } }
        ],
        excludeAcceptAllOption: true 
      })

      const writer = await fileHandle.createWritable()
      await writer.write(blob)
      await writer.close()
    },
    help() {
      this.$refs.helpDialog.show()
    },
    exportPdf() {
      const routeData = this.$router.resolve({ path: '/list/' + this.$refs.mindmap.getConfiguration().id })
      window.open(routeData.href, '_blank')
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  computed: {
    ...mapState({
      profiles: state => {
        return state.profile.all
      }
    })
  }
}
</script>

<style>
.v-toolbar__extension{
  background-color: rgba(255,255,255,0.1);
}
</style>
