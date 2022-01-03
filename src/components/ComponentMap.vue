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
  components: {
    AddComponentDialog,
    SelectComponentDialog,
    ErrorDialog
  },
  mounted() {
    const { root } = this.$refs
    const map = new MindMap(root, 700, 300)

    const configuration = this.$store.state.configuration.config
    // setup the center element 
    const data = this.$store.getters[configuration.center.type + "/getByUuid"]( configuration.center.uuid)
    map.setModel(data)
    this.createLeftComponents(map, configuration.left)
    this.createRightComponents(map, configuration.right)

    map.on("select", event => this.handleNodeSelect(event.component))
    map.on("configure", event => this.handleNodeConfigure( event.component))
    map.on("showError", event => this.handleNodeShowError( event.component))
    map.on("addChild", event => this.handleNodeAddChild( event.component))

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
      map.drawLines()
    })
  },
  methods: {
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
    
    async handleNodeAddChild (node) {
      const { type, uuid } = await this.$refs.addChildDialog.show(node.getChildCandidates())
      if (uuid) {
        const data = this.$store.getters[type + "/getByUuid"](uuid)
        const child = NodeFactory.createNode(node.leftSide, data)
        node.addNode(child)
      }
    },
    
    async handleNodeSelect (node) {
      console.log("NODE selected", node)
    },

    async handleNodeConfigure (node) {
      const uuid = await this.$refs.selectDialog.show(node.type)
      if (uuid) {
        const data = this.$store.getters[node.type + "/getByUuid"](uuid)
        node.setModel(data)
      }
    },

    async handleNodeShowError (node) {
      const errors = node.getErrors()
      await this.$refs.errorDialog.show(errors)
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
    .component_solarBooster.component_icon{
      max-height: 70px;
    }
    .component_starterBooster.component_icon{
      max-height: 70px;
    }
    .component_solarPanel.component_icon{
      max-height: 70px;
    }
    .component_fuse.component_icon{
      max-height: 70px;
    }
  }
}

</style>
