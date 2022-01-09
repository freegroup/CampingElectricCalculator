<template>
    <v-app>
    <v-app-bar app color="#E39623" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Camper Electric Configuration</v-toolbar-title>
      <v-spacer></v-spacer>
          <!--
          <v-btn @click="exportJson" class="ml-1">
            <v-icon>mdi-heart</v-icon>
            <div class="d-none d-lg-block">Export Json</div>
          </v-btn>
          -->
          
          <v-btn @click="center" class="ml-1">
            <v-icon>mdi-image-filter-center-focus</v-icon>
            <div class="d-none d-lg-block">Center Document</div>
          </v-btn>

          <v-btn @click="exportPdf" class="ml-1">
            <v-icon>mdi-text-box-check-outline</v-icon> 
            <div class="d-none d-lg-block">Export Components</div>
          </v-btn>
          <v-btn @click="help" class="ml-1">
            <v-icon>mdi-help-circle-outline</v-icon>
            <div class="d-none d-lg-block">Help</div>
          </v-btn>
  
          <template v-slot:extension>
            <h4>{{label}}</h4>
          </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      left
      src="@/assets/bg.png"
    >
      <v-list nav dark dense >
        <v-list-item :to="{path:'/'}">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-subheader>Example Setups</v-subheader>

        <v-list-item :to="{path:'/map/'+configuration.id}" v-for="(configuration, index) in configurations" :key="index">
          <v-list-item-title>{{configuration.label}}</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-main>
      <ComponentMap ref="mindmap" @configLoaded="onConfigLoaded"/>
    </v-main>
   <JsonDialog ref="jsonDialog"/>
   <HelpDialog ref="helpDialog"/>
  </v-app>
</template>

<script>
import JsonDialog from '@/dialogs/JsonDialog.vue'
import HelpDialog from '@/dialogs/HelpDialog.vue'
import ComponentMap from '@/components/ComponentMap.vue'
import { mapState } from 'vuex'

export default {
  name: 'Map',
  components: {
    ComponentMap,
    JsonDialog,
    HelpDialog
  },
  data: () => ({
    drawer: false,
    label: "",
    group: null
  }),
  methods: {
    onConfigLoaded() {
      this.label = this.$refs.mindmap.getLabel()
    },
    center() {
      this.$refs.mindmap.center()
    },
    exportJson() {
      const json = this.$refs.mindmap.toJson()
      this.$refs.jsonDialog.show(json)
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
      configurations: state => {
        return state.configuration.all
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
