import $ from 'jquery'
import { v4 as uuidv4 } from 'uuid'
import Node from './Node'
import { createCanvas } from './utils'

export default class LeftNode extends Node {
  constructor() {
    super()
  }

  getHTMLElement() {
    if (this.html === null) {
      this.html = document.createElement('table')
      this.html.className = 'left_node mindmapTable'

      const row = this.html.insertRow(0)
      row.style.height = '100%'

      this.leftFiller = row.insertCell(0)
      this.leftFiller.className = 'left_filler'
      this.leftFiller.style.height = '100%'
      this.leftFiller.innerHTML = '&nbsp;'

      this.childrenContainer = row.insertCell(1)
      this.childrenContainer.style.height = '100%'
      this.childrenContainer.className = 'left_children'

      const innerTable = document.createElement('table')
      innerTable.className = 'mindmapTable'
      innerTable.style.height = '100%'
      const innerRow = innerTable.insertRow(0)
      innerRow.style.height = '100%'
      let cell = innerRow.insertCell(0)
      cell.style.height = '100%'
      this.childContainer = cell

      cell = innerRow.insertCell(1)
      cell.style.height = '100%'
      this.canvas = createCanvas(cell)
      this.canvas.setAttribute('width', '30')
      this.canvas.setAttribute('height', '30')

      this.childrenContainer.append(innerTable)

      this.actionIcon = row.insertCell(2)
      this.actionIcon.className = 'left_action'

      this.actionIconIcon = document.createElement('img')
      this.actionIconIcon.src = require('@/assets/icon_plus.png')
      this.actionIconIcon.className = 'left_action_icon'
      this.actionIcon.append(this.actionIconIcon)

      this.leftLabel = row.insertCell(3)
      this.leftLabel.className = 'left_label'
      this.labelDiv = document.createElement('div')
      this.labelDiv.innerHTML = 'label'
      this.labelDiv.id = uuidv4()

      this.leftLabel.append(this.labelDiv)
      this.hideAction(this.children.length === 0)
      this.afterCreateHTML()
    }
    return this.html
  }

  /**
   * Returns an empty child node.<br>
   *
   * @type map.LeftNode
   * */
  createEmptyChildNode() {
    return new LeftNode()
  }

  /**
   * Draw all required lines to the children nodes.<br>
   * Called by the framework.
   *
   * @private
   * */
  drawLines(flag) {
    if (this.visible) {
      const height = this.adjustCanvasHeight()
      const thisAnchor = $(this.canvas).offset()
      const ctx = this.canvas.getContext('2d')
      ctx.clearRect(0, 0, 30, height)

      ctx.strokeStyle = '#999999'
      ctx.lineWidth = 0.3
      this.children.forEach((child) => {
        const anchor = child.getAbsoluteAnchor()
        const top = anchor.top - thisAnchor.top + child.getAnchorHeight() / 2
        ctx.moveTo(0, top)
        ctx.bezierCurveTo(20, top, 15, height / 2, 30, height / 2)
        ctx.stroke()
      })
    }
    if (flag === undefined && this.parent !== null) this.parent.drawLines()
  }

  /**
   *
   * @private
   * */
  get visible() {
    return $(this.childrenContainer).css('visibility') !== 'hidden'
  }

  /**
   *
   * @private
   * */
  adjustCanvasHeight() {
    this.canvas.setAttribute('height', 5)
    let height = $(this.childrenContainer).outerHeight()

    this.canvas.setAttribute('height', height)
    height = $(this.childrenContainer).outerHeight()

    return height
  }
}
