import RightNode from './RightNode'
import errorMessages from '@/utils/ErrorMessages.js'

export default class BatteryProtect extends RightNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["killSwitch", "fuse", "fuseBox", "dcdcBooster"] 
  }

  getErrorMessages () {
    const result = []

    // In case one parent is a fuse, it must have a lower "ampere" than this device.
    // If not, this device is burned before the fuse can protect the circuit
    //
    /*
    const amp = this.getFuseAmp()
    if ( amp === undefined || amp > this.model.data.strom ) {
      result.push({ 
        type: "Error", 
        text: errorMessages.t('batteryProtectBreaksBeforeFuse', {
          protectCurrent: this.model.data.strom,
          fuseCurrent: amp
        })
      })
    }
    */

    if ( this.parent ) {
      // Spannungen müssen passen
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
    // if more than one child exists, each of them must have the same "spannung". It is not allowed 
    // to mix up the voltage
    //
    if ( this.children.length > 1 ) {
      // all direct children must have the same voltage
      //
      const firstSpannung = this.children[0].calculateConsumptionData().spannung
      if ( this.children.find( child => child.calculateConsumptionData().spannung !== firstSpannung) ) {
        result.push({ 
          type: "Error", 
          text: errorMessages.t('mixedVoltagesNotAllowed', {
            component: 'fuse'
          })
        })
      }
    }
    
    // Berechnen den tatsächlichen Strom der Consumenten
    //
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateConsumptionData()
      // skip the first element, because we have already the data of the first element in charge
      // ( slice(1) )
      this.children.slice(1).forEach( child => {
        data.strom += child.calculateConsumptionData().strom 
      })
      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      if ( data.strom > this.model.data.strom ) {
        result.push({ 
          type: "Error", 
          text: errorMessages.t('currentTooHigh', {
            component: 'battery protect',
            actual: parseInt(data.strom),
            max: this.model.data.strom
          })
        })
      }
    }

    // Berechnen den maximal möglichen Strom laut spezifikation
    //
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateOutputData()
      // skip the first element, because we have already the data of the first element in charge
      // ( slice(1) )
      this.children.slice(1).forEach( child => {
        data.strom += child.calculateOutputData().strom 
      })

      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      const fuseAmp = this.getFuseAmp()
      if ( fuseAmp ) {
        if ( fuseAmp > this.model.data.strom ) {
          result.push({ 
            type: "Warning", 
            text: errorMessages.t('batteryProtectCurrentWarning', {
              actual: parseInt(data.strom),
              max: this.model.data.strom
            })
          })
        }
      } else {
        if ( data.strom > this.model.data.strom ) {
          result.push({ 
            type: "Warning", 
            text: errorMessages.t('consumerCurrentWarning', {
              actual: parseInt(data.strom),
              max: this.model.data.strom
            })
          })
        }
      }
    }

    return result
  }

  calculateConsumptionData () {
    const result = { strom: 0, spannung: this.model.data.spannung, watt: 0, amperestunden: 0 }
    if ( this.children.length > 0 ) {
      // check that the attributes "strom" and "spannung" are in place
      result.strom = this.children[0].calculateConsumptionData().strom
      result.amperestunden = this.children[0].calculateConsumptionData().amperestunden
      this.children.slice(1).forEach( child => {
        result.strom += child.calculateConsumptionData().strom 
        result.amperestunden += child.calculateConsumptionData().amperestunden 
      })
    }
    result.watt = (result.strom * result.spannung)
    return result
  }
}
