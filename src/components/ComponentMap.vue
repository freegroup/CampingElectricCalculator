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
    <WireDialog ref="wireDialog"/>
    <SerialDialog ref="serialDialog"/>
    <ParallelDialog ref="parallelDialog"/>

    <v-card style="z-index:2; position:absolute; bottom:20px; right:20px;padding-left:10px;padding-right:10px" width="250" height="30">
      <v-slider v-model="zoom" step="5" min="30" max="170" dense></v-slider>
    </v-card>
  </div>
</template>

<script>
import MindMap from '@/map/Mindmap.js'
import NodeFactory from '@/map/Factory.js'
import { mapState } from 'vuex'
import SelectComponentDialog from '@/dialogs/SelectComponentDialog.vue'
import AddComponentDialog from '@/dialogs/AddComponentDialog.vue'
import ErrorDialog from '@/dialogs/ErrorDialog.vue'
import WireDialog from '@/dialogs/WireSettingsDialog.vue'
import InfoDialog from '@/dialogs/InfoDialog.vue'
import TimerDialog from '@/dialogs/TimerDialog.vue'
import AccuBalanceDialog from '@/dialogs/AccuBalanceDialog.vue'
import InOutBalanceDialog from '@/dialogs/InOutBalanceDialog.vue'
import ConsumerDialog from '@/dialogs/ConsumerDialog.vue'
import SerialDialog from '@/dialogs/SerialDialog.vue'
import ParallelDialog from '@/dialogs/ParallelDialog.vue'
import $ from "jquery"

export default {
  data() {
    return {
      map: null,
      price: { low: 0, high: 0 },
      calcPrice: 0,
      zoom: 100
    }
  },
  components: {
    AddComponentDialog,
    SelectComponentDialog,
    WireDialog,
    ErrorDialog,
    InOutBalanceDialog,
    AccuBalanceDialog,
    ConsumerDialog,
    TimerDialog,
    InfoDialog,
    ParallelDialog,
    SerialDialog
  },
  computed: mapState({
    low() {
      return this.price.low
    }
  }),
  watch: {
    '$route' (to, from) {
      const configuration = this.$store.getters["profile/getById"](to.params.configuration)
      this.loadConfiguration(configuration)
    },
    low (to, from) {
      this.calcPrice = to
    },
    zoom (to, from) {
      this.$refs.root.style.zoom = to / 100
      this.map.center()
    }
  },
  mounted() {
    const { root } = this.$refs
    this.map = new MindMap(root, 7000, 7000)
    this.price = this.map.calculateSetupPrice()

    this.map.on("select", event => this.handleNodeSelect(event))
    this.map.on("timer", event => this.handleNodeTimer( event))
    this.map.on("configure", event => this.handleNodeConfigure( event))
    this.map.on("wireSettings", event => this.handleWireSettings( event))
    this.map.on("showError", event => this.handleNodeShowError( event))
    this.map.on("addChild", event => this.handleNodeAddChild( event))
    this.map.on("showInfo", event => this.handleNodeShowInfo( event))
    this.map.on("showBalance", event => this.handleNodeBalance( event))
    this.map.on("removeChild", event => this.handleNodeRemoveChild( event))
    this.map.on("changed", () => this.saveConfig())
    $( ".canvas" ).on( "click", ".serialIcon", () => {
      this.$refs.serialDialog.show()
    })
    $( ".canvas" ).on( "click", ".parallelIcon", () => {
      this.$refs.parallelDialog.show()
    })

    const configuration = this.$store.getters["profile/getById"](this.$route.params.configuration)
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
      if ( config.center.customData ) {
        this.map.setCustomData(config.center.customData)
      }
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
        this.map.drawLines(true)
      })
      this.$emit("configLoaded")
    },

    createLeftComponents (parentComponentHost, childComponents) {
      childComponents.forEach(componentRef => {
        const data = this.$store.getters[componentRef.type + "/getByUuid"]( componentRef.uuid)

        const node = NodeFactory.createNode(true, data)
        node.model.operationHours = componentRef.operationHours
        node.model.operationHours ||= 24

        node.model.wireLength = componentRef.wireLength
        node.model.wireLength ||= 100 // cm
 
        if ( componentRef.customData ) {
          node.setCustomData(componentRef.customData)
        }

        parentComponentHost.addNode(node)
        this.createLeftComponents(node, componentRef.children) 
      })
    },

    createRightComponents (parentComponentHost, childComponents) {
      childComponents.forEach(componentRef => {
        const data = this.$store.getters[componentRef.type + "/getByUuid"]( componentRef.uuid)
        const node = NodeFactory.createNode(false, data)
        
        node.model.operationHours = componentRef.operationHours
        node.model.operationHours ||= 24

        node.model.wireLength = componentRef.wireLength
        node.model.wireLength ||= 100 // cm
        
        if ( componentRef.customData ) {
          node.setCustomData(componentRef.customData)
        }

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
    },

    async handleNodeConfigure (event) {
      const node = event.component
      const uuid = await this.$refs.selectDialog.show(node.type)
      if (uuid) {
        const model = this.$store.getters[node.type + "/getByUuid"](uuid)
        node.setModel(model)
        this.saveConfig()
      }
    },

    async handleWireSettings (event) {
      const node = event.component
      this.$refs.wireDialog.show(node)
    },

    async handleNodeShowError (event) {
      const node = event.component
      const errors = node.getErrorMessages()
      this.$refs.errorDialog.show(errors, node)
    },

    async handleNodeShowInfo (event) {
      const node = event.component
      const data = await this.$refs.infoDialog.show(node)
      if ( data ) {
        const model = this.$store.getters[node.type + "/getByUuid"]("custom")
        node.setModel(model)
        node.setCustomData(data)
        this.saveConfig()
      }
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
      this.$store.dispatch('profile/saveUserConfiguration', this.map.toJson())

      // and switch from the predefined setup to the "user" configuration by "#" routing.
      if ( this.configuration.id !== "user") {
        this.$router.push({ path: '/map/user' })
      }
    },

    getName() {
      return this.configuration.name
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
  }
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

    .serialPanels {
        border:1px solid #FFB74D;
        background-color: #FFE0B2;
        border-radius: 5px;
        border-collapse: separate;
        right: -20px;
        position: relative;
        padding-right: 20px;
        margin-top:5px;
        margin-bottom:5px;
    }
    .parallelPanels {
      border:1px solid #29B6F6;
      background-color: #81D4FA;
      border-radius: 5px;
      border-collapse: separate;
    }
    .parallelIcon, .serialIcon {
      position: absolute;
      top: 2px;
      right: 2px;
      cursor: pointer;
      width:20px;
      height:20px;
      border:1px solid rgba(0,0,0,0.3);
      background-color: rgb(248, 240, 240);
      border-radius:5px;
      padding:2px;
      z-index: 2;
    }
    svg {
      display: block;
      z-index: 1;
      position: relative;
      .node_line {
        cursor: pointer;
      }
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
      position: relative;
      .filler {
        width: 100%;
      }
      .children{
        position: relative;
      }
    }
    .node {
      padding-top: 20px;
      padding-bottom: 20px;
      >div{
        position: relative;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        border-radius: 5px;
        border: 2px solid transparent;
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
          position: relative;
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
    .storage {
      .error_icon {
          bottom: 55px !important;
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
      cursor: pointer;
      max-height: 70px;
      transition: all 150ms ease-in-out;
      &:hover{
        filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2));
        transform: scale(1.05);
      }
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
