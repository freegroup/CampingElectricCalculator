<template>
    <v-dialog v-model="showFlag" width="900" scrollable>
      <v-card>
        <DialogHeader :title="$t('dialog.selectComponent.title')" :subtitle="$t('dialog.selectComponent.subtitle')" icon="mdi-swap-horizontal"></DialogHeader>

        <v-card-text style="height: 350px;">
          <v-list three-line dense>
                <v-list-item :key="item.uuid" @click="onItemSelected(item.uuid)" v-for="item in components" >
                    <v-img  class="mt-4 mb-4 mr-6" max-height="100" max-width="100" :src="item.imageSrc"></v-img>
                    <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                        <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
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
