import LeftNode from './LeftNode'
import errorMessages from '@/utils/ErrorMessages.js'

export default class StarterBooster extends LeftNode {
  constructor() {
    super()
    this.timerBased = true
  }

  getChildCandidates () {
    return ["starterAccu", "alternator"] 
  }

  getErrorMessages () {
    const result = []

    if ( this.mindmap ) {
      // the "leerlaufspannung" must be smaller than the max input of the charger
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

      if ( this.model.data.spannung !== this.mindmap.getBaseVoltage()) {
        result.push({ 
          type: "Error", 
          text: errorMessages.t('chargerVoltageNotSupported', {
            chargerVoltage: this.model.data.spannung,
            batteryVoltage: this.parent.getBaseVoltage()
          })
        })
      }
    }

    this.children.forEach( child => {
      if ( child.model.data.spannung > this.model.data.eingangsspannung_max || child.model.data.spannung < this.model.data.eingangsspannung_min ) {
        result.push({ 
          type: "Error", 
          text: errorMessages.t('inputVoltageOutOfRange', {
            min: this.model.data.eingangsspannung_min,
            max: this.model.data.eingangsspannung_max,
            actual: child.model.data.spannung
          })
        })
      }
    })
    return result
  }

  calculateInputData () {
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateOutputData()
      this.children.slice(1).forEach( child => {
        data.strom += child.calculateOutputData().strom 
        data.watt += child.calculateOutputData().watt 
      })
      return data
    }

    return { strom: 0, watt: 0 }
  }

  calculateOutputData () {
    const input = this.calculateInputData()
    const data = JSON.parse(JSON.stringify(this.model.data)) // deep copy
    delete data.eingangsspannung_min
    delete data.eingangsspannung_max
    delete data.eingangsstrom

    data.spannung = this.mindmap?.getMaxChargeVoltage()
    // the booster can't deliver more than the possible input 
    // power
    data.strom = Math.min(data.strom, input.strom)

    data.amperestunden = data.strom * this.model.operationHours
    return data
  }
}
