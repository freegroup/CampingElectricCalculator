import Node from './Node'

export default class StarterAccu extends Node {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["alternator"] 
  }

  calculateCircuitData () {
    // It is only allowed, that this element has ONE direct child element
    //
    const result = JSON.parse(JSON.stringify(this.model.data)) // deep copy

    return result
  }
}
