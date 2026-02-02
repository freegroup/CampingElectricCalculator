import Node from './Node'
import $ from "jquery"
import { drawLine, htmlToElement, ARROW_STROKE, CANVAS_WIDTH, createSvg } from "./utils.js"

export default class LeftNode extends Node {
  constructor() {
    super()
    this.leftSide = true
  }

  getHTMLElement() {
    if (this.html === null) {
      this.html = htmlToElement("<div></div>")
      this.html.className = 'child_node'

      this.table = document.createElement('table')
      this.html.append(this.table)

      const row = this.table.insertRow()
      {
        // FILLER
        // ===============================
        this.leftFiller = row.insertCell()
        {
          this.leftFiller.className = 'filler'
          this.leftFiller.innerHTML = '&nbsp;'
        }

        // CHILDREN
        // ===============================
        this.childrenContainer = row.insertCell()
        {
          this.childrenContainer.className = 'children'
          $(this.childrenContainer).hide()

          this.childrenTable = document.createElement('table')
          {
            this.childrenContainer.append(this.childrenTable)
            const innerRow = this.childrenTable.insertRow()
            {
              this.childContainer = innerRow.insertCell()

              const cell = innerRow.insertCell()
              {
                this.canvas = createSvg(cell)
                {
                  this.canvas.setAttribute('width', CANVAS_WIDTH)
                  this.canvas.setAttribute('height', '30')
                }
              }
            }
          }
        }

        // ACTIONS
        // ===============================
        if ( this.getChildCandidates().length > 0 ) {
          this.addChildCell = row.insertCell()
          {
            this.addChildCell.className = 'action'
            this.addChildIcon = htmlToElement('<i aria-hidden="true" class="addChild_icon v-icon mdi mdi-plus-circle-outline"></i>')
            this.addChildCell.append(this.addChildIcon)
          }
        }

        // LABEL or the Node itself
        // ===============================
        this.leftLabel = row.insertCell()
        {
          this.leftLabel.className = 'node'
          this.labelContainer = htmlToElement(`<div draggable='true'></div>`)
          {
            this.leftLabel.append(this.labelContainer)
            
            this.toolbarDiv = document.createElement('div')
            {
              this.labelContainer.append(this.toolbarDiv)
              this.toolbarDiv.className = 'toolbar'

              this.gaugeIcon = htmlToElement('<i aria-hidden="true" class="float-left toolbar_icon v-icon mdi mdi-gauge" title=""></i>')
              this.toolbarDiv.append(this.gaugeIcon)

              this.configIcon = htmlToElement('<i aria-hidden="true" class="toolbar_icon v-icon mdi mdi-swap-horizontal" title=""></i>')
              this.toolbarDiv.append(this.configIcon)

              this.spacer = htmlToElement('<div class="toolbar_spacer"></div>')
              this.toolbarDiv.append(this.spacer)

              this.deleteIcon = htmlToElement('<i aria-hidden="true" class="toolbar_icon v-icon mdi mdi-trash-can-outline" title=""></i>')
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
      }
      this.updateStatusIcons()
      this.afterCreateHTML()
    }
    return this.html
  }

  /**
   * Draw all required lines to the children nodes.<br>
   * Called by the framework.
   * */
  drawLines (recursive) {
    if ( recursive ) {
      this.canvas.innerHTML = ""
      const height = this.adjustCanvasHeight()
      const thisAnchor = $(this.canvas).offset()

      this.children.forEach((child) => {
        const percentage = child.getPercentageOfAh()
        const anchor = child.getAbsoluteAnchor()
        const top = anchor.top - thisAnchor.top + child.getAnchorHeight() / 2
        const lineWidth = Math.max(3, ARROW_STROKE * percentage)
        const line = drawLine(this.canvas, '#5CC9FA', lineWidth, { x: 5, y: top }, { x: CANVAS_WIDTH / 2, y: top }, { x: CANVAS_WIDTH / 2, y: height / 2 }, { x: CANVAS_WIDTH - 5, y: height / 2 })
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
    const rootAh = this.mindmap.calculateInputData().amperestunden
    const thisAh = this.calculateOutputData().amperestunden
    if ( isNaN(rootAh) || isNaN(thisAh) || rootAh === 0 ) {
      return NaN
    }
    return ( 1 / rootAh ) * thisAh
  }
}
