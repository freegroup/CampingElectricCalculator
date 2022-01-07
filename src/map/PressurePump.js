import Node from './Node'

export default class PressurePump extends Node {
  constructor() {
    super()
    this.leftSide = false
  }

  getChildCandidates () {
    return [] 
  }
}
