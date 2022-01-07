import RightNode from './RightNode'

export default class PressurePump extends RightNode {
  constructor() {
    super()
    this.timerBased = true
  }

  getChildCandidates () {
    return [] 
  }
}
