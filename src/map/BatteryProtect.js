import RightNode from './RightNode'

export default class BatteryProtect extends RightNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["killSwitch", "fuse", "fuseBox", "dcdcBooster"] 
  }

  getErrorMessages () {
    const result = []

    // In case one parent is a fuse, it must have a lower "ampere" than this device.
    // If not, this device is burned before the fuse can protect the circuit
    //
    const amp = this.getFuseAmp()
    if ( amp === undefined || amp > this.model.data.strom ) {
      result.push( { type: "Error", text: `Battery Protection with a maximum currents of <b>[${this.model.data.strom} A]</b> is breaking before the used fuse with <b>[${amp} A]</b> can protect the circuit. Choose a fuse with a lower amperage value.` } )
    }

    if ( this.parent ) {
      // Spannungen müssen passen
      if ( this.model.data.spannung !== this.parent.getBaseVoltage() ) {
        result.push({ type: "Error", text: `The battery protection unit with <b>[${this.model.data.spannung} V]</b> do not support the used battery voltage of <b>[${this.parent.getBaseVoltage()} V]</b>.` })
      }      
    }
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
    
    // Berechnen den tatsächlichen Strom der Consumenten
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
        result.push({ type: "Error", text: `The power <b>[${parseInt(data.strom)} A]</b> of the input sources are bigger than the maximum power which the battery protect can handle <b>[${this.model.data.strom}]</b>` })
      }
    }

    // Berechnen den maximal möglichen Strom laut spezifikation
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
        result.push({ type: "Warning", text: `All theoretically possible currents <b>[${parseInt(data.strom)} A]</b> of all consumers are bigger than the maximum power which the battery protection can handle <b>[${this.model.data.strom} A]</b>. Ensure that you have a correct fuse in place to avoid a burnout of this device.` })
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
