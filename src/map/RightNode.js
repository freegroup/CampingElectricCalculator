import Node from './Node'
import $ from "jquery"
import { drawLine, htmlToElement, ARROW_STROKE, CANVAS_WIDTH, createSvg } from "./utils.js"

export default class RightNode extends Node {
  constructor() {
    super()
    this.leftSide = false
  }

  /**
   * Returns the fuse which is in place of the wire track or "undefined" if no fuse is in place
   */
  getFuseAmp() {
    return this.parent?.getFuseAmp()
  }

  calculateOutputData () {
    const data = JSON.parse(JSON.stringify(this.model.data))
    data.spannung = this.parent?.getBaseVoltage()
    return data
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
          this.labelContainer = htmlToElement("<div draggable='true'></div>")
          {
            this.leftLabel.append(this.labelContainer)
            this.toolbarDiv = document.createElement('div')
            {
              this.labelContainer.append(this.toolbarDiv)
              this.toolbarDiv.className = 'toolbar'
              
              this.gaugeIcon = htmlToElement('<i aria-hidden="true" class="float-left toolbar_icon v-icon mdi mdi-gauge"></i>')
              this.toolbarDiv.append(this.gaugeIcon)

              this.configIcon = htmlToElement('<i aria-hidden="true" class="float-left toolbar_icon v-icon mdi mdi-widgets-outline"></i>')
              this.toolbarDiv.append(this.configIcon)

              this.deleteIcon = htmlToElement('<i aria-hidden="true" class="float-right toolbar_icon pl-3 v-icon mdi mdi-trash-can-outline"></i>')
              this.toolbarDiv.append(this.deleteIcon)
            }

            this.labelDiv = document.createElement('div')
            {
              this.labelContainer.append(this.labelDiv)
              this.labelDiv.className = 'container'
            }
            if ( this.timerBased ) {
              this.statusbarDiv = htmlToElement('<div class="statusbar"></div>')
              this.labelContainer.append(this.statusbarDiv)
            }
            this.errorIcon = htmlToElement('<i aria-hidden="true" class="error_icon pl-3 v-icon mdi mdi-alert"></i>')
            this.labelContainer.append(this.errorIcon)
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
          $(this.childrenContainer).hide()

          this.childrenTable = document.createElement('table')
          {
            this.childrenContainer.append(this.childrenTable)
 
            const innerRow = this.childrenTable.insertRow()
            {
              const cell = innerRow.insertCell()
              {
                this.canvas = createSvg(cell)
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
  drawLines (recursive) {
    if ( recursive ) {
      this.canvas.innerHTML = ""
      const height = this.adjustCanvasHeight()
      const thisAnchor = $(this.canvas).offset()

      this.children.forEach((child) => {
        // the child node can't have more percentage than the parent
        // The parent is the limitation factor. E.g. a USB-socket can't deliver more power even if the charging
        // device can draw more
        //
        const percentage = Math.min(this.getPercentageOfAh(), child.getPercentageOfAh())
        const anchor = child.getAbsoluteAnchor()
        const top = anchor.top - thisAnchor.top + child.getAnchorHeight() / 2
        const lineWidth = Math.max(3, ARROW_STROKE * percentage)

        const line = drawLine(this.canvas, '#C2185B', lineWidth, { x: CANVAS_WIDTH - 5, y: top }, { x: 0, y: top }, { x: CANVAS_WIDTH / 2, y: height / 2 }, { x: 5, y: height / 2 })
        $(line).on('click', () => { 
          this.mindmap.notifyListeners({ event: "wireSettings", component: child })
        })
        child.drawLines(true)
      })
    } else {
      this.mindmap !== null && this.mindmap.drawLines(true)
    }
  }

  getPercentageOfAh () {
    if ( this.mindmap === null ) {
      return 0
    }
    const rootAh = this.mindmap.calculateOutputData().amperestunden
    const thisAh = this.calculateConsumptionData().amperestunden

    if ( isNaN(rootAh) || isNaN(thisAh) ) {
      return 0
    }
    return ( 1 / rootAh ) * thisAh
  }
}
