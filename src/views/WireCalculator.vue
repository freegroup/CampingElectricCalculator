<template>
  <v-app>
    <!-- Navigation bar -->
    <AppToolbar
      :title="$t('wireCalculator.title')"
      color="#d7ddef"
      :dark="false"
      :light="true"
    />

    <v-main class="gradient-background">
      <!-- Hero Section -->
      <div class="hero-section-wire-glass">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <div class="d-flex align-center justify-center">
      
                <v-btn
                  icon
                  color="white"
                  class="ml-3"
                  @click="showInfo = !showInfo"
                >
                <h3 class="white--text text-shadow">
                  {{ $t('widierten werte aus der AppToolbar in die css vars verlegen müssen mehr eigentlichreCalculator.info.title') }}
                </h3>
                  <v-icon>{{ showInfo ? 'mdi-chevron-up' : 'mdi-information' }}</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          
          <!-- Expandable Info Section -->
          <WireCalculatorInfo 
            :show="showInfo"
            :length="length"
            :current="current"
            :voltage="voltage"
            :calculatedCrossSection="calculatedCrossSection"
            :recommendedCrossSection="recommendedCrossSection"
          />
        </v-container>
      </div>

      <v-container class="mt-n12">
        <!-- Main Calculator Card -->
        <v-row justify="center">
          <v-col cols="12" lg="11" xl="10">
            <v-card class="rounded-xl elevation-8 overflow-hidden">
              <v-card-text class="pa-6 pa-md-10">
                
                <!-- Visual Flow: Source -> Cable -> Consumer -->
                <div class="flow-container-flex">
                  
                  <!-- LEFT: Power Source -->
                  <div class="flex-item-fixed">
                    <v-card 
                      class="source-card glass-card pa-6 rounded-xl elevation-8" 
                    >
                      <v-icon size="80" class="mb-4 icon-glow-green">mdi-battery-charging</v-icon>
                      <h3 class="text-h6 font-weight-bold mb-4 green--text text--darken-3">
                        Spannungsquelle
                      </h3>
                      
                      <!-- Voltage Selection -->
                      <v-btn-toggle
                        v-model="voltage"
                        mandatory
                        rounded
                        color="green darken-2"
                        class="mb-4"
                        @change="calculateFromInputs"
                      >
                        <v-btn :value="12" small>12V</v-btn>
                        <v-btn :value="24" small>24V</v-btn>
                      </v-btn-toggle>
                      
                      <div class="text-h4 font-weight-bold green--text text--darken-2 mb-2">
                        {{ voltage }} V
                      </div>
                      <div class="caption grey--text">Systemspannung</div>
                    </v-card>
                  </div>

                  <!-- CENTER: Cable -->
                  <div class="flex-item-expand cable-section">
                    <!-- Editable Values Above Cable -->
                    <div class="cable-info-top mb-3">
                      <div class="d-flex justify-space-around align-center mb-3">
                        <div class="text-center">
                          <div class="caption grey--text mb-1">Länge</div>
                          <div class="text-h6 font-weight-bold">{{ length }}m</div>
                        </div>
                        <div class="text-center">
                          <div class="caption grey--text mb-1">Minimaler Querschnitt</div>
                          <div class="text-h5 font-weight-bold" :class="getCableTextColor()">
                            {{ calculatedCrossSection.toFixed(2) }} mm²
                          </div>
                        </div>
                      </div>
                      
                      <!-- Length Slider -->
                      <v-slider
                        v-model="length"
                        min="0.5"
                        max="15"
                        step="0.5"
                        thumb-label
                        :color="getCableSliderColor()"
                        hide-details
                        dense
                        @input="calculateFromInputs"
                      ></v-slider>
                    </div>

                    <!-- Visual Cable with Arrow Overlay -->
                    <div class="cable-container">
                      <div class="cable-visual" :style="getCableStyle()">
                        <div class="cable-wire" :style="getCableWireStyle(true)"></div>
                        <div class="cable-wire" :style="getCableWireStyle(false)"></div>
                      </div>
                      <div class="cable-arrow">
                        <v-icon size="32" color="grey darken-1">mdi-arrow-right-thick</v-icon>
                      </div>
                    </div>

                    <!-- Calculated Values Below Cable -->
                    <div class="cable-info-bottom mt-3">
                      <v-select
                        v-model="selectedCrossSection"
                        :items="availableCrossSections"
                        outlined
                        dense
                        suffix="mm²"
                        hide-details
                        label="Empfohlener Querschnitt"
                        @change="calculateFromCrossSection"
                      ></v-select>
                      
                      <div class="mt-3 pa-3 rounded" :style="getInfoBoxStyle()">
                        <v-row dense no-gutters class="mb-2">
                          <v-col cols="7" class="text-left">
                            <div class="caption grey--text">Spannungsabfall</div>
                          </v-col>
                          <v-col cols="5" class="text-left">
                            <div class="font-weight-bold">{{ result.voltageDrop }} V</div>
                          </v-col>
                        </v-row>
                        <v-row dense no-gutters class="mb-2">
                          <v-col cols="7" class="text-left">
                            <div class="caption grey--text">Verlust</div>
                          </v-col>
                          <v-col cols="5" class="text-left">
                            <div class="font-weight-bold">{{ result.voltageDropPercent }}%</div>
                          </v-col>
                        </v-row>
                        <v-row dense no-gutters class="mb-2">
                          <v-col cols="7" class="text-left">
                            <div class="caption grey--text">Leistungsverlust</div>
                          </v-col>
                          <v-col cols="5" class="text-left">
                            <div class="font-weight-bold">{{ result.powerLoss }} W</div>
                          </v-col>
                        </v-row>
                      </div>
                    </div>
                  </div>

                  <!-- RIGHT: Consumer -->
                  <div class="flex-item-fixed">
                    <v-card 
                      class="consumer-card glass-card pa-6 rounded-xl elevation-8" 
                    >
                      <v-icon size="80" class="mb-4 icon-glow-orange">mdi-power-plug</v-icon>
                      <h3 class="text-h6 font-weight-bold mb-4 orange--text text--darken-3">
                        Verbraucher
                      </h3>
                      
                      <!-- Input Mode Toggle -->
                      <v-btn-toggle
                        v-model="inputMode"
                        mandatory
                        rounded
                        color="orange darken-2"
                        class="mb-4"
                        @change="calculateFromInputs"
                      >
                        <v-btn value="current" small>Ampere</v-btn>
                        <v-btn value="power" small>Watt</v-btn>
                      </v-btn-toggle>

                      <!-- Current Input -->
                      <div v-if="inputMode === 'current'" class="mb-4">
                        <div class="caption grey--text mb-2">Stromstärke</div>
                        <v-text-field
                          v-model.number="current"
                          type="number"
                          outlined
                          dense
                          suffix="A"
                          hide-details
                          @input="calculateFromInputs"
                        ></v-text-field>
                        <v-slider
                          v-model="current"
                          min="1"
                          max="100"
                          step="1"
                          thumb-label
                          color="orange darken-2"
                          hide-details
                          class="mt-2"
                          @input="calculateFromInputs"
                        ></v-slider>
                      </div>

                      <!-- Power Input -->
                      <div v-if="inputMode === 'power'" class="mb-4">
                        <div class="caption grey--text mb-2">Leistung</div>
                        <v-text-field
                          v-model.number="power"
                          type="number"
                          outlined
                          dense
                          suffix="W"
                          hide-details
                          @input="calculateFromPower"
                        ></v-text-field>
                        <v-slider
                          v-model="power"
                          min="10"
                          max="1200"
                          step="10"
                          thumb-label
                          color="orange darken-2"
                          hide-details
                          class="mt-2"
                          @input="calculateFromPower"
                        ></v-slider>
                      </div>

                      <!-- Display Values -->
                      <v-divider class="my-4"></v-divider>
                      <div class="text-h5 font-weight-bold orange--text text--darken-2 mb-1">
                        {{ current }} A / {{ power }} W
                      </div>
                      <div class="caption grey--text">Leistungsaufnahme</div>
                    </v-card>
                  </div>
                </div>

                <!-- Recommendation Banner -->
                <v-row class="mt-6">
                  <v-col cols="12">
                    <v-alert
                      :type="getRecommendationType()"
                      prominent
                      border="left"
                      :icon="getRecommendationIcon()"
                    >
                      <v-row align="center">
                        <v-col cols="12" md="8">
                          <div class="font-weight-bold text-h6 mb-2">
                            {{ getRecommendationTitle() }}
                          </div>
                          <div class="body-2">
                            {{ getRecommendationText() }}
                          </div>
                        </v-col>
                        <v-col cols="12" md="4" class="text-center">
                          <div class="caption mb-1">Empfohlener Querschnitt</div>
                          <div class="text-h4 font-weight-bold">
                            {{ recommendedCrossSection }} mm²
                          </div>
                          <v-btn
                            v-if="selectedCrossSection !== recommendedCrossSection"
                            small
                            :color="getRecommendationType()"
                            class="mt-2"
                            @click="selectedCrossSection = recommendedCrossSection; calculateFromCrossSection()"
                          >
                            <v-icon small left>mdi-check</v-icon>
                            Übernehmen
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-col>
                </v-row>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Quick Examples -->
        <v-row justify="center" class="mt-8 mb-8">
          <v-col cols="12" lg="11" xl="10">
            <h3 class="text-h6 font-weight-bold mb-4 text-center grey--text text--darken-3">
              Schnellauswahl: Typische Anwendungen
            </h3>
            <v-row justify="center">
              <v-col cols="6" sm="4" md="3" lg="2" v-for="(example, index) in examples" :key="index">
                <v-card 
                  outlined 
                  class="pa-3 text-center hover-card cursor-pointer"
                  @click="applyExample(example)"
                  hover
                >
                  <v-icon :color="example.color" size="36" class="mb-2">{{ example.icon }}</v-icon>
                  <div class="font-weight-bold caption mb-1">{{ example.name }}</div>
                  <div class="caption grey--text" style="font-size: 0.7rem;">
                    {{ example.length }}m, {{ example.current }}A
                  </div>
                  <v-chip x-small :color="example.color" dark class="mt-2">
                    {{ getExampleCrossSection(example) }} mm²
                  </v-chip>
                </v-card>
              </v-col>
            </v-row>
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
import { kabelquerschnitt, querschnitt, toFixed, gamma } from '@/utils/Wire.js'
import wireExamples from '@/data/wireExamples.json'
import WireCalculatorInfo from '@/components/WireCalculatorInfo.vue'
import AppToolbar from '@/components/AppToolbar.vue'

