import Node from './Node'

export default class FuseBox extends Node {
  constructor() {
    super()
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

  calculateOutputData () {
    const result = { strom: 0, spannung: 0 }
    if ( this.children.length > 0 ) {
      let childData = this.children[0].calculateOutputData()
      // check that the attributes "strom" and "spannung" are in place
      if ("strom" in childData && "spannung" in childData) {
        result.strom = childData.strom
        result.spannung = childData.spannung

        this.children.slice(1).forEach( child => {
          childData = child.calculateOutputData()
          if ( "strom" in childData ) {
            result.strom += childData.strom 
          }
        })
      }
    }

    return result
  }
}
