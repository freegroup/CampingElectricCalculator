<template>
    <v-dialog v-model="showFlag" width="500" scrollable>
      <v-card>
        <DialogHeader title="Configuration Data" subtitle="" icon="mdi-code-json"></DialogHeader>

        <v-card-text style="height: 350px">
          <pre>
{{json}}
          </pre>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onCopyButtonClick">Copy</v-btn>
          <v-btn color="primary" text @click="onCloseButtonClick">Close</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
import DialogHeader from "@/components/DialogHeader.vue"

export default {
  name: "JSONDialog",
  components: {
    DialogHeader
  },
  data() {
    return {
      showFlag: false,
      resolve: null,
      json: {}
    }
  },
  methods: {
    async show( json ) {
      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
        this.json = JSON.stringify(json, undefined, 2)
      })
    },
    onCloseButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve()
    },
    onCopyButtonClick() {
      navigator.clipboard.writeText(this.json)
      this.showFlag = false
      this.resolve && this.resolve()
    }
    
  }
}
</script>
<style>

</style>
