<template>
    <v-app>
    <v-app-bar app color="#E39623" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Wire Diameter Calculation</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      bottom
      absolute
      temporary
      src="@/assets/bg.png"
    >
      <v-list nav dark dense >
        <v-list-item :to="{path:'/'}">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-subheader>Example Setups</v-subheader>

      </v-list>
    </v-navigation-drawer>
    
    <v-main>

    </v-main>

  </v-app>
</template>
<script>

</script>
