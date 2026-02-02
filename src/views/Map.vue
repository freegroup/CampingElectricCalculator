<template>
    <v-app>
    <AppToolbar
      :title="$t('toolbar.title')"
      color="#d9dff2"
      :dark="false"
      :light="true"
      show-extension
    >
      <template v-slot:actions>
        <v-btn @click="load" class="ml-1 toolbar-btn" small>
          <v-icon>mdi-open-in-app</v-icon>
          <div class="ml-3 d-none d-lg-block">{{ $t('toolbar.open') }}</div>
        </v-btn>
                  
        <v-btn @click="save" class="ml-1 toolbar-btn" small>
          <v-icon>mdi-content-save-outline</v-icon>
          <div class="ml-3 d-none d-lg-block">{{ $t('toolbar.save') }}</div>
        </v-btn>
        
        <v-btn @click="exportPdf" class="ml-1 toolbar-btn" small>
          <v-icon>mdi-text-box-check-outline</v-icon> 
          <div class="ml-3 d-none d-lg-block">{{ $t('toolbar.parts') }}</div>
        </v-btn>
      </template>

      <template v-slot:extension>
        <div style="width:100%">{{name}} <span class="float-right">{{ $t('toolbar.estimatedCost') }}: {{(price.low).toFixed(2)}} Euro</span></div>
      </template>
    </AppToolbar>
    <v-main>
      <ComponentMap ref="mindmap" @configLoaded="onConfigLoaded"/>
    </v-main>
   <JsonDialog ref="jsonDialog"/>
   <FileOpenDialog ref="fileOpenDialog"/>
  </v-app>
</template>

<script>
import JsonDialog from '@/dialogs/JSONDialog.vue'
import FileOpenDialog from '@/dialogs/FileOpenDialog.vue'
import ComponentMap from '@/components/ComponentMap.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { mapState } from 'vuex'

export default {
  name: 'Map',
  components: {
    ComponentMap,
    JsonDialog,
    FileOpenDialog,
    AppToolbar
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
.v-main {
  padding-top: 0 !important;
}
</style>