export default {
  name: 'WireCalculator',
  components: {
    WireCalculatorInfo,
    AppToolbar
  },
  data() {
    return {
      showInfo: false,
      voltage: 12,
      length: 5,
      current: 10,
      power: 120,
      inputMode: 'current', // 'current' or 'power'
      selectedCrossSection: 2.5,
      recommendedCrossSection: 2.5,
      calculatedCrossSection: 2.5, // Non-rounded value from querschnitt()
      availableCrossSections: [1, 2.5, 4, 6, 8, 10, 16, 25, 35, 50, 60, 100, 150, 200, 500],
      result: {
        voltageDrop: 0,
        voltageDropPercent: 0,
        powerLoss: 0,
        resistance: 0
      },
      examples: wireExamples
    }
  },
  mounted() {
    this.calculateFromInputs()
  },
  methods: {
    calculateFromInputs() {
      // Calculate cross sections
      // length is in meters in UI, but formula expects cm, so multiply by 100
      const lengthInCm = this.length * 100
      
      // Get non-rounded calculated value
      this.calculatedCrossSection = querschnitt(lengthInCm, this.current, this.voltage)
      
      // Get rounded recommended value
      this.recommendedCrossSection = kabelquerschnitt(lengthInCm, this.current, this.voltage)
      
      // Always update to recommended cross section for optimal (green) result
      this.selectedCrossSection = this.recommendedCrossSection
      
      // Update power if in current mode
      if (this.inputMode === 'current') {
        this.power = Math.round(this.current * this.voltage)
      }
      
      this.calculateLosses()
    },
    
    calculateFromPower() {
      // Calculate current from power
      this.current = Math.round((this.power / this.voltage) * 10) / 10
      this.calculateFromInputs()
    },
    
    calculateFromCrossSection() {
      // Recalculate losses with new cross section
      this.calculateLosses()
    },
    
    calculateLosses() {
      if (this.length > 0 && this.current > 0 && this.voltage > 0 && this.selectedCrossSection > 0) {
        // Use meters for loss calculation
        const resistance = (this.length * 2) / (gamma * this.selectedCrossSection)
        const voltageDrop = this.current * resistance
        const voltageDropPercent = (voltageDrop / this.voltage) * 100
        const powerLoss = this.current * voltageDrop
        
        this.result = {
          resistance: toFixed(resistance),
          voltageDrop: toFixed(voltageDrop),
          voltageDropPercent: toFixed(voltageDropPercent),
          powerLoss: toFixed(powerLoss)
        }
      }
    },
    
    applyExample(example) {
      this.length = example.length
      this.current = example.current
      this.voltage = example.voltage
      this.inputMode = 'current'
      this.calculateFromInputs()
      this.selectedCrossSection = this.recommendedCrossSection
      this.calculateFromCrossSection()
    },
    
    getCableColor() {
      const drop = parseFloat(this.result.voltageDropPercent)
      if (drop <= 3) return 'green lighten-5'
      if (drop <= 5) return 'yellow lighten-4'
      if (drop <= 8) return 'orange lighten-4'
      return 'red lighten-4'
    },
    
    getCableIconColor() {
      const drop = parseFloat(this.result.voltageDropPercent)
      if (drop <= 3) return 'green darken-2'
      if (drop <= 5) return 'yellow darken-3'
      if (drop <= 8) return 'orange darken-2'
      return 'red darken-2'
    },
    
    getCableTextColor() {
      const drop = parseFloat(this.result.voltageDropPercent)
      if (drop <= 3) return 'green--text text--darken-3'
      if (drop <= 5) return 'yellow--text text--darken-4'
      if (drop <= 8) return 'orange--text text--darken-3'
      return 'red--text text--darken-3'
    },
    
    getCableSliderColor() {
      const drop = parseFloat(this.result.voltageDropPercent)
      if (drop <= 3) return 'green darken-2'
      if (drop <= 5) return 'yellow darken-3'
      if (drop <= 8) return 'orange darken-2'
      return 'red darken-2'
    },
    
    getDropTextColor() {
      const drop = parseFloat(this.result.voltageDropPercent)
      if (drop <= 3) return 'green--text text--darken-2'
      if (drop <= 5) return 'orange--text text--darken-2'
      return 'red--text text--darken-2'
    },
    
    getRecommendationType() {
      const drop = parseFloat(this.result.voltageDropPercent)
      if (this.selectedCrossSection >= this.recommendedCrossSection && drop <= 3) return 'success'
      if (drop <= 5) return 'info'
      if (drop <= 8) return 'warning'
      return 'error'
    },
    
    getRecommendationIcon() {
      const drop = parseFloat(this.result.voltageDropPercent)
      if (this.selectedCrossSection >= this.recommendedCrossSection && drop <= 3) return 'mdi-check-circle'
      if (drop <= 5) return 'mdi-information'
      if (drop <= 8) return 'mdi-alert'
      return 'mdi-alert-circle'
    },
    
    getRecommendationTitle() {
      const drop = parseFloat(this.result.voltageDropPercent)
      if (this.selectedCrossSection >= this.recommendedCrossSection && drop <= 3) {
        return 'Optimale Konfiguration!'
      }
      if (drop <= 5) {
        return 'Gute Konfiguration'
      }
      if (drop <= 8) {
        return 'Akzeptabel für Camping'
      }
      return 'Achtung: Hoher Spannungsabfall!'
    },
    
    getRecommendationText() {
      const drop = parseFloat(this.result.voltageDropPercent)
      if (this.selectedCrossSection >= this.recommendedCrossSection && drop <= 3) {
        return `Der Spannungsabfall liegt bei ${this.result.voltageDropPercent}% - optimal für Camping-Anwendungen.`
      }
      if (this.selectedCrossSection < this.recommendedCrossSection) {
        return `Der gewählte Querschnitt ist dünner als empfohlen. Empfohlen: ${this.recommendedCrossSection} mm² für optimale Leistung.`
      }
      if (drop <= 5) {
        return `Der Spannungsabfall liegt bei ${this.result.voltageDropPercent}% - gut für die meisten Camping-Anwendungen.`
      }
      if (drop <= 8) {
        return `Der Spannungsabfall liegt bei ${this.result.voltageDropPercent}% - noch akzeptabel für unkritische Verbraucher, aber ein dickeres Kabel wäre besser.`
      }
      return `Der Spannungsabfall liegt bei ${this.result.voltageDropPercent}% - zu hoch! Verwenden Sie ein dickeres Kabel oder verkürzen Sie die Strecke.`
    },
    
    getCableStyle() {
      return {
        backgroundColor: this.getCableColor(),
        padding: '20px',
        borderRadius: '8px'
      }
    },
    
    getCableWireStyle(isBlue) {
      // Blue wire (top) and red wire (bottom) - like real cables
      const color = isBlue ? '#2196F3' : '#F44336' // blue : red
      
      return {
        height: '10px',
        backgroundColor: color,
        borderRadius: '0',
        marginBottom: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }
    },
    
    getInfoBoxStyle() {
      const drop = parseFloat(this.result.voltageDropPercent)
      let bgColor = 'var(--color-success-light)'
      if (drop > 3 && drop <= 5) bgColor = 'var(--color-info-light)'
      else if (drop > 5 && drop <= 8) bgColor = 'var(--color-warning-light)'
      else if (drop > 8) bgColor = 'var(--color-error-light)'
      
      return {
        backgroundColor: bgColor
      }
    },
    
    getExampleCrossSection(example) {
      // Calculate cross section dynamically using the formula
      // length is in meters, convert to cm for formula
      const lengthInCm = example.length * 100
      return kabelquerschnitt(lengthInCm, example.current, example.voltage)
    }
  }
}
</script>

