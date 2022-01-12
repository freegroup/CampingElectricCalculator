import Alternator from "./Alternator.js"
import LeftKillSwitch from "./LeftKillSwitch.js"
import RightKillSwitch from "./RightKillSwitch.js"
import Light from "./Light.js"
import Fridge from "./Fridge.js"
import BatteryProtect from "./BatteryProtect.js"
import SolarPanel from "./SolarPanel.js"
import SolarSet from "./SolarSet.js"
import ShoreBooster from "./ShoreBooster.js"
import SolarBooster from "./SolarBooster.js"
import StarterAccu from "./StarterAccu.js"
import StarterBooster from "./StarterBooster.js"
import RightFuseBox from "./RightFuseBox.js"
import PressurePump from "./PressurePump.js"
import Usb from "./Usb.js"
import UsbConsumer from "./UsbConsumer.js"
import LeftFuse from "./LeftFuse.js"
import RightFuse from "./RightFuse.js"

export default class NodeFactory {
  static createNode (leftSide, model) {
    let node = null  
    switch (model.type) {
      case "usbConsumer":
        node = new UsbConsumer()     
        break
      case "pressurePump":
        node = new PressurePump()     
        break
      case "usb":
        node = new Usb()     
        break
      case "fridge":
        node = new Fridge()     
        break
      case "batteryProtect":
        node = new BatteryProtect()     
        break
      case "alternator":
        node = new Alternator()     
        break
      case "starterBooster":
        node = new StarterBooster()     
        break
      case "shoreBooster":
        node = new ShoreBooster()     
        break
      case "light":
        node = new Light()     
        break
      case "starterAccu":
        node = new StarterAccu()     
        break
      case "solarBooster":
        node = new SolarBooster()    
        break 
      case "solarSet":
        node = new SolarSet()    
        break 
      case "fuse":
        if ( leftSide ) {
          node = new LeftFuse()  
        } else {
          node = new RightFuse()
        }   
        break
      case "killSwitch":
        if ( leftSide ) {
          node = new LeftKillSwitch()  
        } else {
          node = new RightKillSwitch()
        }   
        break
      case "fuseBox":
        node = new RightFuseBox()
        break
      case "solarPanel":
        node = new SolarPanel()
        break
    }
    node.setModel(model)
    return node
  }
}
