<template>
    <v-app>
    <v-app-bar app color="#E39623" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Camper Electric Configuration</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="exportJson">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
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
      <ComponentMap ref="mindmap"/>
    </v-main>
   <JsonDialog ref="jsonDialog"/>
  </v-app>
</template>

<script>
import JsonDialog from '@/dialogs/JsonDialog.vue'
import ComponentMap from '@/components/ComponentMap.vue'
import { mapState } from 'vuex'

export default {
  name: 'Map',
  components: {
    ComponentMap,
    JsonDialog
  },
  data: () => ({
    drawer: false,
    group: null
  }),
  methods: {
    exportJson() {
      const json = this.$refs.mindmap.toJson()
      this.$refs.jsonDialog.show(json)
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  computed: mapState({
    configurations: state => {
      return state.configuration.all
    }
  })
}
</script>
