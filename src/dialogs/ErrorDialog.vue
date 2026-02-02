<template>
    <v-dialog v-model="showFlag" width="700" scrollable>
      <v-card >
        <DialogHeader :title="$t('dialog.error.title')" :subtitle="$t('dialog.error.subtitle')" icon="mdi-message-alert-outline"></DialogHeader>

        <v-card-text style="height: 350px;">
          <v-list >
            <template v-for="(item, index) in errors" >
                <v-list-item :key="index">
                    <v-list-item-content>
                      <p v-html="item.text"></p>
                    </v-list-item-content>
                </v-list-item>
            </template>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onOkButtonClick">{{ $t('dialog.error.okButton') }}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
import DialogHeader from "@/components/DialogHeader.vue"

export default {
  name: "ErrorDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      errors: [],
      node: null
    }
  },
  components: {
    DialogHeader
  },
  watch: {
    '$i18n.locale'() {
      // Reload error messages when language changes
      if (this.node && this.showFlag) {
        this.errors = this.node.getErrorMessages()
      }
    }
  },
  methods: {
    async show( errors, node ) {
      return new Promise((resolve) => {
        this.resolve = resolve
        this.showFlag = true
        this.errors = errors
        this.node = node // Store node reference to reload messages on language change
      })
    },
    onOkButtonClick() {
      this.showFlag = false
      this.node = null
      this.resolve && this.resolve(this.uuid)
    },
    onCancelButtonClick() {
      this.showFlag = false
      this.node = null
      this.resolve && this.resolve(false)
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
