import RightNode from './RightNode'

export default class Usb extends RightNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["usbConsumer", "cooler"] 
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

    return result
  }

  calculateConsumptionData () {
    const result = { strom: 0, spannung: this.model.data.spannung, watt: 0, amperestunden: 0, operationHours: 0 }
    if ( this.children.length > 0 ) {
      // Der Konsumer kann nur so viel Strom verbrauchen wie die Dose ihm zur verfügung stellen kann
      //
      result.strom = this.model.data.strom
      result.operationHours = this.children[0].calculateConsumptionData().operationHours
     
      this.children.slice(1).forEach( child => {
        result.operationHours += child.calculateConsumptionData().operationHours
      })
    }
    result.amperestunden = result.strom * result.operationHours
    result.watt = result.strom * 5 // USB is 5Volt only as output In this case we must calculate with 5Volt
    return result
  }
}
