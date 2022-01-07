import Node from './Node'

export default class Fridge extends Node {
  constructor() {
    super()
    this.leftSide = false
  }

  getChildCandidates () {
    return [] 
  }

  calculateConsumptionData () {
    return { strom: this.model.data.strom, spannung: this.model.data.spannung, watt: this.model.data.watt }
  }
}