<style scoped>
/* Gradient Background using CSS variables */
.gradient-background {
  background: linear-gradient(135deg, var(--color-bg-gradient-start) 0%, var(--color-bg-gradient-end) 100%);
  min-height: 100vh;
}

.hero-section-wire-glass {
  background: transparent;
  min-height: 120px;
  position: relative;
  padding-bottom: 20px;
}

/* Glassmorphism Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15) !important;
}

/* Icon Glow Effects - Softer colors from the image */
.icon-glow-green {
  color: #7CB342 !important;
  filter: drop-shadow(0 0 4px rgba(124, 179, 66, 0.4))
          drop-shadow(0 0 8px rgba(124, 179, 66, 0.2));
  animation: pulse-green 3s ease-in-out infinite;
}

.icon-glow-orange {
  color: #FF9800 !important;
  filter: drop-shadow(0 0 4px rgba(255, 152, 0, 0.4))
          drop-shadow(0 0 8px rgba(255, 152, 0, 0.2));
  animation: pulse-orange 3s ease-in-out infinite;
}

@keyframes pulse-green {
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(124, 179, 66, 0.4))
            drop-shadow(0 0 8px rgba(124, 179, 66, 0.2));
  }
  50% {
    filter: drop-shadow(0 0 6px rgba(124, 179, 66, 0.5))
            drop-shadow(0 0 12px rgba(124, 179, 66, 0.3));
  }
}

