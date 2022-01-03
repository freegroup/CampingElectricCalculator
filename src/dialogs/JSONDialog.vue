<template>
    <v-dialog v-model="showFlag" width="500" >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Configuration</v-card-title>

        <v-card-text style="height: 350px;">
          {{json}}
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
  name: "JSONDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      json: {}
    }
  },
  methods: {
    async show( errors ) {
      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
        this.errors = errors
      })
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
