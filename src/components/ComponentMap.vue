<template>
  <div>
    <div class="canvas" ref="root"></div>
    <SelectComponentDialog ref="selectDialog"/>
    <AddComponentDialog ref="addChildDialog"/>
    <ErrorDialog ref="errorDialog"/>
  </div>
</template>

<script>
import MindMap from '@/map/Mindmap.js'
import NodeFactory from '@/map/Factory.js'
import { mapState, mapGetters } from 'vuex'
import SelectComponentDialog from '@/dialogs/SelectComponentDialog.vue'
import AddComponentDialog from '@/dialogs/AddComponentDialog.vue'
import ErrorDialog from '@/dialogs/ErrorDialog.vue'

export default {
  data() {
    return {
      map: null
    }
  },
  components: {
    AddComponentDialog,
    SelectComponentDialog,
    ErrorDialog
  },
  watch: {
    '$route' (to, from) {
      const configuration = this.$store.getters["configuration/getById"](to.params.configuration)
      this.loadConfiguration(configuration)
    }
  },
  mounted() {
    const { root } = this.$refs
    this.map = new MindMap(root, 7000, 7000)
    this.map.on("select", event => this.handleNodeSelect(event))
    this.map.on("configure", event => this.handleNodeConfigure( event))
    this.map.on("showError", event => this.handleNodeShowError( event))
    this.map.on("addChild", event => this.handleNodeAddChild( event))
    this.map.on("removeChild", event => this.handleNodeRemoveChild( event))

    const configuration = this.$store.getters["configuration/getById"](this.$route.params.configuration)
    this.loadConfiguration(configuration)
  },
  methods: {
    loadConfiguration (configuration ) {
      this.configuration = configuration
      const config = configuration.config
      // delete the old DOM tree
      this.map.reset()

      // setup the center element 
      const data = this.$store.getters[config.center.type + "/getByUuid"]( config.center.uuid)
      this.map.setModel(data)
      this.createLeftComponents(this.map, config.left)
      this.createRightComponents(this.map, config.right)

      // it is possible, that not all images are loaded immediatly. In this case
      // we must check the images and redraw the lines between the nodes.
      Promise.all(Array.from(document.images).map(img => {
        if (img.complete) {
          return Promise.resolve(img.naturalHeight !== 0)
        }
        return new Promise(resolve => {
          img.addEventListener('load', () => resolve(true))
          img.addEventListener('error', () => resolve(false))
        })
      })).then(results => {
        this.map.drawLines()
      })
      this.$emit("configLoaded")
    },

    createLeftComponents (parentComponentHost, childComponents) {
      childComponents.forEach(componentRef => {
        const data = this.$store.getters[componentRef.type + "/getByUuid"]( componentRef.uuid)
        const node = NodeFactory.createNode(true, data)
        parentComponentHost.addNode(node)
        this.createLeftComponents(node, componentRef.children) 
      })
    },

    createRightComponents (parentComponentHost, childComponents) {
      childComponents.forEach(componentRef => {
        const data = this.$store.getters[componentRef.type + "/getByUuid"]( componentRef.uuid)
        const node = NodeFactory.createNode(false, data)
        parentComponentHost.addNode(node)
        this.createRightComponents(node, componentRef.children) 
      })
    },
    
    async handleNodeAddChild (event) {
      const node = event.component
      const candidateTypes = event.candidates
      const { type, uuid } = await this.$refs.addChildDialog.show(candidateTypes)
      if (uuid) {
        const data = this.$store.getters[type + "/getByUuid"](uuid)
        const child = NodeFactory.createNode(event.leftSide, data)
        node.addNode(child)
        this.saveConfig()
      }
    },
    
    async handleNodeRemoveChild (event) {
      const node = event.component
      node.parent.removeNode(node)
      this.saveConfig()
    },
    
    async handleNodeSelect (event) {
      console.log("NODE selected", event.component)
    },

    async handleNodeConfigure (event) {
      const node = event.component
      const uuid = await this.$refs.selectDialog.show(node.type)
      if (uuid) {
        const data = this.$store.getters[node.type + "/getByUuid"](uuid)
        node.setModel(data)
        this.saveConfig()
      }
    },

    async handleNodeShowError (event) {
      const node = event.component
      const errors = node.getErrors()
      await this.$refs.errorDialog.show(errors)
    },

    saveConfig() {
      // save the changes as "user" configuration
      this.$store.dispatch('configuration/saveUserConfiguration', this.map.toJson())

      // and load now the "user" configuration. Only the "user" configuration is changeable
      if ( this.configuration.id !== "user") {
        this.$router.push({ path: '/map/user' })
      }
    },

    getLabel() {
      return this.configuration.label
    },

    getConfiguration() {
      return this.configuration
    },

    toJson() {
      return this.map.toJson()
    }
  },
  computed: mapState({
    fuse: state => {
      return state.fuse.components
    },
    ...mapGetters("fuse", [
      'getByUuid'
    ])
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.canvas {
  overflow: auto;
  font-size: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;

  .root {
    position: relative;
    
    canvas {
      display: block;
    }

    table {
      border-spacing: 0;
      border-collapse: inherit;
      border: none;    
      tr, td {
        padding:0;
        margin: 0;
        border: none;
      }
    }
    .addChild_icon {
      cursor: pointer;
      height:24px;
    }
    .child_node {
      .filler {
        width: 100%;
      }
      .label {
        padding-top: 20px;
        padding-bottom: 20px;
        >div{
          position: relative;
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          border-radius: 5px;
          border: 1px dotted transparent;
          .toolbar {
            height: 26px;
            border-bottom: 1px solid lightgray;
            text-align: right;
            img{
              height: 22px;
              padding: 3px;
              cursor: pointer;
              &:hover {
                background-color:lightgray;
              }
            }
          }
          .container{
            padding:10px;
          }
          .error_icon {
            position: absolute;
            bottom: 2px;
            left: 4px;
            height: 26px;
            cursor: pointer;
          }
        }
      }
    }

    .center_node {
     .container{
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        padding:10px;
        border-radius:5px;
        border: 1px dotted transparent;
      }
    }

    .center_canvas {
      text-align: center;
      white-space: nowrap;
    }

    .selected_node {
      border: 1px dotted red !important;
    }

    .normal_node {
      margin: 3px;
      cursor: pointer;
    }

    .highlighted_node {
      background-color: yellow !important;
    }

    .component {
      position:relative;
    }
    
    .component_label {
      white-space: nowrap;
      padding-right:30px;
    }
    .component_icon {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    
    .component_accu.component_icon{
      max-height: 90px;
    }
    .component_icon{
      max-height: 70px;
    }
  }
}
</style>
