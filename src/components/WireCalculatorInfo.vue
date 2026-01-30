erade eingestellt habe<template>
  <v-expand-transition>
    <v-row v-show="show" justify="center" class="mt-4">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-4 rounded-lg" color="rgba(255,255,255,0.95)">
          <v-card-text>
            
            <p class="body-2 mb-4">
              {{ i18n.wireCalculator.info.description }}
            </p>
            
            <h3 class="text-h6 font-weight-bold mb-3">
              <v-icon color="primary" class="mr-2">mdi-calculator</v-icon>
              {{ i18n.wireCalculator.info.formulaTitle }}
            </h3>
            
            <p class="body-2 mb-2">
              {{ i18n.wireCalculator.info.formulaDescription }}
            </p>
            
            <!-- Compact Calculation with User Values -->
            <div class="compact-calculation pa-4 rounded d-flex align-center justify-center flex-wrap mb-3" style="background-color: #f5f5f5; gap: 16px;">
              <!-- Formula -->
              <div class="formula-main">
                <div class="formula-fraction">
                  <div class="formula-numerator">
                    <span class="formula-var">L</span>
                    <span class="formula-op">×</span>
                    <span class="formula-num">2</span>
                    <span class="formula-op">×</span>
                    <span class="formula-var">I</span>
                  </div>
                  <div class="formula-denominator">
                    <span class="formula-var">Δ</span>
                    <span class="formula-op">×</span>
                    <span class="formula-var">U</span>
                    <span class="formula-op">×</span>
                    <span class="formula-var">γ</span>
                  </div>
                </div>
              </div>

              <span class="formula-op text-h5">=</span>

              <!-- Real Values -->
              <div class="formula-main">
                <div class="formula-fraction">
                  <div class="formula-numerator">
                    <span class="formula-num">{{ length }}m</span>
                    <span class="formula-op">×</span>
                    <span class="formula-num">2</span>
                    <span class="formula-op">×</span>
                    <span class="formula-num">{{ current }}A</span>
                  </div>
                  <div class="formula-denominator">
                    <span class="formula-num">2%</span>
                    <span class="formula-op">×</span>
                    <span class="formula-num">{{ voltage }}V</span>
                    <span class="formula-op">×</span>
                    <span class="formula-num">56</span>
                  </div>
                </div>
              </div>

              <span class="formula-op text-h5">=</span>

              <!-- Result -->
              <div class="text-h4 font-weight-bold primary--text">
                {{ calculatedCrossSection.toFixed(2) }} mm²
              </div>
            </div>
            
            <v-row dense class="body-2">
              <v-col cols="12" sm="6">
                <div class="mb-2">
                  <span class="font-weight-bold">A</span> = {{ i18n.wireCalculator.info.variables.crossSection }} [{{ i18n.units.squareMillimeter }}]
                </div>
                <div class="mb-2">
                  <span class="font-weight-bold">L</span> = {{ i18n.wireCalculator.info.variables.length }} [{{ i18n.units.meter }}]
                </div>
                <div class="mb-2">
                  <span class="font-weight-bold">I</span> = {{ i18n.wireCalculator.info.variables.current }} [{{ i18n.units.ampere }}]
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="mb-2">
                  <span class="font-weight-bold">U</span> = {{ i18n.wireCalculator.info.variables.voltage }} [{{ i18n.units.volt }}]
                </div>
                <div class="mb-2">
                  <span class="font-weight-bold">Δ</span> = {{ i18n.wireCalculator.info.variables.voltageDrop }}
                </div>
                <div class="mb-2">
                  <span class="font-weight-bold">γ</span> = {{ i18n.wireCalculator.info.variables.conductivity }}
                </div>
              </v-col>
            </v-row>
            
            <v-alert
              dense
              text
              type="info"
              class="mt-3"
            >
              <div class="caption">
                <strong>{{ i18n.wireCalculator.info.factor2Title }}:</strong> {{ i18n.wireCalculator.info.factor2Description }}
              </div>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-expand-transition>
</template>

<script>
import i18nData from '@/i18n.js'

export default {
  name: 'WireCalculatorInfo',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    length: {
      type: Number,
      default: 5
    },
    current: {
      type: Number,
      default: 10
    },
    voltage: {
      type: Number,
      default: 12
    },
    calculatedCrossSection: {
      type: Number,
      default: 7.44
    },
    recommendedCrossSection: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      i18n: i18nData.de // Default to German, can be made dynamic later
    }
  }
}
</script>

<style scoped>
/* Formula Styling */
.formula-box {
  background-color: #f5f5f5;
  border-left: 4px solid #1976D2;
  border-radius: 4px;
}

.formula-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 1.2rem;
}

.formula-var {
  font-style: italic;
  font-weight: bold;
  color: #1976D2;
}

.formula-op {
  color: #666;
  margin: 0 4px;
}

.formula-num {
  font-weight: bold;
  color: #333;
}

.formula-fraction {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
}

.formula-numerator {
  border-bottom: 2px solid #333;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.formula-denominator {
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 960px) {
  .formula-main {
    font-size: 1rem;
  }
}
</style>
