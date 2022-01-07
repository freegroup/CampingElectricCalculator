import RightNode from './RightNode'

export default class UsbConsumer extends RightNode {
  constructor() {
    super()
    this.timerBased = true
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
