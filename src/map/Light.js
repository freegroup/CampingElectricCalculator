import RightNode from './RightNode'

export default class Light extends RightNode {
  constructor() {
    super()
    this.timerBased = true
  }

  getChildCandidates () {
    return [] 
  }

  calculateConsumptionData () {
    return { 
      strom: this.model.data.strom, 
      spannung: this.model.data.spannung, 
      watt: this.model.data.watt, 
      amperestunden: this.model.data.strom * this.model.operationHours 
    }
  }
}
