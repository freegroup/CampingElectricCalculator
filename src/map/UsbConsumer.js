import Node from './Node'

export default class UsbConsumer extends Node {
  constructor() {
    super()
  }

  getChildCandidates () {
    return [] 
  }

  calculateOutputData () {
    return null
  }
}
