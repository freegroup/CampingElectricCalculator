<template>
  <v-card-title class="orange white--text ma-0 pa-0">
    <v-container >
    <v-row no-gutters>
      <v-col cols="1" align-self="center" align="center">
        <v-btn class="orange" fab small><v-icon class="white--text" >{{icon}}</v-icon></v-btn>
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
<style>
.wrap-text {
   white-space: normal;
   word-break: normal
}

</style>
