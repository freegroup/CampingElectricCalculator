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

    if ( this.mindmap ) {
      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      if ( !this.model.data.chargeSupport.includes(this.mindmap.model.data.type) ) {
        result.push({ type: "Error", text: `The charger do not support the used accu type (${this.mindmap.model.data.type}). Supported accu types are [${this.model.data.chargeSupport}]` })
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
    
    data.amperestunden = data.strom * this.model.operationHours
    return data
  }
}
