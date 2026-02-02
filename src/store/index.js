import Vue from 'vue'
import Vuex from 'vuex'

import alternator from './Alternator'
import usb from './Usb'
import usbConsumer from './UsbConsumer'
import fridge from './Fridge'
import cooler from './Cooler'
import fuse from './Fuse'
import fuseBox from './FuseBox'
import heater from './Heater'
import accu from './Accu'
import killSwitch from './KillSwitch'
import shoreBooster from './ShoreBooster'
import solarBooster from './SolarBooster'
import starterBooster from './StarterBooster'
import starterAccu from './StarterAccu'
import solarPanel from './SolarPanel'
import solarSet from './SolarSet'
import batteryProtect from './BatteryProtect'
import carSocket from './CarSocket'
import carSocketCharger from './CarSocketCharger'
import light from './Light'
import switchPanel from './SwitchPanel'
import pressurePump from './PressurePump'
import dcdcBooster from './DCDCBooster'
import profile from './Profile'
import auth from './Auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alternator,
    usb,
    carSocket,
    carSocketCharger,
    usbConsumer,
    fridge,
    cooler,
    heater,
    switchPanel,
    fuse,
    fuseBox,
    light,
    accu,
    batteryProtect,
    pressurePump,
    shoreBooster,
    solarBooster,
    dcdcBooster,
    solarSet,
    starterBooster,
    killSwitch,
    starterAccu,
    solarPanel,
    profile,
    auth
  }
})
