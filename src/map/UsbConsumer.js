import Node from './Node'

export default class UsbConsumer extends Node {
  constructor() {
    super()
    this.leftSide = false
  }

  getChildCandidates () {
    return [] 
  }

  calculateOutputData () {
    return null
  }
  
  calculateConsumptionData () {
    return { strom: this.model.data.strom, spannung: this.model.data.spannung, watt: this.model.data.watt }
  }
}
