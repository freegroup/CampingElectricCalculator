<template>
  <div>
    <div class="canvas" ref="root"></div>
    <SelectComponentDialog ref="selectDialog"/>
    <AddComponentDialog ref="addChildDialog"/>
    <ErrorDialog ref="errorDialog"/>
    <InfoDialog ref="infoDialog"/>
    <InOutBalanceDialog ref="balanceDialog"/>
    <AccuBalanceDialog ref="accuBalanceDialog"/>
    <ConsumerDialog ref="consumerDialog"/>
    <TimerDialog ref="timerDialog"/>
  </div>
</template>

<script>
import MindMap from '@/map/Mindmap.js'
import NodeFactory from '@/map/Factory.js'
import { mapState, mapGetters } from 'vuex'
import SelectComponentDialog from '@/dialogs/SelectComponentDialog.vue'
import AddComponentDialog from '@/dialogs/AddComponentDialog.vue'
import ErrorDialog from '@/dialogs/ErrorDialog.vue'
import InfoDialog from '@/dialogs/InfoDialog.vue'
import TimerDialog from '@/dialogs/TimerDialog.vue'
import AccuBalanceDialog from '@/dialogs/AccuBalanceDialog.vue'
import InOutBalanceDialog from '@/dialogs/InOutBalanceDialog.vue'
import ConsumerDialog from '@/dialogs/ConsumerDialog.vue'

export default {
  data() {
    return {
      map: null
    }
  },
  components: {
    AddComponentDialog,
    SelectComponentDialog,
    ErrorDialog,
    InOutBalanceDialog,
    AccuBalanceDialog,
    ConsumerDialog,
    TimerDialog,
    InfoDialog
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
    this.map.on("timer", event => this.handleNodeTimer( event))
    this.map.on("configure", event => this.handleNodeConfigure( event))
    this.map.on("showError", event => this.handleNodeShowError( event))
    this.map.on("addChild", event => this.handleNodeAddChild( event))
    this.map.on("showInfo", event => this.handleNodeShowInfo( event))
    this.map.on("showBalance", event => this.handleNodeBalance( event))
    this.map.on("removeChild", event => this.handleNodeRemoveChild( event))
    this.map.on("changed", () => this.saveConfig())

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
      this.map.model.operationHours = 24
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
        let operationHours = componentRef.operationHours
        if ( isNaN(operationHours) ) {
          operationHours = 24
        }
        const node = NodeFactory.createNode(true, data)
        node.model.operationHours = operationHours
        parentComponentHost.addNode(node)
        this.createLeftComponents(node, componentRef.children) 
      })
    },

    createRightComponents (parentComponentHost, childComponents) {
      childComponents.forEach(componentRef => {
        const data = this.$store.getters[componentRef.type + "/getByUuid"]( componentRef.uuid)
        let operationHours = componentRef.operationHours
        if ( isNaN(operationHours) ) {
          operationHours = 24
        }
        const node = NodeFactory.createNode(false, data)
        node.model.operationHours = operationHours
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
      // console.log("NODE selected", event.component)
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
      const errors = node.getErrorMessages()
      this.$refs.errorDialog.show(errors)
    },

    async handleNodeShowInfo (event) {
      const node = event.component
      this.$refs.infoDialog.show(node)
    },

    async handleNodeTimer (event) {
      const node = event.component
      await this.$refs.timerDialog.show(node)
      this.saveConfig()
    },

    async handleNodeBalance (event) {
      const node = event.component
      if ( node === this.map ) {
        this.$refs.accuBalanceDialog.show(node)
      } else if ( node.leftSide ) {
        this.$refs.balanceDialog.show(node)
      } else {
        this.$refs.consumerDialog.show(node)
      }
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

    center() {
      return this.map.center()
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
    border-collapse: collapse;
    background-image: url('~@/assets/background.png');
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-position: center;
    background-size: 800px;

    .producer {
      background-image: #effeff7e;
    }
    .storage {
      background-color: #dfe7eb42;
    }
    .consumer {
      background-image: #effeff6b;
    }

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
      position: relative;
      display: block;
    }
    .child_node {
      .filler {
        width: 100%;
      }
    }
    .node {
      padding-top: 20px;
      padding-bottom: 20px;
      >div{
        position: relative;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        border-radius: 5px;
        border: 1px dotted transparent;
        background: white;
        .toolbar {
          height: 26px;
          border-bottom: 1px solid lightgray;
          text-align: right;
          padding-top:4px;
          .toolbar_icon{
            font-size: 16px;
            padding-left: 3px;
            cursor: pointer;
            &:hover {
              color:orange;
            }
          }
        }
        .statusbar {
          text-align: center;
          opacity: 0.5;
          font-size: 70%;
          text-decoration: underline;
          color: blue;
          cursor:pointer;
          &:hover{
            opacity: 1;
          }
        }
       .balancebar {
          text-align: center;
          opacity: 0.5;
          font-size: 70%;
          display: flow-root;
          min-width: 200px;
          .input_label{
            color: green;
            border:1px solid gray;
            border-radius: 4px;
            padding: 2px;
            min-width: 60px;
          }
          .runtime_label {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          .output_label {
            color: red;
            border:1px solid gray;
            border-radius: 4px;
            padding: 2px;
            min-width: 60px;
          }
        }
        .container{
          padding:10px;
          .input_button {
            cursor: pointer;
            background-color:rgba(0,0,0,0.05);
            width:10px;
            position:absolute;
            top:25px;
            bottom:0px;
            left:0px;
            &:hover {
              background-color:rgba(0,0,0,0.1);
            }
          }
          .output_button {
            cursor: pointer;
            background-color:rgba(0,0,0,0.05);
            width:10px;
            position:absolute;
            top:25px;
            bottom:0px;
            right:0px;
            &:hover {
              background-color:rgba(0,0,0,0.1);
            }
          }
        }
        .error_icon {
          position: absolute;
          bottom: 15px;
          left: 4px;
          height: 26px;
          cursor: pointer;
        }
      }
    }

    .producer_placeholder {
      div {
      background-image: url('~@/assets/provider.png');
      background-repeat: no-repeat;
      background-attachment: scroll;
      background-position: right center;
      background-size: contain;
      height:400px;
      width:150px;
      }
    }
    .consumer_placeholder {
      div {
      background-image: url('~@/assets/consumer.png');
      background-repeat: no-repeat;
      background-attachment: scroll;
      background-position: right center;
      background-size: contain;
      height:400px;
      width:150px;
      }
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
      min-width: 150px;
      text-align: center;
    }
    
    .component_label {
      white-space: nowrap;
      padding-right:10px;
      padding-left:10px;
      font-size: 12px;
      padding-bottom: 5px;
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

  .pulse {
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0% { transform: rotate(0deg); }
    80% { transform: rotate(0deg); }
    85% { transform: rotate(15deg); }
    95% { transform: rotate(-15deg); }
    100% { transform: rotate(0deg); }
  }
}
</style>
