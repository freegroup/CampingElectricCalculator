<template>
  <v-card-title class="dialog-header ma-0 pa-0">
    <v-container>
      <v-row no-gutters>
        <v-col cols="1" align-self="center" align="center">
          <v-icon class="white--text" large>{{icon}}</v-icon>
        </v-col>
        <v-col cols="11">
          <v-list-item two-line dark>
            <v-list-item-content>
              <v-list-item-title>{{title}}</v-list-item-title>
              <v-list-item-subtitle v-html="subtitle" class="wrap-text"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
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
