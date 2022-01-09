import LeftNode from './LeftNode'

export default class LeftDefaultNode extends LeftNode {
  constructor() {
    super()
  }

  getHTMLElement() {
    if (this.html === null) {
      this.html = document.createElement('table')
      this.html.className = 'child_node'

      const row = this.html.insertRow()
      {
        // FILLER
        // ===============================
        this.leftFiller = row.insertCell()
        {
          this.leftFiller.className = 'filler'
          this.leftFiller.innerHTML = '&nbsp;'
        }
        // LABEL or the Node itself
        // ===============================
        this.leftLabel = row.insertCell()
        {
          this.leftLabel.className = 'producer_placeholder'

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
