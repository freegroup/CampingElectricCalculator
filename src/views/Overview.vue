<template>
  <v-app>
    <!-- Simple, clean navigation bar -->
    <v-app-bar
      color="white"
      elevate-on-scroll
      light
      dense
    >
      <v-avatar size="32" class="mr-2">
        <img src="@/assets/logo.svg" alt="Logo">
      </v-avatar>
      <v-toolbar-title class="subtitle-1 font-weight-bold grey--text text--darken-2">
        Camping Electric Calculator
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn icon href="https://www.youtube.com/channel/UC1WhvBxYkiGQlAO6YR7uEQQ" target="_blank" color="grey darken-1">
        <v-icon>mdi-youtube</v-icon>
      </v-btn>

      <v-btn icon href="https://github.com/freegroup/CampingElectricCalculator" target="_blank" color="grey darken-1">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-5">
      <!-- Modern, smaller Hero Section -->
      <div class="hero-section position-relative d-flex align-center">
        <v-img
          src="@/assets/banner.png"
          height="100%"
          width="100%"
          class="hero-image"
        >
          <v-container class="fill-height" style="height: 100%;">
            <v-row align="end" justify="end" style="height: 100%;">
              <v-col cols="12" md="7" lg="6" class="text-right pr-md-10 pb-md-10">
                <h1 class="text-h2 font-weight-bold mb-3 white--text text-shadow">
                  Freedom, Powered.
                </h1>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </div>

      <!-- Intro Text Section -->
      <div id="get-started" class="green lighten-5 py-16 text-center" style="width: 100%;">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
              <p class="text-h5 font-weight-regular green--text text--darken-4 mb-6" style="line-height: 1.6;">
                Design the perfect electrical system for your van life adventures. 
                Simple, accurate, and completely free.
              </p>
              <v-btn color="green darken-1" dark large elevation="2" @click="$vuetify.goTo('#setup-options')">
                Start Planning
                <v-icon right>mdi-arrow-down</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-container class="mt-8">
        <!-- Get Started Section -->
        <v-row justify="center" class="mb-8" id="setup-options">
          <v-col cols="12" class="text-center">
            <h2 class="text-h4 font-weight-bold grey--text text--darken-3 mb-2">Choose Your Setup</h2>
            <p class="subtitle-1 grey--text text--darken-1">Select a template or start from scratch</p>
          </v-col>
        </v-row>

        <v-row class="px-2 pb-6">
          <!-- Basic Setup -->
          <v-col cols="12" sm="6" lg="3">
            <v-card class="rounded-xl transition-swing hover-card h-100 d-flex flex-column" outlined :to="{ path: '/map/Standard100wSmallCooler' }">
              <v-card-text class="flex-grow-1 d-flex flex-column align-center justify-center py-8">
                <v-avatar color="teal lighten-5" size="80" class="mb-4">
                  <v-icon x-large color="teal darken-1">mdi-tent</v-icon>
                </v-avatar>
                <h3 class="text-h6 font-weight-medium black--text mb-2">The Weekender</h3>
                <div class="body-2 grey--text text-center">
                  Lightweight setup for phones, lights & a small cooler. Ideal for short trips.
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="justify-center pa-2 grey lighten-5">
                <span class="teal--text text--darken-1 font-weight-bold caption text-uppercase">Start Basic</span>
                <v-icon small color="teal darken-1" class="ml-1">mdi-arrow-right</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Comfort Setup -->
          <v-col cols="12" sm="6" lg="3">
            <v-card class="rounded-xl transition-swing hover-card h-100 d-flex flex-column" outlined :to="{ path: '/map/Aboveaverage200wLightCooler' }">
              <v-card-text class="flex-grow-1 d-flex flex-column align-center justify-center py-8">
                <v-avatar color="blue lighten-5" size="80" class="mb-4">
                  <v-icon x-large color="blue darken-1">mdi-van-utility</v-icon>
                </v-avatar>
                <h3 class="text-h6 font-weight-medium black--text mb-2">The Explorer</h3>
                <div class="body-2 grey--text text-center">
                  Reliable power for laptops, fridge & off-grid capability.
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="justify-center pa-2 grey lighten-5">
                <span class="blue--text text--darken-1 font-weight-bold caption text-uppercase">Start Comfort</span>
                <v-icon small color="blue darken-1" class="ml-1">mdi-arrow-right</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Power Setup -->
          <v-col cols="12" sm="6" lg="3">
            <v-card class="rounded-xl transition-swing hover-card h-100 d-flex flex-column" outlined :to="{ path: '/map/Power540Watt' }">
              <v-card-text class="flex-grow-1 d-flex flex-column align-center justify-center py-8">
                <v-avatar color="orange lighten-5" size="80" class="mb-4">
                  <v-icon x-large color="orange darken-3">mdi-rv-truck</v-icon>
                </v-avatar>
                <h3 class="text-h6 font-weight-medium black--text mb-2">The Nomad</h3>
                <div class="body-2 grey--text text-center">
                  Full amenities: Induction, AC & long-term autonomy.
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="justify-center pa-2 grey lighten-5">
                <span class="orange--text text--darken-3 font-weight-bold caption text-uppercase">Start Pro</span>
                <v-icon small color="orange darken-3" class="ml-1">mdi-arrow-right</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Custom Setup -->
          <v-col cols="12" sm="6" lg="3">
            <v-card class="rounded-xl transition-swing hover-card h-100 d-flex flex-column" outlined :to="{ path: '/map/new' }" color="grey lighten-4" style="border-style: dashed !important;">
              <div class="d-flex flex-column align-center justify-center flex-grow-1 py-10">
                <v-avatar color="white" size="80" class="elevation-1 mb-4">
                  <v-icon x-large color="grey darken-1">mdi-plus</v-icon>
                </v-avatar>
                <h3 class="text-h6 font-weight-medium grey--text text--darken-2">Custom Build</h3>
                <div class="body-2 grey--text text-center px-4 mt-2">
                  Start with a blank canvas
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- How it works -->
        <v-row class="my-12 py-8 white rounded-xl elevation-1">
          <v-col cols="12" class="text-center mb-4">
            <h2 class="text-h5 font-weight-bold grey--text text--darken-3">Three Steps to Freedom</h2>
          </v-col>
          <v-col cols="12" md="4" class="text-center px-6">
            <div class="d-inline-flex align-center justify-center rounded-circle teal lighten-5 mb-4" style="width: 80px; height: 80px;">
              <v-icon size="40" color="teal">mdi-source-branch</v-icon>
            </div>
            <h3 class="subtitle-1 font-weight-bold mb-2">1. Connect</h3>
            <p class="body-2 grey--text text--darken-1">
              Drag & drop components. Simulate your real-world wiring easily.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center px-6">
            <div class="d-inline-flex align-center justify-center rounded-circle blue lighten-5 mb-4" style="width: 80px; height: 80px;">
              <v-icon size="40" color="blue">mdi-calculator-variant</v-icon>
            </div>
            <h3 class="subtitle-1 font-weight-bold mb-2">2. Calculate</h3>
            <p class="body-2 grey--text text--darken-1">
              Instant feedback on capacity, power usage, and potential issues.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center px-6">
            <div class="d-inline-flex align-center justify-center rounded-circle orange lighten-5 mb-4" style="width: 80px; height: 80px;">
              <v-icon size="40" color="orange">mdi-file-export</v-icon>
            </div>
            <h3 class="subtitle-1 font-weight-bold mb-2">3. Build</h3>
            <p class="body-2 grey--text text--darken-1">
              Export your parts list and diagram to start your build with confidence.
            </p>
          </v-col>
        </v-row>

        <!-- Tools Section -->
        <v-row justify="center" class="mt-12 mb-4">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold grey--text text--darken-3 mb-2">Tools & Hilfsmittel</h2>
            <p class="subtitle-1 grey--text text--darken-1">Nützliche Werkzeuge für deinen Camperausbau</p>
          </v-col>
        </v-row>

        <v-row justify="center" class="mb-8 px-2">
          <v-col cols="12">
            <v-card class="rounded-xl transition-swing hover-card elevation-4" :to="{ path: '/wire-calculator' }">
              <v-row no-gutters>
                <v-col cols="12" md="8" class="d-flex align-center">
                  <v-card-text class="py-6 px-8">
                    <div class="d-flex align-center mb-3">
                      <v-avatar color="purple lighten-5" size="60" class="mr-4">
                        <v-icon large color="purple darken-2">mdi-cable-data</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 font-weight-bold black--text mb-1">Kabelquerschnitt Rechner</h3>
                        <div class="body-1 grey--text">Berechnen Sie den optimalen Kabelquerschnitt für Ihre Installation</div>
                      </div>
                    </div>
                    <div class="body-2 grey--text text--darken-1 ml-15 pl-4">
                      Wenn du lieber alles selbst ausrechnen willst und kannst, dann nutze doch einfach den Kabelberechner, 
                      um schnell den richtigen Kabelquerschnitt zu finden. Gib Kabellänge, Stromstärke und Spannung ein und 
                      erhalte sofort den empfohlenen Kabelquerschnitt inklusive Spannungsabfall und Leistungsverlust. 
                      Perfekt für einzelne Verbindungen!
                    </div>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="4" class="purple lighten-5 d-flex align-center justify-center">
                  <div class="text-center pa-6">
                    <v-icon size="80" color="purple darken-2" class="mb-3">mdi-calculator-variant</v-icon>
                    <div class="font-weight-bold purple--text text--darken-2">Jetzt berechnen</div>
                    <v-icon color="purple darken-2" class="mt-2">mdi-arrow-right</v-icon>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- Disclaimer & Footer Info -->
        <v-row class="mt-8 mb-4">
          <v-col cols="12">
            <div class="text-center caption grey--text lighten-1">
              <v-icon x-small color="grey lighten-1" class="mr-1">mdi-alert-circle-outline</v-icon>
              This tool provides estimates. Always consult a professional electrician.
            </div>
          </v-col>
        </v-row>

      </v-container>
    </v-main>

    <v-footer app padless color="white" class="border-top">
      <v-col class="text-center" cols="12">
        <span class="caption grey--text">
          Open Source Project | 
          <a href="https://github.com/freegroup/CampingElectricCalculator/issues" target="_blank" class="text-decoration-none teal--text">
            Report a Bug
          </a>
        </span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Overview',
  computed: {
    ...mapState({
      profiles: state => {
        return state.profile.all
      }
    })
  }
}
</script>

<style scoped>
.hero-section {
  height: 300px; /* Smaller height */
  overflow: hidden;
  background-color: #fff;
}

/* Adjust hero height for mobile */
@media (max-width: 600px) {
  .hero-section {
    height: auto;
    min-height: 250px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}

.hover-card:hover {
  transform: translateY(-5px);
}

.h-100 {
  height: 100%;
}

.border-top {
  border-top: 1px solid #e0e0e0;
}
</style>
