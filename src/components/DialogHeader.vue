<template>
  <v-card-title class="dialog-header ma-0 pa-3">
    <div class="dialog-header-content">
      <v-icon class="dialog-header-icon">{{icon}}</v-icon>
      <div class="dialog-header-text">
        <div class="text-subtitle-1 font-weight-medium">{{title}}</div>
        <div v-if="subtitle" v-html="subtitle" class="text-caption wrap-text"></div>
      </div>
    </div>
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

.dialog-header-content {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
}

.dialog-header-icon {
  align-self: stretch;
  display: flex;
  align-items: center;
  font-size: 50px !important;
}

.dialog-header-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}
</style>
