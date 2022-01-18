import RightNode from './RightNode'

export default class SwitchPanel extends RightNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["fuseBox", "pressurePump", "fridge", "usb", "light", "heater", "carSocket"] 
  }

  getErrorMessages () {
    const result = []

    // if more than one child exists, each of them must have the same "spannung". It is not allowed 
    // to mix up the voltage
    //
    if ( this.children.length > 1 ) {
      // all direct children must have the same voltage
      //
      const firstSpannung = this.children[0].calculateConsumptionData().spannung
      if ( this.children.find( child => child.calculateConsumptionData().spannung !== firstSpannung) ) {
        result.push({ type: "Error", text: `It is not allowed to mix different voltages on the switch panel` })
      }
    }
    
    // calculate if each consumer is less than a switch can handle
    //

    this.children.forEach( child => {
      const data = child.calculateConsumptionData()
      if (data.strom > this.model.data.strom_je_anschluss ) {
        result.push({ type: "Error", text: `The currents <b>[${parseInt(data.strom)}A]</b> of the input consumer is bigger than the power switch can handle <b>[${this.model.data.ststrom_je_anschlussrom}A]</b>` })
      }
    })

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
