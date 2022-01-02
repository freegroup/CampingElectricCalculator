<template>
<div>
  <ComponentMap 
      @componentSelect="handleNodeSelect"  
      @componentConfigure="handleNodeConfigure" 
      @componentShowError="handleNodeShowError" 
  />
  <SelectComponentDialog ref="componentDialog"/>
  <ErrorDialog ref="errorDialog"/>
</div>
</template>

<script>
import ComponentMap from '@/components/ComponentMap.vue'
import SelectComponentDialog from '@/dialogs/SelectComponentDialog.vue'
import ErrorDialog from '@/dialogs/ErrorDialog.vue'

export default {
  name: 'Overview',

  components: {
    ComponentMap,
    SelectComponentDialog,
    ErrorDialog
  },
  methods: {
    async handleNodeSelect (node) {
      console.log("NODE selected", node)
    },

    async handleNodeConfigure (node) {
      const uuid = await this.$refs.componentDialog.show(node.type)
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
