import RightNode from './RightNode'

export default class CarSocketCharger extends RightNode {
  constructor() {
    super()
    this.timerBased = true
  }

  getChildCandidates () {
    return ["usbConsumer"] 
  }

  calculateConsumptionData () {
    const result = { strom: 0, spannung: this.parent?.getBaseVoltage(), watt: 0, amperestunden: 0 }
    result.strom = this.model.data.strom
    result.watt = this.model.data.watt
    result.amperestunden = (result.strom * this.model.operationHours)
    return result
  }
}
