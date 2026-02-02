<template>
    <v-dialog v-model="showFlag" max-width="900" scrollable>
      <v-card>
        <DialogHeader title="Configuration Data" subtitle="" icon="mdi-code-json"></DialogHeader>

        <v-card-text style="height: 600px">
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
        // If json is already a string, use it directly, otherwise stringify
        this.json = typeof json === 'string' ? json : JSON.stringify(json, undefined, 2)
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
<style scoped lang="less">
@import '~@/assets/colors.less';

::v-deep .v-card {
  border: @dialog-border-style !important;
  border-radius: @dialog-corner-radius !important;
  box-sizing: border-box !important;
}
</style>
