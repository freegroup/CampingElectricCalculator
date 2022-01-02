<template>
    <v-dialog v-model="showFlag" width="500" >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Privacy Policy</v-card-title>

        <v-card-text style="height: 350px;">
          <v-list three-line>
            <template v-for="item in components" >
                <v-list-item :key="item.uuid" @click="onItemSelected(item.uuid)">
                    <v-img max-height="100" max-width="100" :src="item.imageSrc"></v-img>
                    <v-list-item-content>
                        <v-list-item-title v-html="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.name"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onOkButtonClick"> I accept</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      showFlag: false,
      resolve: null,
      type: null,
      uuid: null
    }
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
      this.uuid = uuid
      this.showFlag = false
      this.resolve && this.resolve(this.uuid)
    },
    onOkButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve(this.uuid)
    },
    onCancelButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve(false)
    }
  }
}
</script>
<style>

</style>
