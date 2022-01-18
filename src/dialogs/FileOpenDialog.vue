<template>
    <v-dialog v-model="showFlag" width="800" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.fileOpen.title')" :subtitle="$t('dialog.fileOpen.subtitle')" icon="mdi-open-in-app"></DialogHeader>
        <v-card-text style="height: 350px;" >
          <v-treeview hoverable open-on-click rounded :items="profiles" activatable @update:active="loadProfile">
          </v-treeview>
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
import { mapState } from 'vuex'

export default {
  name: "FileOpenDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      active: null
    }
  },
  components: {
    DialogHeader
  },
  computed: {
    ...mapState({
      profiles: function( state ) { // don't use the arrow function. "this" is broken in this case
        const p = JSON.parse(JSON.stringify(state.profile.all)) // deep copy
        p.forEach(element => {
          element.name = this.$t('profile.' + element.name + '.name')
        })
        p.push({ id: "local", name: "Load from local Disc.." })
        return p
      }
    })
  },
  methods: {
    loadProfile ( node ) {
      this.showFlag = false
      this.resolve && this.resolve( node[0] )
    },
    async show() {
      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
      })
    },
    onCloseButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve( null )
    }
  }
}
</script>
<style>

</style>
