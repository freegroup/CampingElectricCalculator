<template>
  <v-dialog v-model="show" max-width="500px" persistent>
    <v-card>
      <DialogHeader 
        :title="$t('login.title')"
        icon="mdi-github"
        @close="$emit('close')"
      />
      
      <v-card-text class="pt-6 pb-4">
        <p class="text-body-1 mb-0 black--text" style="line-height: 1.7;">
          {{ $t('login.explanation') }}
        </p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="$emit('close')"
        >
          {{ $t('dialog.common.cancel') }}
        </v-btn>
        <v-btn
          color="primary"
          depressed
          @click="handleLogin"
        >
          <v-icon left>mdi-github</v-icon>
          {{ $t('login.loginWithGitHub') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DialogHeader from '@/components/DialogHeader.vue'
import GitHubAuth from '@/utils/GitHubAuth.js'

export default {
  name: 'LoginDialog',
  components: {
    DialogHeader
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    handleLogin() {
      // Start OAuth flow
      GitHubAuth.login()
    }
  }
}
</script>

<style scoped>
</style>
