<template>
<div>
  <ComponentMap @nodeSelected="handleNodeSelected"  @configureNode="handleConfigureNode"  :configuration="configuration"/>
  <Modal ref="dialog"/>
</div>
</template>

<script>
import ComponentMap from '@/components/ComponentMap.vue'
import Modal from '@/components/Modal.vue'
import configuration from '@/data/configuration.js'

export default {
  name: 'Overview',

  components: {
    ComponentMap,
    Modal
  },
  data() {
    return { configuration }
  },
  methods: {
    async showModal() {
      const confirmation = await this.$refs.dialog.show()
      if (confirmation === 'ok') {
        // do something, the user is OK with it :)
      }
    },
    handleNodeSelected (event) {
      console.log("NODE selected", event)
    },
    handleConfigureNode (event) {
      console.log("NODE configure", event)
    }
  }
}
</script>

<style>

</style>
