import SolarPanel from "./SolarPanel.js"
import SolarBooster from "./SolarBooster.js"
import StarterBooster from "./StarterBooster.js"
import FuseBox from "./FuseBox.js"
import Fuse from "./Fuse.js"

export default class NodeFactory {
  static createNode (leftSide, model) {
    let node = null  
    switch (model.type) {
      case "starterBooster":
        node = new StarterBooster(model)     
        break
      case "solarBooster":
        node = new SolarBooster(model)    
        break 
      case "fuse":
        node = new Fuse(model)     
        break
      case "fuseBox":
        node = new FuseBox(model)     
        break
      case "solarPanel":
        node = new SolarPanel(model)
        break
    } 
    node.setLeftSide(leftSide)
    node.setModel(model)
    return node
  }
}
