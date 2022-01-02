<template>
<div>
  <ComponentMap 
      @componentSelect="handleNodeSelect"  
      @componentConfigure="handleNodeConfigure" 
      @componentShowError="handleNodeShowError" 
  />
  <Modal ref="dialog"/>
  <ErrorDialog ref="errorDialog"/>
</div>
</template>

<script>
import ComponentMap from '@/components/ComponentMap.vue'
import Modal from '@/components/Modal.vue'
import ErrorDialog from '@/components/ErrorDialog.vue'

export default {
  name: 'Overview',

  components: {
    ComponentMap,
    Modal,
    ErrorDialog
  },
  methods: {
    async handleNodeSelect (node) {
      console.log("NODE selected", node)
    },

    async handleNodeConfigure (node) {
      const uuid = await this.$refs.dialog.show(node.type)
      if (uuid !== null) {
        const data = this.$store.getters[node.type + "/getByUuid"](uuid)
        node.setModel(data)
      }
    },

    async handleNodeShowError (node) {
      const errors = node.getErrors()
      await this.$refs.errorDialog.show(errors)
    }
  }
}
</script>

<style>

</style>
