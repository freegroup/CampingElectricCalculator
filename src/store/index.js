import Vue from 'vue'
import Vuex from 'vuex'

import alternator from './Alternator'
import usb from './Usb'
import fridge from './Fridge'
import fuse from './Fuse'
import fuseBox from './FuseBox'
import accu from './Accu'
import solarBooster from './SolarBooster'
import starterBooster from './StarterBooster'
import starterAccu from './StarterAccu'
import solarPanel from './SolarPanel'
import configuration from './Configuration'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alternator,
    usb,
    fridge,
    fuse,
    fuseBox,
    accu,
    solarBooster,
    starterBooster,
    starterAccu,
    solarPanel,
    configuration
  }
})
