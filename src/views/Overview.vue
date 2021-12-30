<template>
<div>
  <ComponentMap @componentSelect="handleComponentSelect"  @componentConfigure="handleComponentConfigure" />
  <Modal ref="dialog"/>
</div>
</template>

<script>
import ComponentMap from '@/components/ComponentMap.vue'
import Modal from '@/components/Modal.vue'

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
    handleComponentSelect (component) {
      console.log("NODE selected", component)
    },
    async handleComponentConfigure   (component) {
      console.log("NODE configure", component)
      const result = await this.$refs.dialog.show(component.type)
      if (result === true) {
        console.log("configure done")
      }
    }
  }
}
</script>

<style>

</style>
