import Node from './Node'

export default class StarterBooster extends Node {
  constructor() {
    super()
    this.leftSide = true
  }

  getChildCandidates () {
    return [] 
  }

  calculateInputData () {
    return null
  }
}
