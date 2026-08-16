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
    <NotificationDialog ref="notificationDialog"/>

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
import NotificationDialog from '@/dialogs/NotificationDialog.vue'
import Default from '@/store/configuration/Default.json'
import $ from "jquery"

export default {
  data() {
    return {
      map: null,
      configuration: null,
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
    SerialDialog,
    NotificationDialog
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

    // Set tooltips for battery icons
    this.setTooltips()

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

    this.$root.$on('localeChanged', this.onLocaleChanged)

    const configuration = this.$store.getters["profile/getById"](this.$route.params.configuration)
    this.loadConfiguration(configuration)
  },
  beforeDestroy() {
    this.$root.$off('localeChanged', this.onLocaleChanged)
  },
  methods: {
    /**
     * The map is rendered as plain HTML, so a language switch has to re-write the
     * labels by hand - a Vue template would do this on its own.
     */
    onLocaleChanged() {
      this.map.refreshLabels()
      this.map.updateStatusIcons(true)
      this.setTooltips()
    },

    /**
     * Build the map for the given configuration.
     *
     * A configuration can come from the localStorage, from a bundled example or from a JSON
     * file the user picked. All of them can reference components which don't exist (anymore).
     * Whatever we can't resolve is skipped instead of breaking the map, and the user gets a
     * short, friendly summary of what was left out.
     */
    loadConfiguration (configuration ) {
      const problems = []

      if ( !configuration || typeof configuration !== "object" ) {
        configuration = { id: "user", name: "User", config: Default, loadProblem: "configInvalid" }
      }

      // a problem the store already ran into while reading the configuration
      if ( configuration.loadProblem ) {
        problems.push(this.$t('dialog.loadProblem.' + configuration.loadProblem))
      }

      let config = configuration.config
      if ( !this.isValidConfig(config) ) {
        config = Default
        problems.push(this.$t('dialog.loadProblem.configInvalid'))
      }

      this.configuration = configuration

      // delete the old DOM tree
      this.map.reset()

      // setup the center element
      const data = this.resolveComponentModel(config.center.type, config.center.uuid) || this.resolveDefaultBattery(problems)
      this.map.setModel(data)
      this.map.model.operationHours = 24
      if ( config.center.customData ) {
        this.map.setCustomData(config.center.customData)
      }
      this.createComponents(this.map, config.left, true, problems)
      this.createComponents(this.map, config.right, false, problems)

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
        // Set tooltips after all components are loaded
        this.setTooltips()
      })
      this.$emit("configLoaded")

      this.reportLoadProblems(problems)
    },

    /**
     * Check that a configuration provides the parts the map is built from.
     */
    isValidConfig (config) {
      return !!config &&
        typeof config === "object" &&
        !!config.center &&
        typeof config.center === "object" &&
        Array.isArray(config.left) &&
        Array.isArray(config.right)
    },

    /**
     * Look up a component in the store. Returns "null" for unknown component types as well as
     * for components which are not part of the component database (anymore).
     */
    resolveComponentModel (type, uuid) {
      if ( typeof type !== "string" || type.length === 0 ) {
        return null
      }
      const getByUuid = this.$store.getters[type + "/getByUuid"]
      if ( typeof getByUuid !== "function" ) {
        return null
      }
      return getByUuid(uuid) || null
    },

    /**
     * Fallback for a configuration whose battery doesn't exist anymore. Without a center
     * element the map can't be rendered at all, so we always have to provide one.
     */
    resolveDefaultBattery (problems) {
      problems.push(this.$t('dialog.loadProblem.unknownBattery'))

      const fallback = this.resolveComponentModel(Default.center.type, Default.center.uuid)
      if ( fallback ) {
        return fallback
      }
      const accus = this.$store.state.accu.components
      return accus.find(accu => accu.uuid !== "custom") || accus[0]
    },

    /**
     * Human readable name of a component type, used in the messages for the user.
     */
    componentTypeName (type) {
      const key = 'component.name.' + type
      const name = this.$t(key)
      return name === key ? String(type) : name
    },

    /**
     * Build one side of the map below the given host.
     *
     * @param {Boolean} leftSide "true" for the producer side (left of the battery),
     *                           "false" for the consumer side (right of the battery).
     *                           That flag is the only thing both sides differ in, so the
     *                           handling of components which can't be resolved lives here once.
     */
    createComponents (parentComponentHost, childComponents, leftSide, problems) {
      if ( !Array.isArray(childComponents) ) {
        return
      }

      childComponents.forEach(componentRef => {
        if ( !componentRef || typeof componentRef !== "object" ) {
          return
        }

        const data = this.resolveComponentModel(componentRef.type, componentRef.uuid)
        const node = NodeFactory.createNode(leftSide, data)
        if ( node === null ) {
          // The component is gone. Skip it together with its children - they hang below a
          // component which no longer exists and can't be placed anywhere sensible.
          problems.push(this.$t('dialog.loadProblem.unknownComponent', { component: this.componentTypeName(componentRef.type) }))
          return
        }

        node.model.operationHours = componentRef.operationHours
        node.model.operationHours ||= 24

        node.model.wireLength = componentRef.wireLength
        node.model.wireLength ||= 100 // cm

        if ( componentRef.customData ) {
          node.setCustomData(componentRef.customData)
        }

        parentComponentHost.addNode(node)
        this.createComponents(node, componentRef.children, leftSide, problems)
      })
    },

    /**
     * Tell the user - once and in plain language - what could not be restored.
     */
    reportLoadProblems (problems) {
      const messages = problems.filter((message, index) => problems.indexOf(message) === index)
      if ( messages.length === 0 ) {
        return
      }

      this.$nextTick(() => {
        this.$refs.notificationDialog && this.$refs.notificationDialog.show({
          title: this.$t('dialog.loadProblem.title'),
          subtitle: this.$t('dialog.loadProblem.subtitle'),
          hint: this.$t('dialog.loadProblem.hint'),
          messages: messages,
          severity: "warning"
        })
      })
    },

    async handleNodeAddChild (event) {
      const node = event.component
      const candidateTypes = event.candidates
      const { type, uuid } = await this.$refs.addChildDialog.show(candidateTypes)
      if (uuid) {
        const data = this.resolveComponentModel(type, uuid)
        const child = NodeFactory.createNode(event.leftSide, data)
        if (child === null) {
          this.reportLoadProblems([this.$t('dialog.loadProblem.unknownComponent', { component: this.componentTypeName(type) })])
          return
        }
        node.addNode(child)
        this.saveConfig()
        // Set tooltips for the newly added component
        this.$nextTick(() => {
          this.setTooltips()
        })
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
        const model = this.resolveComponentModel(node.type, uuid)
        if (model === null) {
          this.reportLoadProblems([this.$t('dialog.loadProblem.unknownComponent', { component: this.componentTypeName(node.type) })])
          return
        }
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
        const model = this.resolveComponentModel(node.type, "custom")
        if ( model === null ) {
          // no "custom" template for this type - keep the component untouched
          return
        }
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
      if ( this.configuration?.id !== "user") {
        this.$router.push({ path: '/map/user' })
      }
    },

    setTooltips() {
      // Set tooltips for all toolbar icons
      $(this.map.gaugeIcon).attr('title', this.$t('tooltip.energyBalance'))
      $(this.map.configIcon).attr('title', this.$t('tooltip.exchangeComponent'))
      
      // Set tooltips for all child nodes
      const setNodeTooltips = (node) => {
        if (node.gaugeIcon) {
          $(node.gaugeIcon).attr('title', this.$t('tooltip.energyBalance'))
        }
        if (node.configIcon) {
          $(node.configIcon).attr('title', this.$t('tooltip.exchangeComponent'))
        }
        if (node.deleteIcon) {
          $(node.deleteIcon).attr('title', this.$t('tooltip.removeComponent'))
        }
        
        // Recursively set tooltips for children
        if (node.children) {
          node.children.forEach(child => setNodeTooltips(child))
        }
      }
      
      // Set tooltips for left and right children
      this.map.leftChildren.forEach(child => setNodeTooltips(child))
      this.map.rightChildren.forEach(child => setNodeTooltips(child))
    },

    getName() {
      return this.configuration?.name || ""
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
        .node_line_visible {
          transition: filter 120ms ease-out;
        }
        // the wide transparent path underneath catches the pointer, so a 3px line
        // is still comfortable to hit
        &:hover .node_line_visible {
          filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.55));
        }
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
          height: 40px;
          border-bottom: 1px solid lightgray;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 8px;
          .toolbar_icon{
            font-size: 22px;
            padding: 4px 6px;
            cursor: pointer;
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.04);
            color: rgba(0, 0, 0, 0.54);
            transition: all 0.2s ease;
            &:hover {
              background-color: #d9dff2;
              color: rgba(0, 0, 0, 0.87);
              transform: scale(1.05);
            }
          }
          .toolbar_spacer {
            flex: 1;
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
