import LeftNode from './LeftNode'

export default class StarterBooster extends LeftNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["starterAccu", "alternator"] 
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
    const data = JSON.parse(JSON.stringify(this.model.data)) // deep copy
    delete data.eingangsspannung
    delete data.eingangsstrom

    return data
  }
}