@keyframes pulse-orange {
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(255, 152, 0, 0.4))
            drop-shadow(0 0 8px rgba(255, 152, 0, 0.2));
  }
  50% {
    filter: drop-shadow(0 0 6px rgba(255, 152, 0, 0.5))
            drop-shadow(0 0 12px rgba(255, 152, 0, 0.3));
  }
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.flow-container-flex {
  display: flex;
  align-items: stretch;
  gap: 0;
  min-height: 400px;
  position: relative;
}

.flex-item-fixed {
  flex: 0 0 300px;
  min-width: 300px;
  z-index: 2;
}

.flex-item-expand {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  z-index: 1;
}

.source-card,
.cable-card,
.consumer-card {
  min-height: 450px;
}

.hover-card {
  transition: all 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important;
}

.cursor-pointer {
  cursor: pointer;
}

.border-top {
  border-top: 1px solid #e0e0e0;
}

.cable-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cable-container {
  position: relative;
  margin: 0 -40px;
}

.cable-visual {
  transition: all 0.3s ease;
}

.cable-wire {
  transition: all 0.3s ease;
}

.cable-arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* Custom Alert Colors - Using CSS variables from colors.css */
.v-alert.success {
  background-color: var(--color-success) !important;
  border-color: var(--color-success) !important;
}

.v-alert.info {
  background-color: var(--color-info) !important;
  border-color: var(--color-info) !important;
}

.v-alert.warning {
  background-color: var(--color-warning) !important;
  border-color: var(--color-warning) !important;
}

.v-alert.error {
  background-color: var(--color-error) !important;
  border-color: var(--color-error) !important;
}

@media (max-width: 960px) {
  .hero-section-wire {
    min-height: 100px;
  }
  
  .flow-container-flex {
    flex-direction: column;
  }
  
  .flex-item-fixed {
    flex: 1 1 auto;
    min-width: 100%;
  }
  
  .flex-item-expand {
    padding: 20px 0;
  }
  
  .source-card,
  .consumer-card {
    min-height: auto;
  }
}
</style>
