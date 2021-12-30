<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer permanent app right>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
