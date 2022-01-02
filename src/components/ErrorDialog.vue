<template>
    <v-dialog v-model="showFlag" width="500" >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">Errors</v-card-title>

        <v-card-text style="height: 350px;">
          <v-list >
            <template v-for="(item, index) in errors" >
                <v-list-item :key="index">
                    <v-list-item-content>
                        {{ item }}
                    </v-list-item-content>
                </v-list-item>
            </template>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onOkButtonClick">Close</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "ErrorDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      errors: []
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
