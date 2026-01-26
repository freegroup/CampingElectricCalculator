import LeftNode from './LeftNode'
import errorMessages from '@/utils/ErrorMessages.js'

export default class LeftKillSwitch extends LeftNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["fuse", "shoreBooster", "solarSet", "solarBooster", "starterBooster", "starterAccu"] 
  }

  getErrorMessages () {
    const result = []

    // if more than one child exists, each of them must have the same "spannung". It is not allowed 
    // to mix up the voltage
    //
    if ( this.children.length > 1 ) {
      // all direct children must have the same voltage
      //
      const firstSpannung = this.children[0].calculateOutputData().spannung
      if ( this.children.find( child => child.calculateOutputData().spannung !== firstSpannung) ) {
        result.push({ 
          type: "Error", 
          text: errorMessages.t('mixedVoltagesNotAllowed', {
            component: 'switch'
          })
        })
      }

      this.children.forEach( child => {
        const data = child.calculateOutputData().spannung
        if ( data.spannung > this.model.data.spannung ) {
          result.push({ 
            type: "Error", 
            text: errorMessages.t('childVoltageNotSupported', {
              actual: data.spannung,
              max: this.model.data.spannung
            })
          })
        }
      })
    }
    
    // Calculate if the accumulated "strom"
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
      if ( data.strom > this.model.data.strom ) {
        result.push({ 
          type: "Error", 
          text: errorMessages.t('currentTooHigh', {
            component: 'switch',
            actual: parseInt(data.strom),
            max: this.model.data.strom
          })
        })
      }
    }
    return result
  }

  calculateInputData () {
    const result = { strom: 0, spannung: 0, watt: 0, amperestunden: 0 }
    if ( this.children.length > 0 ) {
      let childData = this.children[0].calculateOutputData()
      // check that the attributes "strom" and "spannung" are in place
      result.strom = childData.strom
      result.spannung = childData.spannung
      result.amperestunden = childData.amperestunden
      this.children.slice(1).forEach( child => {
        childData = child.calculateOutputData()
        result.strom += childData.strom 
        result.amperestunden += childData.amperestunden 
      })
    }
    result.watt = result.strom * result.spannung
    return result
  }

  calculateOutputData () {
    return this.calculateInputData()
  }
}
