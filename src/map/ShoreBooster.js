import LeftNode from './LeftNode'
import errorMessages from '@/utils/ErrorMessages.js'

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
        result.push({ 
          type: "Error", 
          text: errorMessages.t('chargerVoltageNotSupported', {
            chargerVoltage: this.model.data.spannung,
            batteryVoltage: this.parent.getBaseVoltage()
          })
        })
      }
    }
     
    if ( this.mindmap ) {
      // ladekurve muß mit dem Batterietype zusammenpassen
      //
      if ( !this.model.data.chargeSupport.includes(this.mindmap.model.data.type) ) {
        result.push({ 
          type: "Error", 
          text: errorMessages.t('batteryTypeNotSupported', {
            actual: this.mindmap.model.data.type,
            supported: this.model.data.chargeSupport.join(", ")
          })
        })
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
