<template>
  <v-footer app color="#f5f5f5" class="app-footer" elevation="4">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <div class="footer-content">
            <!-- Visitor Counter -->
            <div class="visitor-stats">
              <v-icon small color="grey darken-1" class="mr-1">mdi-eye-outline</v-icon>
              <span v-if="loading" class="grey--text text--darken-1">
                {{ $t('footer.loading') }}
              </span>
              <span v-else-if="error" class="grey--text text--darken-1">
                {{ $t('footer.visitors') }}
              </span>
              <span v-else class="grey--text text--darken-2">
                <strong>{{ formatNumber(stats.totalUnique) }}</strong> {{ $t('footer.visitors') }}
              </span>
            </div>

            <!-- Divider -->
            <span class="mx-2 grey--text text--lighten-1">•</span>

            <!-- Made with love -->
            <span class="grey--text text--darken-1">
              {{ $t('footer.madeWith') }}
              <v-icon small color="red" class="heart-icon">mdi-heart</v-icon>
              {{ $t('footer.forCampers') }}
            </span>

            <!-- Divider -->
            <span class="mx-2 grey--text text--lighten-1 d-none d-sm-inline">•</span>

            <!-- Analytics Link -->
            <a
              href="https://camping-calculator.goatcounter.com"
              target="_blank"
              rel="noopener noreferrer"
              class="analytics-link grey--text text--darken-1 d-none d-sm-inline"
            >
              <v-icon x-small class="mr-1">mdi-chart-line</v-icon>
              {{ $t('footer.analytics') }}
            </a>

            <!-- Divider -->
            <span class="mx-2 grey--text text--lighten-1 d-none d-sm-inline">•</span>

            <!-- Share Buttons -->
            <ShareButtons class="d-none d-sm-inline-block" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { getVisitorStats } from '@/utils/GoatCounterAPI.js'
import ShareButtons from '@/components/ShareButtons.vue'

export default {
  name: 'AppFooter',
  components: {
    ShareButtons
  },
  data() {
    return {
      stats: {
        total: 0,
        totalUnique: 0
      },
      loading: true,
      error: false
    }
  },
  mounted() {
    this.fetchStats()
    // Refresh stats every 5 minutes
    this.refreshInterval = setInterval(() => {
      this.fetchStats()
    }, 5 * 60 * 1000)
  },
  beforeDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }
  },
  methods: {
    async fetchStats() {
      try {
        this.loading = true
        this.error = false
        const data = await getVisitorStats()

        if (data.error) {
          this.error = true
        } else {
          this.stats = data
        }
      } catch (err) {
        // Failed to fetch visitor stats
        this.error = true
      } finally {
        this.loading = false
      }
    },
    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return num.toLocaleString()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/colors.less';

.app-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 12px 0;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 1.5;
  gap: 4px;
}

.visitor-stats {
  display: inline-flex;
  align-items: center;
}

.heart-icon {
  animation: heartbeat 1.5s ease-in-out infinite;
  display: inline-block;
  margin: 0 2px;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(1.1);
  }
  20%, 40% {
    transform: scale(1);
  }
}

.analytics-link {
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #1976d2 !important;
    text-decoration: underline;
  }
}

// Mobile responsiveness
@media (max-width: 600px) {
  .footer-content {
    font-size: 12px;
  }
}
</style>
