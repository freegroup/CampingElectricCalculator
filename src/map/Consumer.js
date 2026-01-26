import RightNode from './RightNode'
import errorMessages from '@/utils/ErrorMessages.js'

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
        result.push({ 
          type: "Error", 
          text: errorMessages.t('voltageNotSupported', {
            component: 'component',
            required: this.model.data.spannung,
            actual: this.parent.getBaseVoltage()
          })
        })
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
