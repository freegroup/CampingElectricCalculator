import Vue from 'vue'
import Vuex from 'vuex'

import alternator from './Alternator'
import usb from './Usb'
import usbConsumer from './UsbConsumer'
import fridge from './Fridge'
import fuse from './Fuse'
import fuseBox from './FuseBox'
import accu from './Accu'
import killSwitch from './KillSwitch'
import shoreBooster from './ShoreBooster'
import solarBooster from './SolarBooster'
import starterBooster from './StarterBooster'
import starterAccu from './StarterAccu'
import solarPanel from './SolarPanel'
import light from './Light'
import pressurePump from './PressurePump'
import configuration from './Configuration'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alternator,
    usb,
    usbConsumer,
    fridge,
    fuse,
    fuseBox,
    light,
    accu,
    pressurePump,
    shoreBooster,
    solarBooster,
    starterBooster,
    killSwitch,
    starterAccu,
    solarPanel,
    configuration
  }
})
