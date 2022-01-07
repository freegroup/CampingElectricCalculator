<template>
    <v-dialog v-model="showFlag" width="700" >
      <v-card>
        <DialogHeader :title="$t('dialog.error.title')" :subtitle="$t('dialog.error.subtitle')" icon="mdi-message-alert-outline"></DialogHeader>

        <v-card-text style="height: 350px; overflow: auto">
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
import DialogHeader from "@/components/DialogHeader.vue"

export default {
  name: "ErrorDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      errors: []
    }
  },
  components: {
    DialogHeader
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
