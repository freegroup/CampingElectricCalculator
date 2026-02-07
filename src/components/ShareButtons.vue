<template>
  <div class="share-buttons">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          text
          color="grey darken-1"
          class="share-btn"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon small left>mdi-share-variant</v-icon>
          {{ $t('share.button') }}
        </v-btn>
      </template>

      <v-list dense>
        <!-- Native Web Share (Mobile) -->
        <v-list-item v-if="canNativeShare" @click="nativeShare">
          <v-list-item-icon>
            <v-icon small color="grey darken-2">mdi-share-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('share.native') }}</v-list-item-title>
        </v-list-item>

        <v-divider v-if="canNativeShare"></v-divider>

        <!-- Facebook -->
        <v-list-item @click="shareOn('facebook')">
          <v-list-item-icon>
            <v-icon small color="#1877F2">mdi-facebook</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Facebook</v-list-item-title>
        </v-list-item>

        <!-- WhatsApp -->
        <v-list-item @click="shareOn('whatsapp')">
          <v-list-item-icon>
            <v-icon small color="#25D366">mdi-whatsapp</v-icon>
          </v-list-item-icon>
          <v-list-item-title>WhatsApp</v-list-item-title>
        </v-list-item>

        <!-- Reddit -->
        <v-list-item @click="shareOn('reddit')">
          <v-list-item-icon>
            <v-icon small color="#FF4500">mdi-reddit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Reddit</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Email -->
        <v-list-item @click="shareOn('email')">
          <v-list-item-icon>
            <v-icon small color="grey darken-2">mdi-email-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('share.email') }}</v-list-item-title>
        </v-list-item>

        <!-- Copy Link -->
        <v-list-item @click="copyLink">
          <v-list-item-icon>
            <v-icon small color="grey darken-2">{{ copied ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ copied ? $t('share.copied') : $t('share.copyLink') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'ShareButtons',
  data() {
    return {
      copied: false
    }
  },
  computed: {
    shareUrl() {
      return window.location.origin + window.location.pathname
    },
    shareTitle() {
      return this.$t('share.title')
    },
    shareText() {
      return this.$t('share.text')
    },
    canNativeShare() {
      return navigator.share !== undefined
    }
  },
  methods: {
    async nativeShare() {
      try {
        await navigator.share({
          title: this.shareTitle,
          text: this.shareText,
          url: this.shareUrl
        })
      } catch (err) {
        // User cancelled or share failed
        if (err.name !== 'AbortError') {
          this.copyLink()
        }
      }
    },

    shareOn(platform) {
      const encodedUrl = encodeURIComponent(this.shareUrl)
      const encodedTitle = encodeURIComponent(this.shareTitle)
      const encodedText = encodeURIComponent(this.shareText)

      const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
        reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`
      }

      if (urls[platform]) {
        if (platform === 'email') {
          window.location.href = urls[platform]
        } else {
          window.open(urls[platform], '_blank', 'width=600,height=400')
        }
      }
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.shareUrl)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = this.shareUrl
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand('copy')
          this.copied = true
          setTimeout(() => {
            this.copied = false
          }, 2000)
        } catch (err) {
          // Copy failed
        }
        document.body.removeChild(textArea)
      }
    }
  }
}
</script>

<style scoped>
.share-buttons {
  display: inline-flex;
  align-items: center;
}

.share-btn {
  text-transform: none;
  font-size: 13px;
}

.share-btn:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
