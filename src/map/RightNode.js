import $ from 'jquery'
import { v4 as uuidv4 } from 'uuid'
import Node from '@/map/Node'
import { createCanvas } from './utils'

export default class RightNode extends Node {
  constructor() {
    super()
  }

  /**

  <table  class="left_node">
  <tr>
  <td class="left_filler">&nbsp;</td>
  <td class="left_children">
    <div class="left_line_canvas">
    CHILDREN_NODES
    </div>
  </td>
  <td class="left_action">action</td>
  <td><div class="left_label">label</div></td>
  </tr>
  </table>
  * */
  getHTMLElement () {
    if (this.html === null) {
      this.html = document.createElement('table')
      this.html.className = 'right_node mindmapTable'

      const row = this.html.insertRow(0)
      row.style.height = '100%'

      this.leftLabel = row.insertCell(0)
      this.leftLabel.className = 'right_label'
      this.labelDiv = document.createElement('div')
      this.labelDiv.innerHTML = 'label'
      this.labelDiv.id = uuidv4()
      this.leftLabel.append(this.labelDiv)

      this.actionIcon = row.insertCell(1)
      this.actionIcon.className = 'right_action'
      this.actionIconIcon = document.createElement('img')
      this.actionIconIcon.src = require('@/assets/icon_plus.png')
      this.actionIconIcon.className = 'right_action_icon'
      this.actionIcon.append(this.actionIconIcon)

      this.childrenContainer = row.insertCell(2)
      this.childrenContainer.style.height = '100%'
      this.childrenContainer.className = 'right_children'

      const innerTable = document.createElement('table')
      innerTable.className = 'mindmapTable'
      innerTable.style.height = '100%'

      const innerRow = innerTable.insertRow(0)
      innerRow.style.height = '100%'

      let cell = innerRow.insertCell(0)
      cell.style.height = '100%'
      this.canvas = createCanvas(cell)
      this.canvas.setAttribute('width', '30')
      this.canvas.setAttribute('height', '30')

      cell = innerRow.insertCell(1)
      cell.style.height = '100%'
      this.childContainer = cell

      this.childrenContainer.append(innerTable)
      this.hideAction(this.children.length === 0)
      this.afterCreateHTML()
    }
    return this.html
  }

  /**
   * Returns an empty child node.<br>
   *
   * @type map.RightNode
   * */
  createEmptyChildNode () {
    return new RightNode()
  }

  /**
   * Draw all required lines to the children nodes.<br>
   * Called by the framework.
   *
   * @private
   * */
  drawLines () {
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
        ctx.moveTo(30, top)
        ctx.bezierCurveTo(0, top, 15, height / 2, 0, height / 2)
        ctx.stroke()
      })
    }
    if (this.parent !== null) this.parent.drawLines()
  }

  /**
   *
   * @private
   * */
  adjustCanvasHeight () {
    this.canvas.setAttribute('height', 5)
    const height = $(this.childrenContainer).outerHeight()
    this.canvas.setAttribute('height', height)

    return height
  }
}
