import RightNode from './RightNode'

export default class RightKillSwitch extends RightNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    if ( this.mindmap && this.mindmap.model.data.bms !== "internal") {
      return ["batteryProtect", "fuse", "fuseBox"] 
    }
    
    return ["fuse", "fuseBox"] 
  }

  getErrorMessages () {
    const result = []

    // if more than one child exists, each of them must have the same "spannung". It is not allowed 
    // to mix up the voltage
    //
    if ( this.children.length > 1 ) {
      // all direct children must have the same voltage
      //
      const firstSpannung = this.children[0].calculateOutputData().spannung
      if ( this.children.find( child => child.calculateOutputData().spannung !== firstSpannung) ) {
        result.push({ type: "Error", text: `It is not allowed to mix different voltages on the switch.` })
      }
    }
    
    // Calculate if the accumulated "strom"
    //
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateOutputData()
      // skip the first element, because we have already the data of the first element in charge
      // ( slice(1) )
      this.children.slice(1).forEach( child => {
        data.strom += child.calculateOutputData().strom 
      })
      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      if ( data.strom > this.model.data.strom ) {
        result.push({ type: "Warning", text: `All theoretically possible currents <b>[${parseInt(data.strom)}A]</b> of all consumers are bigger than the maximum power which the battery protection can handle <b>[${this.model.data.strom}A]</b>. Ensure that you have a correct fuse in place to avoid a burnout of this device.` })
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
