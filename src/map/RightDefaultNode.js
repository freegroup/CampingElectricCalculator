import RightNode from './RightNode'

export default class RightDefaultNode extends RightNode {
  constructor() {
    super()
  }

  getHTMLElement() {
    if (this.html === null) {
      this.html = document.createElement('table')
      this.html.className = 'child_node'

      const row = this.html.insertRow()
      {
        // LABEL or the Node itself
        // ===============================
        this.leftLabel = row.insertCell()
        {
          this.leftLabel.className = 'consumer_placeholder'
          this.labelContainer = document.createElement('div')
          this.leftLabel.append(this.labelContainer)
        }
      }
    }
    return this.html
  }

  renderModel () {
  }

  /**
   * Draw all required lines to the children nodes.<br>
   * Called by the framework.
   *
   * */
  drawLines () {
  }
}
