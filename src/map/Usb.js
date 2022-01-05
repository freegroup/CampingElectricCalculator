import Node from './Node'

export default class Usb extends Node {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["usbConsumer"] 
  }
}
