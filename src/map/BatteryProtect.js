import RightNode from './RightNode'

export default class BatteryProtect extends RightNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["killSwitch", "fuse", "fuseBox"] 
  }

  getErrorMessages () {
    const result = []

    // In case one parent is a fuse, it must have a lower "ampere" than this device.
    // If not, this device is burned before the fuse can protect the circuit
    //
    const checkParent = node => {
      if ( node.parent && node.parent.model.type === "fuse") {
        if ( node.parent.model.data.strom > node.model.data.strom ) {
          result.push( { type: "Warning", text: `Battery Protection with a maximum load of ${this.model.data.strom}A is breaking before the used fuse with ${node.parent.model.data.strom}A can protect the circuit` } )
          return false
        }
        return true
      }
      if ( node.parent ) {
        return checkParent(node.parent)
      }
      return true
    }
    checkParent(this)

    // if more than one child exists, each of them must have the same "spannung". It is not allowed 
    // to mix up the voltage
    //
    if ( this.children.length > 1 ) {
      // all direct children must have the same voltage
      //
      const firstSpannung = this.children[0].calculateConsumptionData().spannung
      if ( this.children.find( child => child.calculateConsumptionData().spannung !== firstSpannung) ) {
        result.push({ type: "Error", text: `It is not allowed to mix different voltages on the fuse.` })
      }
    }
    
    // Calculate if the accumulated "strom"
    //
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateConsumptionData()
      // skip the first element, because we have already the data of the first element in charge
      // ( slice(1) )
      this.children.slice(1).forEach( child => {
        data.strom += child.calculateConsumptionData().strom 
      })
      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      if ( data.strom > this.model.data.strom ) {
        result.push({ type: "Error", text: `The power [I= ${data.strom} Ampere] of the input sources are bigger than the maximum power which the battery protect can handle (${this.model.data.strom} )` })
      }
    }
    return result
  }

  calculateConsumptionData () {
    const result = { strom: 0, spannung: this.model.data.spannung, watt: 0, amperestunden: 0 }
    if ( this.children.length > 0 ) {
      // check that the attributes "strom" and "spannung" are in place
      result.strom = this.children[0].calculateConsumptionData().strom
      result.amperestunden = this.children[0].calculateConsumptionData().amperestunden
      this.children.slice(1).forEach( child => {
        result.strom += child.calculateConsumptionData().strom 
        result.amperestunden += child.calculateConsumptionData().amperestunden 
      })
    }
    result.watt = (result.strom * result.spannung)
    return result
  }
}