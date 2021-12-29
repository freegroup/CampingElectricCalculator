<template>
  <div class="home">
    <Mindmap msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Mindmap from '@/components/Mindmap.vue'

export default {
  name: 'Home',
  components: {
    Mindmap
  }
}
</script>
