import Node from './Node'

export default class FuseBox extends Node {
  constructor() {
    super()
    this.leftSide = false
  }

  getChildCandidates () {
    return ["pressurePump", "fridge", "usb"] 
  }

  getErrors () {
    const result = []

    // if more than one child exists, each of them must have the same "spannung". It is not allowed 
    // to mix up the voltage
    //
    if ( this.children.length > 1 ) {
      // all direct children must have the same voltage
      //
      const firstSpannung = this.children[0].calculateOutputData().spannung
      if ( this.children.find( child => child.calculateOutputData().spannung !== firstSpannung) ) {
        result.push(`It is not allowed to mix different voltages on the fuse.`)
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
        result.push(`The power [I= ${data.strom} Ampere] of the input sources are bigger than the maximum power which the fuse can handle (${this.model.data.strom} )`)
      }
    }

    return result
  }

  calculateConsumptionData () {
    const result = { strom: 0, spannung: this.model.data.spannung, watt: 0 }
    if ( this.children.length > 0 ) {
      // check that the attributes "strom" and "spannung" are in place
      result.strom = this.children[0].calculateConsumptionData().strom
      this.children.slice(1).forEach( child => {
        result.strom += child.calculateConsumptionData().strom 
      })
    }
    result.watt = (result.strom * result.spannung)
    return result
  }
}
