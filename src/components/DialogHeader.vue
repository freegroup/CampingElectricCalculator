<template>
  <v-card-title class="orange white--text">
    <v-row>
      <v-col cols="2" align-self="center" align="left" >
            <v-btn class="orange" fab ><v-icon class="white--text" >{{icon}}</v-icon></v-btn>
      </v-col>
      <v-col cols="10">
        <v-row class="pt-2">
          <v-col cols="12" class="pa-0">{{title}}</v-col>
          <v-col cols="12" class="pa-0 text-subtitle-1">{{subtitle}}</v-col></v-row> 
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
<style>

</style>
