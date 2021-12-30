<template>
    <div class="canvas" ref="root"></div>
</template>

<script>
import MindMap from '@/map/Mindmap'
import RightNode from '@/map/RightNode'
import LeftNode from '@/map/LeftNode'
import Component from '@/electric/Component'
import { mapState, mapGetters } from 'vuex'

export default {
  mounted() {
    const { root } = this.$refs
    const map = new MindMap(root, 8000, 8000)

    const configuration = this.$store.state.configuration.config
    // setup the center element 
    const centerComponent = this.$store.getters[configuration.center.type + "/getByUuid"]( configuration.center.uuid)
    map.setComponent(new Component(centerComponent))
    this.createLeftComponents(map, configuration.left)
    this.createRightComponents(map, configuration.right)

    map.on("select", event => this.$emit("componentSelect", event.component))
    map.on("configure", event => this.$emit("componentConfigure", event.component))

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
        const node = new LeftNode()
        const componentData = this.$store.getters[componentRef.type + "/getByUuid"]( componentRef.uuid)
        parentComponentHost.addNode(node)
        node.setComponent(new Component(componentData))
        this.createLeftComponents(node, componentRef.children) 
      })
    },
    createRightComponents (parentComponentHost, childComponents) {
      childComponents.forEach(componentRef => {
        const node = new RightNode()
        const componentData = this.$store.getters[componentRef.type + "/getByUuid"]( componentRef.uuid)
        parentComponentHost.addNode(node)
        node.setComponent(new Component(componentData))
        this.createRightComponents(node, componentRef.children) 
      })
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
      border-spacing: 0 20px;
      tr, td {
        padding: 0;
        margin: 0;
        border: none;
      }
    }

    .left_node {
      .action_icon {
        cursor: pointer;
      }
      .filler {
        width: 100%;
      }
      .container{
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        padding:10px;
        border-radius:5px;
        border: 1px dotted transparent;
      }
    }

    .right_node {
      .action_icon {
        cursor: pointer;
      }
      .filler {
        width: 100%;
      }
      .container{
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        padding:10px;
        border-radius:5px;
        border: 1px dotted transparent;
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

    .component_configuration {
      position: absolute;
      top:2px;
      right:3px;
      height:20px;
      cursor: pointer;
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
      max-height: 150px;
    }
    .component_solarBooster.component_icon{
      max-height: 90px;
    }
    .component_starterBooster.component_icon{
      max-height: 90px;
    }
    .component_fuse.component_icon{
      max-height: 50px;
    }
  }
}

</style>
