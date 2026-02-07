<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  watch: {
    // Track page views on route changes for GoatCounter
    $route(to) {
      // Wait for GoatCounter script to load
      if (window.goatcounter && window.goatcounter.count) {
        // Track the full path including hash
        window.goatcounter.count({
          path: to.path,
          title: document.title,
          event: false
        })
      }
    }
  }
}
</script>
