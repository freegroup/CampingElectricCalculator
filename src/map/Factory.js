import Alternator from "./Alternator.js"
import Fridge from "./Fridge.js"
import SolarPanel from "./SolarPanel.js"
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
      case "alternator":
        node = new Alternator()     
        break
      case "starterBooster":
        node = new StarterBooster()     
        break
      case "starterAccu":
        node = new StarterAccu()     
        break
      case "solarBooster":
        node = new SolarBooster()    
        break 
      case "fuse":
        if ( leftSide ) {
          node = new LeftFuse()  
        } else {
          node = new RightFuse()
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
