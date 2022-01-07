import Node from './Node'

export default class StarterBooster extends Node {
  constructor() {
    super()
    this.leftSide = true
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
}
