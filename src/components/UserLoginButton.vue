<template>
  <div>
    <!-- Not logged in -->
    <v-btn
      v-if="!user"
      :icon="iconButtons"
      @click="showLoginDialog = true"
      :class="iconButtons ? '' : 'toolbar-btn'"
      :small="!iconButtons"
    >
      <v-icon>mdi-account-circle</v-icon>
      <div v-if="!iconButtons" class="ml-3 d-none d-lg-block">{{ $t('login.login') }}</div>
    </v-btn>

    <!-- Logged in -->
    <v-menu
      v-else
      offset-y
      left
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :icon="iconButtons"
          v-bind="attrs"
          v-on="on"
          :class="iconButtons ? '' : 'toolbar-btn'"
          :small="!iconButtons"
        >
          <v-avatar :size="iconButtons ? 32 : 24">
            <img :src="user.avatar_url" :alt="user.login">
          </v-avatar>
          <div v-if="!iconButtons" class="ml-3 d-none d-lg-block">{{ user.login }}</div>
        </v-btn>
      </template>

      <v-card min-width="280">
        <!-- User Info -->
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="user.avatar_url" :alt="user.login">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ user.name || user.login }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="user.email">
                {{ user.email }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else>
                @{{ user.login }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <!-- Logout -->
        <v-list dense>
          <v-list-item @click="handleLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('login.logout') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <!-- Login Dialog -->
    <LoginDialog
      v-model="showLoginDialog"
      @close="showLoginDialog = false"
    />
  </div>
</template>

<script>
import GitHubAuth from '@/utils/GitHubAuth.js'
import LoginDialog from '@/dialogs/LoginDialog.vue'

export default {
  name: 'UserLoginButton',
  components: {
    LoginDialog
  },
  props: {
    iconButtons: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: null,
      showLoginDialog: false
    }
  },
  async mounted() {
    // Initialize auth on component mount
    await this.initAuth()
    
    // Listen for storage changes (in case of login in another tab)
    window.addEventListener('storage', this.handleStorageChange)
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.handleStorageChange)
  },
  methods: {
    async initAuth() {
      try {
        // Check if user is logged in (also handles OAuth callback)
        const loggedIn = await GitHubAuth.init()
        
        if (loggedIn) {
          // Load user data
          this.user = GitHubAuth.getUser()
          console.log('User logged in:', this.user)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      }
    },

    handleStorageChange(event) {
      // Update user when storage changes
      if (event.key === 'github_user' || event.key === 'github_token') {
        this.user = GitHubAuth.getUser()
      }
    },

    handleLogout() {
      GitHubAuth.logout()
      this.user = null
      this.$emit('logout')
    },

    handleSubmitChange() {
      // TODO: Implement submit change functionality
      console.log('Submit change clicked')
      this.$emit('submit-change')
    },

    handleSuggestComponent() {
      // TODO: Implement suggest component functionality
      console.log('Suggest component clicked')
      this.$emit('suggest-component')
    }
  }
}
</script>

<style scoped>
.v-avatar {
  border: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
