import Node from './Node'
import $ from "jquery"
import { createCanvas, htmlToElement, CANVAS_WIDTH, drawArrowLine } from "./utils.js"

export default class RightNode extends Node {
  constructor() {
    super()
    this.leftSide = false
  }

  getHTMLElement () {
    if (this.html === null) {
      this.html = document.createElement('table')
      this.html.className = 'child_node'

      const row = this.html.insertRow()
      {
        this.leftLabel = row.insertCell()
        {
          this.leftLabel.className = 'node'
          this.labelContainer = document.createElement('div')
          {
            this.leftLabel.append(this.labelContainer)
            this.toolbarDiv = document.createElement('div')
            {
              this.labelContainer.append(this.toolbarDiv)
              this.toolbarDiv.className = 'toolbar'
              
              if ( this.timerBased ) {
                this.timerIcon = htmlToElement('<i aria-hidden="true" class="toolbar_icon v-icon mdi mdi-timer-outline"></i>')
                this.toolbarDiv.append(this.timerIcon)
              }

              this.gaugeIcon = htmlToElement('<i aria-hidden="true" class="toolbar_icon v-icon mdi mdi-gauge"></i>')
              this.toolbarDiv.append(this.gaugeIcon)

              this.infoIcon = htmlToElement('<i aria-hidden="true" class="toolbar_icon v-icon mdi mdi-information-outline"></i>')
              this.toolbarDiv.append(this.infoIcon)

              this.configIcon = htmlToElement('<i aria-hidden="true" class="toolbar_icon v-icon mdi mdi-pencil"></i>')
              this.toolbarDiv.append(this.configIcon)

              this.deleteIcon = htmlToElement('<i aria-hidden="true" class="toolbar_icon pl-3 v-icon mdi mdi-trash-can-outline"></i>')
              this.toolbarDiv.append(this.deleteIcon)
            }

            this.labelDiv = document.createElement('div')
            {
              this.labelContainer.append(this.labelDiv)
              this.labelDiv.className = 'container'
            }
          }
        }

        if ( this.getChildCandidates().length > 0 ) {
          this.addChildCell = row.insertCell()
          {
            this.addChildCell.className = 'action'

            this.addChildIcon = htmlToElement('<i aria-hidden="true" class="addChild_icon v-icon mdi mdi-plus-circle-outline"></i>')
            this.addChildCell.append(this.addChildIcon)
          }
        }

        this.childrenContainer = row.insertCell()
        {
          this.childrenContainer.className = 'children'

          const innerTable = document.createElement('table')
          {
            this.childrenContainer.append(innerTable)
 
            const innerRow = innerTable.insertRow()
            {
              const cell = innerRow.insertCell()
              {
                this.canvas = createCanvas(cell)
                {
                  this.canvas.setAttribute('width', CANVAS_WIDTH)
                  this.canvas.setAttribute('height', '30')
                }
              }

              this.childContainer = innerRow.insertCell()
              {
              }
            }
          }
        }
      }
      this.updateStatusIcons()
      this.afterCreateHTML()
    }
    return this.html
  }

  /**
   * Draw all required lines to the children nodes.<br>
   * Called by the framework.
   *
  * */
  drawLines () {
    if (this.visible) {
      const height = this.adjustCanvasHeight()
      const thisAnchor = $(this.canvas).offset()
      const ctx = this.canvas.getContext('2d')
      ctx.clearRect(0, 0, CANVAS_WIDTH, height)
      ctx.strokeStyle = '#4550A9'
      ctx.fillStyle = '#4550A9'
      ctx.lineWidth = 4
      this.children.forEach((child) => {
        const anchor = child.getAbsoluteAnchor()
        const top = anchor.top - thisAnchor.top + child.getAnchorHeight() / 2
        drawArrowLine(ctx, { x: CANVAS_WIDTH, y: top }, { x: 0, y: top }, { x: CANVAS_WIDTH / 2, y: height / 2 }, { x: 0, y: height / 2 }, 15, true, false)
        ctx.stroke()
      })
    }
    this.parent !== null && this.parent.drawLines()
  }
}
