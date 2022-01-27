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
      <h1>How to size your electrical system</h1>
      <v-container>
      To determine the size of a solar system for a camper is not very easy in practice, because 
      you can not always estimate your needs. Here I would like to give a few standard suggestions 
      to make this easier and to see the impact of the cost.
      </v-container>

      <template v-for="(profile, index) in profiles">
        <v-card class="mx-auto mb-10" :key="'profile' + index">
          <v-card-title><v-icon class="mr-4 pink--text">mdi-account</v-icon> {{$t('profile.' + profile.name + '.name') }}</v-card-title>
          <v-card-subtitle>{{$t('profile.' + profile.name + '.description') }}</v-card-subtitle>
          <v-divider></v-divider>
          <v-subheader>Suggested Setups</v-subheader>
          <v-list two-line>
            <v-list-item :to="{path:'/map/'+configuration.id}" v-for="(configuration, index) in profile.children" :key="index">
              <v-list-item-avatar>
                <v-icon class="grey yellow--text lighten-1">mdi-white-balance-sunny</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{configuration.name}}</v-list-item-title>
                <v-list-item-subtitle>Estimated Cost: {{cost(configuration)}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{path:'/map/new'}">
              <v-list-item-avatar>
                <v-icon class="grey yellow--text lighten-1">mdi-plus</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Create your own.....</v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </template>

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
import { mapState } from 'vuex'
import { toFixed } from "@/utils/Wire.js"

export default {
  name: 'Overview',
  components: {
  },
  methods: {
    cost ( configuration ) {
      const price = configuration.config.price
      if ( !price ) {
        return " - "
      }
      if (price.low === price.high ) {
        return toFixed(price.low) + " €"
      }
      return toFixed(price.low) + " - " + toFixed(price.high) + " €"
    }
  },
  computed: {
    ...mapState({
      profiles: state => {
        return state.profile.all
      }
    })
  }
}
</script>

<style lang="less">
.app-title {
  .v-app-bar-title__content  {
    background-color: rgba(227,150,35,1);
    padding-left:30px;
    padding-right: 30px;
    min-width:300px;
  }
}
</style>
