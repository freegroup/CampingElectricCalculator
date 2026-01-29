<template>
  <v-app>
    <!-- Simple, clean navigation bar -->
    <AppToolbar
      :title="$t('overview.appTitle')"
      color="#E39623"
      dark
      :light="false"
    />

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
                  {{ $t('overview.hero.title') }}
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
                {{ $t('overview.hero.subtitle') }}
              </p>
              <v-btn color="green darken-1" dark large elevation="2" @click="$vuetify.goTo('#setup-options')">
                {{ $t('overview.hero.startButton') }}
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
            <h2 class="text-h4 font-weight-bold grey--text text--darken-3 mb-2">{{ $t('overview.setupSection.title') }}</h2>
            <p class="subtitle-1 grey--text text--darken-1">{{ $t('overview.setupSection.subtitle') }}</p>
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
                <h3 class="text-h6 font-weight-medium black--text mb-2">{{ $t('overview.setupSection.weekender.title') }}</h3>
                <div class="body-2 grey--text text-center">
                  {{ $t('overview.setupSection.weekender.description') }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="justify-center pa-2 grey lighten-5">
                <span class="teal--text text--darken-1 font-weight-bold caption text-uppercase">{{ $t('overview.setupSection.weekender.action') }}</span>
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
                <h3 class="text-h6 font-weight-medium black--text mb-2">{{ $t('overview.setupSection.explorer.title') }}</h3>
                <div class="body-2 grey--text text-center">
                  {{ $t('overview.setupSection.explorer.description') }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="justify-center pa-2 grey lighten-5">
                <span class="blue--text text--darken-1 font-weight-bold caption text-uppercase">{{ $t('overview.setupSection.explorer.action') }}</span>
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
                <h3 class="text-h6 font-weight-medium black--text mb-2">{{ $t('overview.setupSection.nomad.title') }}</h3>
                <div class="body-2 grey--text text-center">
                  {{ $t('overview.setupSection.nomad.description') }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="justify-center pa-2 grey lighten-5">
                <span class="orange--text text--darken-3 font-weight-bold caption text-uppercase">{{ $t('overview.setupSection.nomad.action') }}</span>
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
                <h3 class="text-h6 font-weight-medium grey--text text--darken-2">{{ $t('overview.setupSection.custom.title') }}</h3>
                <div class="body-2 grey--text text-center px-4 mt-2">
                  {{ $t('overview.setupSection.custom.description') }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- How it works -->
        <v-row class="my-12 py-8 white rounded-xl elevation-1">
          <v-col cols="12" class="text-center mb-4">
            <h2 class="text-h5 font-weight-bold grey--text text--darken-3">{{ $t('overview.howItWorks.title') }}</h2>
          </v-col>
          <v-col cols="12" md="4" class="text-center px-6">
            <div class="d-inline-flex align-center justify-center rounded-circle teal lighten-5 mb-4" style="width: 80px; height: 80px;">
              <v-icon size="40" color="teal">mdi-source-branch</v-icon>
            </div>
            <h3 class="subtitle-1 font-weight-bold mb-2">{{ $t('overview.howItWorks.step1.title') }}</h3>
            <p class="body-2 grey--text text--darken-1">
              {{ $t('overview.howItWorks.step1.description') }}
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center px-6">
            <div class="d-inline-flex align-center justify-center rounded-circle blue lighten-5 mb-4" style="width: 80px; height: 80px;">
              <v-icon size="40" color="blue">mdi-calculator-variant</v-icon>
            </div>
            <h3 class="subtitle-1 font-weight-bold mb-2">{{ $t('overview.howItWorks.step2.title') }}</h3>
            <p class="body-2 grey--text text--darken-1">
              {{ $t('overview.howItWorks.step2.description') }}
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center px-6">
            <div class="d-inline-flex align-center justify-center rounded-circle orange lighten-5 mb-4" style="width: 80px; height: 80px;">
              <v-icon size="40" color="orange">mdi-file-export</v-icon>
            </div>
            <h3 class="subtitle-1 font-weight-bold mb-2">{{ $t('overview.howItWorks.step3.title') }}</h3>
            <p class="body-2 grey--text text--darken-1">
              {{ $t('overview.howItWorks.step3.description') }}
            </p>
          </v-col>
        </v-row>

        <!-- Tools Section -->
        <v-row justify="center" class="mt-12 mb-4">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-bold grey--text text--darken-3 mb-2">{{ $t('overview.tools.title') }}</h2>
            <p class="subtitle-1 grey--text text--darken-1">{{ $t('overview.tools.subtitle') }}</p>
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
                        <h3 class="text-h5 font-weight-bold black--text mb-1">{{ $t('overview.tools.wireCalculator.title') }}</h3>
                        <div class="body-1 grey--text">{{ $t('overview.tools.wireCalculator.subtitle') }}</div>
                      </div>
                    </div>
                    <div class="body-2 grey--text text--darken-1 ml-15 pl-4">
                      {{ $t('overview.tools.wireCalculator.description') }}
                    </div>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="4" class="purple lighten-5 d-flex align-center justify-center">
                  <div class="text-center pa-6">
                    <v-icon size="80" color="purple darken-2" class="mb-3">mdi-calculator-variant</v-icon>
                    <div class="font-weight-bold purple--text text--darken-2">{{ $t('overview.tools.wireCalculator.action') }}</div>
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
              {{ $t('overview.footer.disclaimer') }}
            </div>
          </v-col>
        </v-row>

      </v-container>
    </v-main>

    <v-footer app padless color="white" class="border-top">
      <v-col class="text-center" cols="12">
        <span class="caption grey--text">
          {{ $t('overview.footer.openSource') }} | 
          <a href="https://github.com/freegroup/CampingElectricCalculator/issues" target="_blank" class="text-decoration-none teal--text">
            {{ $t('overview.footer.reportBug') }}
          </a>
        </span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import AppToolbar from '@/components/AppToolbar.vue'

export default {
  name: 'Overview',
  components: {
    AppToolbar
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
