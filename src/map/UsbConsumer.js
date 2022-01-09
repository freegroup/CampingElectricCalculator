import RightNode from './RightNode'

export default class UsbConsumer extends RightNode {
  constructor() {
    super()
    this.timerBased = true
  }

  getChildCandidates () {
    return [] 
  }

  getErrorMessages () {
    const result = []

    // Calculate if the accumulated "operationHours". Must be less than 24 hours
    //
    if ( this.parent ) {
      const strom = this.parent.model.data.strom
      
      // the "operationHours" divided by the socket count must be less than 24 hours
      //
      if ( strom < this.model.data.strom ) {
        switch (this.model.runningMode ) {
          case "loading":
            result.push({ type: "Warning", text: `Device can only be charged at a slower rate, as the power outlet supplies less power ( ${strom} A ) than the device could use at maximum ( ${this.model.data.strom} A / ${this.model.data.watt} Watt).` })
            break
          default:
            result.push({ type: "Error", text: `Device cannot be operated from the USB socket. Power socket supplies too little current.` })
        }
      }
    }

    return result
  }

  calculateOutputData () {
    return null
  }

  calculateConsumptionData () {
    return { 
      strom: this.model.data.strom, 
      spannung: this.model.data.spannung, 
      watt: this.model.data.watt,
      operationHours: this.model.operationHours,
      amperestunden: this.model.data.strom * this.model.operationHours
    }
  }
}
