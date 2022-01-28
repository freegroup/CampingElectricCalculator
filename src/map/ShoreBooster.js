import LeftNode from './LeftNode'

export default class ShoreBooster extends LeftNode {
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
      // Ladespannungen müssen passen
      if ( this.model.data.spannung !== this.parent.getBaseVoltage() ) {
        result.push({ type: "Error", text: `The charger with <b>[${this.model.data.spannung} V]</b> do not support the used battery voltage of <b>[${this.parent.getBaseVoltage()} V]</b>.` })
      }
    }
     
    if ( this.mindmap ) {
      // ladekurve muß mit dem Batterietype zusammenpassen
      //
      if ( !this.model.data.chargeSupport.includes(this.mindmap.model.data.type) ) {
        result.push({ type: "Error", text: `The charger do not support the used battery type <b>${this.mindmap.model.data.type}</b>. Supported battery types are <b>${this.model.data.chargeSupport.join(", ")}</b>` })
      }
    }

    return result
  }

  calculateInputData () {
    return { spannung: 230 }
  }

  calculateOutputData () {
    const data = JSON.parse(JSON.stringify(this.model.data)) // deep copy
    delete data.eingangsspannung
    data.spannung = this.mindmap?.getMaxChargeVoltage()
    data.amperestunden = data.strom * this.model.operationHours
    return data
  }
}
