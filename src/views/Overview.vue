<template>
  <v-app>
  <v-app-bar
      app
      color="#E39623"
      dark
      shrink-on-scroll
      prominent
      src="@/assets/banner.png"
      height="300"
      fade-img-on-scroll >
    <!-- -->
      <template v-slot:img="{ props }" v-if="false">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(227,150,35,.8), rgba(255,255,255,.1)"
        ></v-img>
      </template>
      <v-app-bar-title class="text-no-wrap app-title" >Camping Electric Calculator</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container>
     <v-container style="height: 1000px;"></v-container>
    </v-container>
  </v-main>

  <v-footer app>
  </v-footer>
</v-app>
</template>
<script>

export default {
  name: 'Overview',
  components: {
  }
}
</script>

<style lang="less">
.app-title {
  .v-app-bar-title__content  {
    background-color: rgba(227,150,35,1);
    padding-left:30px;
    padding-right: 30px;
  }
}
</style>
