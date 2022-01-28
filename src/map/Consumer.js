import RightNode from './RightNode'

export default class Consumer extends RightNode {
  constructor() {
    super()
    this.timerBased = true
  }

  getChildCandidates () {
    return [] 
  }
  
  getErrorMessages () {
    const result = []

    if ( this.parent ) {
      // Spannungen müssen passen
      if ( this.model.data.spannung !== this.parent.getBaseVoltage() ) {
        result.push({ type: "Error", text: `This component requires supply voltage of <b>[${this.model.data.spannung} V]</b>. Input voltage of <b>[${this.parent.getBaseVoltage()} V]</b> is not supported.` })
      }            
    }
 
    return result
  }

  calculateConsumptionData () {
    return { 
      strom: this.model.data.strom, 
      spannung: this.model.data.spannung,
      operationHours: this.model.operationHours,
      amperestunden: this.model.data.strom * this.model.operationHours
    }
  }
}
