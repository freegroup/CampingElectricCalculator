<template>
    <v-dialog v-model="showFlag" width="700" scrollable>
      <v-card>
        <DialogHeader :title="title" :subtitle="subtitle" :icon="icon"></DialogHeader>

        <v-card-text class="pt-5">
          <v-list dense>
            <template v-for="(message, index) in messages">
              <v-list-item :key="index">
                <v-list-item-icon class="mr-3">
                  <v-icon small :color="color">{{bulletIcon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <div class="text-body-2 wrap-text">{{message}}</div>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>

          <div v-if="hint" class="text-caption grey--text text--darken-1 mt-3 pl-2">
            {{hint}}
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onCloseButtonClick">{{ $t('dialog.common.close') }}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
</template>

<script>
import DialogHeader from "@/components/DialogHeader.vue"

// Icon and color per severity level of the notification
const SEVERITY = {
  info: { icon: "mdi-information-outline", bulletIcon: "mdi-circle-medium", color: "primary" },
  warning: { icon: "mdi-alert-outline", bulletIcon: "mdi-alert-circle-outline", color: "warning" },
  error: { icon: "mdi-alert-circle-outline", bulletIcon: "mdi-alert-circle-outline", color: "error" }
}

export default {
  name: "NotificationDialog",
  data() {
    return {
      showFlag: false,
      resolve: null,
      title: "",
      subtitle: "",
      hint: "",
      messages: [],
      severity: "info"
    }
  },
  components: {
    DialogHeader
  },
  computed: {
    icon() {
      return (SEVERITY[this.severity] || SEVERITY.info).icon
    },
    bulletIcon() {
      return (SEVERITY[this.severity] || SEVERITY.info).bulletIcon
    },
    color() {
      return (SEVERITY[this.severity] || SEVERITY.info).color
    }
  },
  methods: {
    /**
     * Show a generic, purely informational dialog.
     *
     * @param {String} title      headline of the dialog
     * @param {String} subtitle   short explanation below the headline
     * @param {Array}  messages   list of plain text messages to show as bullet points
     * @param {String} hint       optional footnote in small print
     * @param {String} severity   "info" | "warning" | "error"
     */
    async show({ title, subtitle, messages, hint, severity }) {
      return new Promise((resolve) => {
        this.resolve = resolve
        this.title = title || ""
        this.subtitle = subtitle || ""
        this.messages = messages || []
        this.hint = hint || ""
        this.severity = severity || "info"
        this.showFlag = true
      })
    },
    onCloseButtonClick() {
      this.showFlag = false
      this.resolve && this.resolve()
    }
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/colors.less';

.wrap-text {
  white-space: normal;
  word-break: normal;
}

::v-deep .v-card {
  border: @dialog-border-style !important;
  border-radius: @dialog-corner-radius !important;
  box-sizing: border-box !important;
}
</style>
