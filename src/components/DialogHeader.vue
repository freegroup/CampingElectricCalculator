<template>
  <v-card-title class="dialog-header ma-0 pa-3">
    <v-row no-gutters align="center">
      <v-col cols="auto" class="pr-3">
        <v-icon>{{icon}}</v-icon>
      </v-col>
      <v-col>
        <div class="text-subtitle-1 font-weight-medium">{{title}}</div>
        <div v-if="subtitle" v-html="subtitle" class="text-caption wrap-text"></div>
      </v-col>
    </v-row>
  </v-card-title>
</template>

<script>
export default {
  name: 'DialogHeader',
  props: ['title', "subtitle", "icon"]
}    
</script>
<style lang="less">
@import '~@/assets/colors.less';

.dialog-header {
  background-color: @dialog-header-bg !important;
  color: @dialog-header-text !important;
  
  // Glassmorphism / Acrylic effect (same as AppToolbar)
  backdrop-filter: @appbar-blur !important;
  -webkit-backdrop-filter: @appbar-blur !important;
  border-bottom: @appbar-border !important;
  
  .v-icon {
    color: @dialog-header-text !important;
  }
  
  .v-list-item {
    color: @dialog-header-text !important;
  }
  
  .v-list-item-title,
  .v-list-item-subtitle {
    color: @dialog-header-text !important;
  }
}

.wrap-text {
   white-space: normal;
   word-break: normal;
}
</style>
