import Node from './Node'

export default class StarterAccu extends Node {
  constructor() {
    super()
    this.leftSide = true
  }

  getChildCandidates () {
    return ["alternator"] 
  }
}
