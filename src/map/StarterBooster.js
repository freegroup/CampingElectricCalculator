import LeftNode from './LeftNode'

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
        result.push({ type: "Error", text: `The charger do not support the used accu type (${this.mindmap.model.data.type}). Supported accu types are [${this.model.data.chargeSupport}]` })
      }
    }

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
    delete data.eingangsspannung
    delete data.eingangsstrom

    // the booster can't deliver more than the possible input 
    // power
    data.strom = Math.min(data.strom, input.strom)

    data.amperestunden = data.strom * this.model.operationHours
    return data
  }
}
