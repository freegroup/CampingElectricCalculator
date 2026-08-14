<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        :icon="icon"
        :small="small"
        :class="btnClass"
        v-bind="attrs" 
        v-on="on"
      >
        <v-icon :small="small">mdi-translate</v-icon>
        <div v-if="!icon" class="ml-3 d-none d-lg-block">{{ currentLanguage.toUpperCase() }}</div>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item @click="changeLanguage('de')">
        <v-list-item-title>🇩🇪 Deutsch</v-list-item-title>
      </v-list-item>
      <v-list-item @click="changeLanguage('en')">
        <v-list-item-title>🇬🇧 English</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import errorMessages from '@/utils/ErrorMessages.js'

export default {
  name: 'LanguageSelector',
  props: {
    icon: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    btnClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentLanguage() {
      return this.$i18n.locale
    }
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('userLanguage', lang)
      // Update ErrorMessages for native JS components
      errorMessages.setLocale(lang)
      // The map is built from plain HTML and does not re-render like a Vue template,
      // so it has to be told explicitly. Announced on the root instance because the
      // map is not an ancestor or descendant of this component.
      this.$root.$emit('localeChanged', lang)
    }
  }
}
</script>
