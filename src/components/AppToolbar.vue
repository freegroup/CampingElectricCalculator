<template>
  <v-app-bar app :color="color" :dark="dark" :light="light" height="80">
    <router-link to="/" class="d-flex align-center text-decoration-none">
      <v-avatar :size="64" class="mr-4 my-2">
        <img src="@/assets/logo.svg" alt="Logo">
      </v-avatar>
      
      <v-toolbar-title :class="titleClass + ' toolbar-title-link'">
        {{ title }}
      </v-toolbar-title>
    </router-link>
    
    <v-spacer></v-spacer>

    <!-- Slot for page-specific buttons -->
    <slot name="actions"></slot>

    <!-- Common buttons -->
    <LanguageSelector :icon="iconButtons" :small="!iconButtons" :btn-class="iconButtons ? 'grey darken-1' : 'ml-1'" />

    <v-btn 
      :icon="iconButtons"
      href="https://github.com/freegroup/CampingElectricCalculator" 
      target="_blank" 
      :color="iconButtons ? 'grey darken-1' : ''"
      :class="iconButtons ? '' : 'ml-1'"
      :small="!iconButtons"
    >
      <v-icon>mdi-github</v-icon>
      <div v-if="!iconButtons" class="ml-3 d-none d-lg-block">GitHub</div>
    </v-btn>

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

    <!-- Extension slot for Map view -->
    <template v-if="showExtension" v-slot:extension>
      <slot name="extension"></slot>
    </template>
  </v-app-bar>
</template>

<script>
import LanguageSelector from '@/components/LanguageSelector.vue'

export default {
  name: 'AppToolbar',
  components: {
    LanguageSelector
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

<style scoped>
.toolbar-title-link {
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 2.2rem !important;
  color: black !important;
}

.toolbar-title-link:hover {
  text-decoration: underline;
}
</style>
