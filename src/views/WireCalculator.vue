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
                  text
                  class="text-none"
                  @click="showInfo = !showInfo"
                >
                  <h3 class="grey--text text--darken-4 font-weight-regular mr-2">
                    {{ $t('wireCalculator.info.title') }}
                  </h3>
                  <v-icon color="grey darken-3">{{ showInfo ? 'mdi-chevron-up' : 'mdi-information' }}</v-icon>
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

      <div class="custom-container mt-n12">
        <!-- Main Calculator Card -->
        <v-row justify="center">
          <v-col cols="12" lg="11" xl="10">
            <v-card class="rounded-xl elevation-8 overflow-visible">
              <v-card-text class="pa-6 pa-md-10 pb-0">
                
                <!-- Visual Flow: Source -> Cable -> Consumer -->
                <div class="flow-container-flex">
                  
                  <!-- LEFT: Power Source -->
                  <v-card class="flex-item-fixed source-card glass-card pa-6 rounded-xl elevation-8 text-center d-flex flex-column">
                    <v-icon size="80" class="mb-4 icon-glow-green">mdi-battery-charging</v-icon>
                    <h3 class="text-h6 font-weight-bold mb-4 green--text text--darken-3">
                      {{ $t('wireCalculator.powerSource') }}
                    </h3>
                    
                    <!-- Voltage Selection - Middle Section with flex-grow -->
                    <div class="d-flex justify-center mb-4" style="flex: 1;">
                      <v-btn-toggle
                        v-model="voltage"
                        mandatory
                        rounded
                        color="green darken-2"
                        @change="calculateFromInputs"
                      >
                        <v-btn :value="12" small>12V</v-btn>
                        <v-btn :value="24" small>24V</v-btn>
                      </v-btn-toggle>
                    </div>
                    
                    <!-- Display Values - Bottom Section -->
                    <v-divider class="my-4"></v-divider>
                    <div class="text-h4 font-weight-bold green--text text--darken-2 mb-2">
                      {{ voltage }} V
                    </div>
                    <div class="caption grey--text">{{ $t('wireCalculator.systemVoltage') }}</div>
                  </v-card>

                  <!-- CENTER: Cable -->
                  <div class="flex-item-expand cable-section">
                    <!-- Editable Values Above Cable -->
                    <div class="cable-info-top mb-3">
                      <div class="text-center mb-3">
                        <div class="body-1 grey--text mb-1">{{ $t('wireCalculator.cableLength') }}</div>
                        <div class="text-h5 font-weight-black">{{ length }}m</div>
                      </div>
                      
                      <!-- Length Slider -->
                      <v-slider
                        v-model="length"
                        min="0.5"
                        max="10"
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
                        :label="$t('wireCalculator.selectedCrossSection')"
                        @change="calculateFromCrossSection"
                        class="mb-0"
                      ></v-select>
                      
                      <!-- Loss Values Box (attached to combobox) -->
                      <div class="pa-3 rounded-b" :style="getInfoBoxStyle()">
                        <v-row dense no-gutters class="mb-2">
                          <v-col cols="7" class="text-left">
                            <div class="caption grey--text">{{ $t('wireCalculator.voltageDrop') }}</div>
                          </v-col>
                          <v-col cols="5" class="text-left">
                            <div class="font-weight-bold">{{ result.voltageDrop }} V</div>
                          </v-col>
                        </v-row>
                        <v-row dense no-gutters class="mb-2">
                          <v-col cols="7" class="text-left">
                            <div class="caption grey--text">{{ $t('wireCalculator.loss') }}</div>
                          </v-col>
                          <v-col cols="5" class="text-left">
                            <div class="font-weight-bold">{{ result.voltageDropPercent }}%</div>
                          </v-col>
                        </v-row>
                        <v-row dense no-gutters class="mb-2">
                          <v-col cols="7" class="text-left">
                            <div class="caption grey--text">{{ $t('wireCalculator.powerLoss') }}</div>
                          </v-col>
                          <v-col cols="5" class="text-left">
                            <div class="font-weight-bold">{{ result.powerLoss }} W</div>
                          </v-col>
                        </v-row>
                      </div>

                      <!-- Calculated Cross Section Box (separate) -->
                      <div class="mt-3 pa-3 rounded grey lighten-4">
                        <v-row dense no-gutters class="mb-2">
                          <v-col cols="7" class="text-left">
                            <div class="caption grey--text">{{ $t('wireCalculator.calculatedCrossSection') }}</div>
                          </v-col>
                          <v-col cols="5" class="text-left">
                            <div class="font-weight-bold">{{ calculatedCrossSection.toFixed(2) }} mm²</div>
                          </v-col>
                        </v-row>
                        <v-row dense no-gutters class="mb-2">
                          <v-col cols="7" class="text-left">
                            <div class="caption grey--text">{{ $t('wireCalculator.recommendedCrossSection') }}</div>
                          </v-col>
                          <v-col cols="5" class="text-left">
                            <div class="font-weight-bold">{{ recommendedCrossSection }} mm²</div>
                          </v-col>
                        </v-row>
                      </div>
                    </div>
                  </div>

                  <!-- RIGHT: Consumer -->
                  <v-card class="flex-item-fixed consumer-card glass-card pa-6 rounded-xl elevation-8 text-center d-flex flex-column">
                    <v-icon size="80" class="mb-4 icon-glow-orange">mdi-power-plug</v-icon>
                    <h3 class="text-h6 font-weight-bold mb-4 orange--text text--darken-3">
                      {{ $t('wireCalculator.consumer') }}
                    </h3>
                    
                    <!-- Input Section - Middle Section with flex-grow -->
                    <div class="d-flex justify-center mb-4">
                      <v-btn-toggle
                        v-model="inputMode"
                        mandatory
                        rounded
                        color="orange darken-2"
                        @change="calculateFromInputs"
                      >
                        <v-btn value="current" small>Ampere</v-btn>
                        <v-btn value="power" small>Watt</v-btn>
                      </v-btn-toggle>
                    </div>

                    <!-- Current Input -->
                    <div v-if="inputMode === 'current'" class="mb-4" style="flex: 1;">
                      <div class="caption grey--text mb-2">{{ $t('wireCalculator.current') }}</div>
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
                    <div v-if="inputMode === 'power'" class="mb-4" style="flex: 1;">
                      <div class="caption grey--text mb-2">{{ $t('wireCalculator.power') }}</div>
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

                    <!-- Display Values - Bottom Section -->
                    <v-divider class="my-4"></v-divider>
                    <div class="text-h4 font-weight-bold orange--text text--darken-2 mb-1">
                      {{ current }} A / {{ power }} W
                    </div>
                    <div class="caption grey--text">{{ $t('wireCalculator.powerConsumption') }}</div>
                  </v-card>
                </div>

              </v-card-text>
              
              <!-- Recommendation Banner - Flush with bottom -->
              <div class="recommendation-banner rounded-b-xl" :style="getRecommendationStyle()">
                <v-row align="center" no-gutters>
                  <v-col cols="12" md="1" class="text-center pa-4">
                    <v-icon :color="getRecommendationIconColor()" size="48">
                      {{ getRecommendationIcon() }}
                    </v-icon>
                  </v-col>
                  <v-col cols="12" md="7" class="pa-4">
                    <div class="font-weight-bold text-h6 mb-2">
                      {{ getRecommendationTitle() }}
                    </div>
                    <div class="body-2">
                      {{ getRecommendationText() }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="text-center pa-4">
                    <div class="caption mb-1">{{ $t('wireCalculator.recommendedCrossSection') }}</div>
                    <div class="text-h4 font-weight-bold">
                      {{ recommendedCrossSection }} mm²
                    </div>
                    <v-btn
                      v-if="selectedCrossSection !== recommendedCrossSection"
                      small
                      color="white"
                      class="mt-2"
                      @click="selectedCrossSection = recommendedCrossSection; calculateFromCrossSection()"
                    >
                      <v-icon small left>mdi-check</v-icon>
                      {{ $t('wireCalculator.apply') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Quick Examples -->
        <v-row justify="center" class="mt-8 mb-8">
          <v-col cols="12" lg="11" xl="10">
            <h3 class="text-h6 font-weight-bold mb-4 text-center grey--text text--darken-3">
              {{ $t('wireCalculator.quickSelection') }}
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
                  <div class="font-weight-bold caption mb-1">{{ $t(example.nameKey) }}</div>
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

      </div>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script>
import { kabelquerschnitt, querschnitt, toFixed, gamma } from '@/utils/Wire.js'
import wireExamples from '@/data/wireExamples.json'
import WireCalculatorInfo from '@/components/WireCalculatorInfo.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'WireCalculator',
  components: {
    WireCalculatorInfo,
    AppToolbar,
    AppFooter
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
      
      // Check if selected cross section is less than calculated minimum (dangerous!)
      if (this.selectedCrossSection < this.calculatedCrossSection) {
        return 'error'
      }
      
      // Check if between calculated and recommended (just barely ok)
      if (this.selectedCrossSection < this.recommendedCrossSection) {
        return 'warning'
      }
      
      // If cross section is adequate, check voltage drop
      if (drop <= 3) return 'success'
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
      
      // First check: Is cross section below calculated minimum?
      if (this.selectedCrossSection < this.calculatedCrossSection) {
        return this.$t('wireCalculator.recommendations.danger')
      }
      
      // Second check: Between calculated and recommended?
      if (this.selectedCrossSection < this.recommendedCrossSection) {
        return this.$t('wireCalculator.recommendations.barelyOk')
      }
      
      // Third check: Voltage drop evaluation
      if (drop <= 3) {
        return this.$t('wireCalculator.recommendations.optimal')
      }
      if (drop <= 5) {
        return this.$t('wireCalculator.recommendations.good')
      }
      if (drop <= 8) {
        return this.$t('wireCalculator.recommendations.acceptable')
      }
      return this.$t('wireCalculator.recommendations.critical')
    },
    
    getRecommendationText() {
      const drop = parseFloat(this.result.voltageDropPercent)
      
      // First check: Is cross section below calculated minimum? (Safety critical!)
      if (this.selectedCrossSection < this.calculatedCrossSection) {
        return this.$t('wireCalculator.recommendations.dangerText', {
          selected: this.selectedCrossSection,
          minimum: this.calculatedCrossSection.toFixed(2)
        })
      }
      
      // Second check: Between calculated and recommended? (Just barely ok)
      if (this.selectedCrossSection < this.recommendedCrossSection) {
        return this.$t('wireCalculator.recommendations.barelyOkText', {
          selected: this.selectedCrossSection,
          minimum: this.calculatedCrossSection.toFixed(2),
          recommended: this.recommendedCrossSection
        })
      }
      
      // Third check: Voltage drop evaluation (Efficiency)
      if (drop <= 3) {
        return this.$t('wireCalculator.recommendations.optimalText', {
          drop: this.result.voltageDropPercent
        })
      }
      if (drop <= 5) {
        return this.$t('wireCalculator.recommendations.goodText', {
          drop: this.result.voltageDropPercent
        })
      }
      if (drop <= 8) {
        return this.$t('wireCalculator.recommendations.acceptableText', {
          drop: this.result.voltageDropPercent
        })
      }
      return this.$t('wireCalculator.recommendations.criticalText', {
        drop: this.result.voltageDropPercent
      })
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
      // First check: Is cross section below calculated minimum? (Safety critical!)
      if (this.selectedCrossSection < this.calculatedCrossSection) {
        return {
          backgroundColor: 'var(--color-error-light)'
        }
      }
      
      // Second check: Between calculated and recommended? (Just barely ok)
      if (this.selectedCrossSection < this.recommendedCrossSection) {
        return {
          backgroundColor: 'var(--color-warning-light)'
        }
      }
      
      // Third check: Voltage drop evaluation (Efficiency)
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
    },
    
    getRecommendationStyle() {
      const drop = parseFloat(this.result.voltageDropPercent)
      let backgroundColor = '#4CAF50' // success green
      const color = 'white'
      
      // Check if selected cross section is less than calculated minimum (dangerous!)
      if (this.selectedCrossSection < this.calculatedCrossSection) {
        backgroundColor = '#F44336' // error red
      } else if (this.selectedCrossSection < this.recommendedCrossSection) {
        // Check if between calculated and recommended (just barely ok)
        backgroundColor = '#FF9800' // warning orange
      } else if (drop <= 3) {
        // If cross section is adequate, check voltage drop
        backgroundColor = '#4CAF50' // success green
      } else if (drop <= 5) {
        backgroundColor = '#2196F3' // info blue
      } else if (drop <= 8) {
        backgroundColor = '#FF9800' // warning orange
      } else {
        backgroundColor = '#F44336' // error red
      }
      
      return {
        backgroundColor,
        color
      }
    },
    
    getRecommendationIconColor() {
      return 'white'
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/colors.less';

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
  padding: 0 @wire-calc-section-gap;
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
  margin: 0 calc(-2 * @wire-calc-section-gap);
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

/* Custom Container - Full control over spacing */
.custom-container {
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
  margin-left: auto;
  margin-right: auto;
}

/* Desktop: Standard padding */
@media (min-width: 1264px) {
  .custom-container {
    padding-left: 24px;
    padding-right: 24px;
  }
}

/* Medium breakpoint: Minimal padding for maximum content space */
@media (min-width: 600px) and (max-width: 1263px) {
  .custom-container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* Small screens: Minimal padding */
@media (max-width: 599px) {
  .custom-container {
    padding-left: 16px;
    padding-right: 16px;
  }
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
  
  /* Reduce padding for more content space at medium breakpoint */
  .v-card-text.pa-6.pa-md-10 {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
}
</style>
