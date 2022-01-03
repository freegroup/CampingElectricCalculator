<template>
    <v-dialog v-model="showFlag" width="500" >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Privacy Policy</v-card-title>

        <v-card-text style="height: 350px; overflow:auto">
          <v-list dense>
            <v-list-group :value="false" v-for="type in types" :key="type" >
                <template v-slot:activator>
                  <v-list-item-title>{{type}}</v-list-item-title>
                </template>
                <template v-for="(item, index) in components(type)" >
                  <v-list-item :key="item.uuid" @click="onItemSelected(type, item.uuid)" >
                      <v-img max-height="100" class="mt-4 mb-4 mr-6" max-width="100" :src="item.imageSrc"></v-img>
                      <v-list-item-content>
                          <v-list-item-title v-html="item.name"></v-list-item-title>
                          <v-list-item-subtitle v-html="item.name"></v-list-item-subtitle>
                      </v-list-item-content>
                  </v-list-item>
                  <v-divider  :key="item.uuid+'fff'" v-if="index !== (components(type).length - 1)"></v-divider>
                </template>
            </v-list-group>
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
export default {
  name: "AddComponentDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      types: []
    }
  },
  computed: {
  },
  methods: {
    components(type) {
      return this.$store.state[type].components
    },
    async show( types) {
      this.types = types
      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
      })
    },
    onItemSelected(type, uuid) {
      this.showFlag = false
      this.resolve && this.resolve({ type: type, uuid: uuid })
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
