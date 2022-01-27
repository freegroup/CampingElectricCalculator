import RightNode from './RightNode'

export default class Consumer extends RightNode {
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
      operationHours: this.model.operationHours,
      amperestunden: this.model.data.strom * this.model.operationHours
    }
  }
}
