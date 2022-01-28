import RightNode from './RightNode'

export default class Usb extends RightNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["usbConsumer"] 
  }

  getBaseVoltage () {
    return 5
  }

  setParent(parent) {
    super.setParent(parent)
    // strom anhand der verwendet Eingangsspannung berechnen. Der Strom in model.data gibt ja nur an
    // wie viel Strom der Anschluß bei 5V bereitstellen kann. Er gibt gibt nicht an wie viel Strom das
    // Teil selber zieht.
    // Da das model eine "deep copy" ist, können wir die Daten direkt verändern
    //
    this.model.data.strom = ( (this.model.data.strom_je_buchse * this.model.data.buchsen) * this.getBaseVoltage() ) / parent?.getBaseVoltage()
  }

  getErrorMessages () {
    const result = []

    // Calculate if the accumulated "operationHours". Must be less than 24 hours
    //
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateConsumptionData()
      // skip the first element, because we have already the data of the first element in charge
      // ( slice(1) )
      this.children.slice(1).forEach( child => {
        data.operationHours += child.calculateConsumptionData().operationHours 
      })
      // the "operationHours" divided by the socket count must be less than 24 hours
      //
      if ( (data.operationHours / this.model.data.buchsen) > 24 ) {
        if ( this.model.data.buchse > 1 ) {
          result.push({ type: "Warning", text: `The USB ports are occupied more than 24 hours a day. Install an additional socket.` })
        } else {
          result.push({ type: "Warning", text: `The USB port is occupied more than 24 hours a day. Install an additional socket.` })
        }
      }
    }

    if ( this.parent ) {
      // Spannungen müssen passen
      const base = this.parent.getBaseVoltage()
      if ( this.model.data.spannung_min > base || this.model.data.spannung_max < base ) {
        if ( this.model.data.spannung_min !== this.model.data.spannung_max ) {
          result.push({ type: "Error", text: `The USB unit requires a supply voltage of <b>[${this.model.data.spannung_min}-${this.model.data.spannung_max} V]</b>. Input voltage of <b>[${this.parent.getBaseVoltage()} V]</b> is not supported.` })
        } else {
          result.push({ type: "Error", text: `The USB unit requires a supply voltage of <b>[${this.model.data.spannung_min} V]</b>. Input voltage of <b>[${this.parent.getBaseVoltage()} V]</b> is not supported.` })
        }
      }            
    }
 
    return result
  }

  calculateConsumptionData () {
    // the car socket uses the voltage provided by the parent (getBaseVoltage)
    // ...even if this component breaks. Check the warnings in the UI
    const result = { strom: 0, spannung: this.parent?.getBaseVoltage(), watt: 0, amperestunden: 0, operationHours: 0 }
    if ( this.children.length > 0 ) {
      result.strom = this.model.data.strom
      result.operationHours = this.children[0].calculateConsumptionData().operationHours
     
      this.children.slice(1).forEach( child => {
        result.operationHours += child.calculateConsumptionData().operationHours
      })
    }
    result.amperestunden = result.strom * result.operationHours
    result.watt = result.strom * this.getBaseVoltage() // USB is 5Volt only as output In this case we must calculate with 5Volt

    return result
  }
}
