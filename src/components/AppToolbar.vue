<template>
  <v-app-bar app :color="color" :dark="dark" :light="light" height="80">
    <div class="toolbar-row-1">
      <router-link to="/" class="d-flex align-center text-decoration-none logo-link">
        <v-avatar :size="64" class="mr-4">
          <img src="@/assets/logo.svg" alt="Logo">
        </v-avatar>

        <v-toolbar-title :class="titleClass + ' toolbar-title-link'">
          {{ title }}
        </v-toolbar-title>
      </router-link>
    </div>

    <v-spacer class="d-none d-sm-flex"></v-spacer>

    <div class="toolbar-buttons">
      <!-- Slot for page-specific buttons -->
      <slot name="actions"></slot>

      <!-- Common buttons -->
      <LanguageSelector :icon="iconButtons" :small="!iconButtons" :btn-class="iconButtons ? 'grey darken-1' : 'ml-1 toolbar-btn'" />

      <v-btn
        :icon="iconButtons"
        href="https://www.paypal.com/paypalme/freegroup/2.50"
        target="_blank"
        :color="iconButtons ? 'grey darken-1' : 'teal accent-4'"
        :class="iconButtons ? '' : 'ml-1'"
        :small="!iconButtons"
      >
        <v-icon>mdi-coffee-outline</v-icon>
        <div v-if="!iconButtons" class="ml-3 d-none d-lg-block">{{ $t('toolbar.coffee') }}</div>
      </v-btn>

      <UserLoginButton :icon-buttons="iconButtons" class="ml-1" />
    </div>

    <!-- Extension slot for Map view -->
    <template v-if="showExtension" v-slot:extension>
      <slot name="extension"></slot>
    </template>
  </v-app-bar>
</template>

<script>
import LanguageSelector from '@/components/LanguageSelector.vue'
import UserLoginButton from '@/components/UserLoginButton.vue'

export default {
  name: 'AppToolbar',
  components: {
    LanguageSelector,
    UserLoginButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'white'
    },
    dark: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: true
    },
    showExtension: {
      type: Boolean,
      default: false
    },
    iconButtons: {
      type: Boolean,
      default: false
    },
    titleClass: {
      type: String,
      default: 'text-h6 font-weight-light'
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/colors.less';

/* Glassmorphism effect - unscoped to override Vuetify's color prop */
.v-app-bar.v-toolbar {
  background: @appbar-bg !important;
  backdrop-filter: @appbar-blur;
  -webkit-backdrop-filter: @appbar-blur;
  border-bottom: @appbar-border;
  box-shadow: @appbar-shadow !important;
}

/* Mobile: Stack toolbar vertically with buttons in second row */
@media (max-width: 600px) {
  .v-app-bar.v-toolbar {
    height: 68px !important;
  }

  .v-toolbar__content {
    height: 68px !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    justify-content: space-between !important;
    padding: 4px 8px !important;
  }

  /* First row: Logo and title take full width */
  .toolbar-row-1 {
    width: 100%;
    display: flex;
    align-items: center;
    height: 32px;
    flex-shrink: 0;

    .logo-link {
      height: 32px !important;
    }

    .v-avatar {
      height: 24px !important;
      width: 24px !important;
      margin-right: 8px !important;
      min-width: 24px !important;
    }
  }

  /* Second row: All buttons in a horizontal flex container */
  .toolbar-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    height: 32px;
    flex-shrink: 0;
    padding-bottom: 8px;
    margin-bottom: 4px;

    /* Hide scrollbar but keep functionality */
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    /* Make all buttons icon-only on mobile */
    .v-btn .d-none.d-lg-block {
      display: none !important;
    }

    .v-btn {
      min-width: 40px !important;
      height: 28px !important;
      padding: 0 8px !important;
      flex-shrink: 0;
    }
  }
}

/* Desktop: Keep original layout */
@media (min-width: 601px) {
  .toolbar-row-1 {
    display: contents;
  }

  .toolbar-buttons {
    display: contents;
  }
}

/* Extension divider */
.v-toolbar__extension {
  border-top: @appbar-extension-border;
  background: @appbar-bg !important;
  backdrop-filter: @appbar-blur;
  -webkit-backdrop-filter: @appbar-blur;
}

/* Mobile: Extension styling */
@media (max-width: 600px) {
  .v-toolbar__extension {
    min-height: 32px !important;
    padding: 4px 8px !important;
    font-size: 0.85rem;
  }
}

/* Toolbar buttons - using LESS variables */
.toolbar-btn.v-btn {
  background-color: @toolbar-button-bg !important;
  color: @toolbar-button-text !important;
  border-color: @toolbar-button-bg !important;
  
  .v-icon {
    color: @toolbar-button-text !important;
  }
  
  .v-btn__content {
    color: @toolbar-button-text !important;
    
    > div {
      color: @toolbar-button-text !important;
    }
  }
  
  &:hover {
    background-color: @toolbar-button-hover !important;
  }
  
  &:before {
    opacity: 0 !important;
  }
}
</style>

<style lang="less" scoped>
@import '~@/assets/colors.less';

.logo-link {
  height: 100%;
  
  .v-avatar {
    height: 70% !important;
    width: auto !important;
    
    img {
      height: 100%;
      width: auto;
      object-fit: contain;
    }
  }
}

.toolbar-title-link {
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 2.2rem !important;
  color: @color-toolbar-title !important;
  line-height: 1.3 !important;
  padding-top: 4px;

  &:hover {
    text-decoration: underline;
  }
}

// Mobile responsiveness - reduce font size by 50%
@media (max-width: 600px) {
  .toolbar-title-link {
    font-size: 0.95rem !important;
    line-height: 1.1 !important;
    padding-top: 0 !important;
  }
}
</style>
