<template>
<div>
  <ComponentMap @componentSelect="handleNodeSelect"  @componentConfigure="handleNodeConfigure" />
  <Modal ref="dialog"/>
</div>
</template>

<script>
import ComponentMap from '@/components/ComponentMap.vue'
import Modal from '@/components/Modal.vue'
import Component from '@/electric/Component'

export default {
  name: 'Overview',

  components: {
    ComponentMap,
    Modal
  },
  methods: {
    async showModal() {
      const confirmation = await this.$refs.dialog.show()
      if (confirmation === 'ok') {
        // do something, the user is OK with it :)
      }
    },
    handleNodeSelect (node) {
      console.log("NODE selected", node)
    },
    async handleNodeConfigure (node) {
      const uuid = await this.$refs.dialog.show(node.type)
      if (uuid !== null) {
        const componentData = this.$store.getters[node.type + "/getByUuid"](uuid)
        node.setComponent(new Component(componentData))
      }
    }
  }
}
</script>

<style>

</style>
