import Vue from 'vue'
import Vuex from 'vuex'

import fuse from './Fuse'
import accu from './Accu'
import solarBooster from './SolarBooster'
import starterBooster from './StarterBooster'
import solarPanel from './SolarPanel'
import configuration from './Configuration'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fuse,
    accu,
    solarBooster,
    starterBooster,
    solarPanel,
    configuration
  }
})
