<template>
  <v-app>
    <v-system-bar
  height="30"
>fffffff</v-system-bar>
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
            <v-spacer></v-spacer>

      <v-btn icon href="https://www.youtube.com/channel/UC1WhvBxYkiGQlAO6YR7uEQQ" target="_blank">
        <v-icon x-large>mdi-youtube</v-icon>
      </v-btn>

      <v-btn icon href="https://github.com/freegroup/CampingElectricCalculator" target="_blank">
        <v-icon x-large>mdi-github</v-icon>
      </v-btn>

    </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container>
      <h1>How to wire a Campervan</h1>
      <h3>How to size your electrical system</h3>
      <v-container>
      Wiring and installing the electrical system is probably one of the most complicated and daunting 
      tasks in a van conversion. I've spent a lot of time reading blog posts, forum comments, and watching 
      YouTube videos to see if there are any really good how-to guides out there. In fact, there are a lot.
      </v-container>
      <v-container>
      But all of them explains how to figure it all out by hand or by exel sheets. <b>But why calculate everything again and again by hand 
      if you can use software for it</b>. I'm not really a fan of excel lists though. That's why I built a tool 
      with which you can simply model your electrical system in a MindMap and in the background, it calculates 
      whether the components harmonize and fit. 
      </v-container>

      <v-container>
            <v-layout row wrap>
              <v-flex>
                <v-card class="mx-auto" max-width="350">
                  <v-img src="@/assets/mindmap.png" height="200px" ></v-img>

                  <v-card-title>Get the correct sizing</v-card-title>
                  <v-card-subtitle>Connect your components in a mind map and calculate if the components are well dimensioned.</v-card-subtitle>

                  <v-card-actions>
                    <v-btn color="orange lighten-2" :to="{path:'/map'}" text>Start</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex>
                <v-card class="mx-auto" max-width="350">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" ></v-img>

                  <v-card-title>Top western road trips</v-card-title>
                  <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>

                  <v-card-actions>
                    <v-btn color="orange lighten-2" text>Explore</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
      </v-container>
                
      <h3>Disclaimer</h3>
      <v-container>
      But as it is with software and the dear people....they 
      can be faulty. So see the tool here as a support and not as the absolute truth. Better calculate 
      again.
      </v-container>
     <v-container style="height: 1000px;"></v-container>
    </v-container>
  </v-main>

  <v-footer app>
    Bugreports are always welcome and the errors will of course be fixed. 
    <v-btn icon href="https://github.com/freegroup/CampingElectricCalculator/issues" target="_blank">
      <v-icon>mdi-github</v-icon>
    </v-btn>
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
