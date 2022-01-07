import $ from 'jquery'
import GenericNode from './GenericNode'
import { createCanvas, drawArrowLine, htmlToElement } from "./utils.js"

const CANVAS_WIDTH = 80
/**
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
export default class Node extends GenericNode {
  constructor() {
    super()
    this._parent = null
    this._mindmap = null

    this.children = []
    this.leftSide = false
    this.html = null
    this.labelDiv = null

    this.eventbinding_click = this._click.bind(this)
    this.eventbinding_mousedown = this._mousedown.bind(this)
    this.eventbinding_mouseup = this._mouseup.bind(this)
  }

  getComponentContainer () {
    return this.labelDiv
  }

  /**
   * @final
   * @private
   * */
  _collapse(event) {
    $(this.childrenContainer).toggle()
    event.stopPropagation()
    this.drawLines()
  }

  /**
   * @final
   * @private
   * */
  _click() {
    this.mindmap.setCurrentSelection(this)
  }

  _mousedown() {
  }

  _mouseup() {
  }

  /**
   * @type HTMLElement
   * @final
   * */
  addNode(node) {
    this.children.push(node)
    this.childContainer.append(node.getHTMLElement())
    node.parent = this
    node.mindmap = this.mindmap
    this.updateStatusIcons()
  }

  /**
   * @type HTMLElement
   * @final
   * */
  removeNode(node) {
    this.children = $.grep(this.children, (element) => element !== node)
    node.html.remove()
    node.parent = null
    node.mindmap = null
    this.updateStatusIcons()
    this.drawLines()
  }

  /**
   * Set the parent node of this element.
   * @param {Node} parent
   */
  set parent(parent) {
    this._parent = parent
    this._parent !== null && this.drawLines()
    this.renderModel()
  }

  /**
   * Returns the parent node of this object.<br>
   *
   * @type map.Node
   * */
  get parent() {
    return this._parent
  }

  /**
   *
   * @private
   * */
  get visible() {
    return $(this.childrenContainer).css('visibility') !== 'hidden'
  }

  /**
   * Set the to root mindmap element of this node.
   *
   * @param {Mindmap} mindmap the mindmap of the element
   * */
  set mindmap(mindmap) {
    this._mindmap = mindmap
    this.children.forEach((child) => (child.mindmap = mindmap))
    this.renderModel()
  }

  get mindmap() {
    return this._mindmap
  }

  /**
   * Called by the framework to inform this element that this node
   * has been selected.<br>
   * The node is responsible to change the graphical representation.<br>
   * Subclases can override this method to customize the style of the node
   * in the selected mode.
   *
   * @param {boolean} flag [true] if you want mark this element as selected
   * */
  setSelected(flag) {
    if (flag === true) {
      $(this.getAnchor()).addClass('selected_node')
    } else {
      $(this.getAnchor()).removeClass('selected_node')
    }
  }

  /**
   * */
  getAnchor() {
    return this.labelDiv
  }

  /**
   * */
  getAbsoluteAnchor() {
    return $(this.labelDiv).offset()
  }

  /**
   * */
  getAnchorHeight() {
    return $(this.labelDiv).height()
  }

  /**
   * */
  getAnchorBoundigBox() {
    const pos = this.getAbsoluteAnchor()
    pos.width = $(this.labelDiv).width()
    pos.height = $(this.labelDiv).height()
    return pos
  }

  /**
   *
   * @private
   * */
  adjustCanvasHeight() {
    this.canvas.setAttribute('height', 5)
    const height = $(this.childrenContainer).outerHeight()
    this.canvas.setAttribute('height', height)

    return height
  }  

  getHTMLElement () {
    if ( this.leftSide ) {
      return this.getLeftHTMLElement()
    } else {
      return this.getRightHTMLElement()
    }
  }

  getLeftHTMLElement() {
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

        // CHILDREN
        // ===============================
        this.childrenContainer = row.insertCell()
        {
          this.childrenContainer.className = 'children'

          const innerTable = document.createElement('table')
          {
            this.childrenContainer.append(innerTable)
            const innerRow = innerTable.insertRow()
            {
              this.childContainer = innerRow.insertCell()

              const cell = innerRow.insertCell()
              {
                this.canvas = createCanvas(cell)
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
            this.addChildIcon = document.createElement('img')
            {
              this.addChildCell.append(this.addChildIcon)
              this.addChildIcon.src = require('@/assets/icon_plus.png')
              this.addChildIcon.className = 'addChild_icon'
            }
          }
        }

        // LABEL or the Node itself
        // ===============================
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

            this.errorIcon = document.createElement('img')
            {
              this.labelContainer.append(this.errorIcon)
              this.errorIcon.className = 'error_icon'
              this.errorIcon.src = require('@/assets/error.png')
            }
          }
        }
      }
      this.updateStatusIcons()
      this.afterCreateHTML()
    }
    return this.html
  }

  getRightHTMLElement () {
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

            this.addChildIcon = document.createElement('img')
            {
              this.addChildCell.append(this.addChildIcon)
              this.addChildIcon.src = require('@/assets/icon_plus.png')
              this.addChildIcon.className = 'addChild_icon'
            }
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
        if (this.leftSide) {
          drawArrowLine(ctx, { x: 0, y: top }, { x: CANVAS_WIDTH / 2, y: height / 2 }, { x: CANVAS_WIDTH - 4, y: height / 2 }, undefined, 15, false, true)
        } else {
          // ctx.moveTo(CANVAS_WIDTH, top)
          // ctx.bezierCurveTo(0, top, CANVAS_WIDTH / 2, height / 2, 0, height / 2)
          drawArrowLine(ctx, { x: CANVAS_WIDTH, y: top }, { x: 0, y: top }, { x: CANVAS_WIDTH / 2, y: height / 2 }, { x: 0, y: height / 2 }, 15, true, false)
        }
        ctx.stroke()
      })
    }
    this.parent !== null && this.parent.drawLines()
  }

  /**
   * Event after the HTML has been generate.
   *
   * */
  afterCreateHTML() {
    $(this.getAnchor()).on('mousedown', this.eventbinding_mousedown)
    $(this.getAnchor()).on('mouseup', this.eventbinding_mouseup)
    $(this.getAnchor()).on('click', this.eventbinding_click)

    $(this.addChildIcon).on('click', this.eventbinding_collapse)

    $(this.addChildIcon).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentAddChild(this, this.leftSide)
    })

    $(this.gaugeIcon).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentBilanz(this)
    })

    $(this.configIcon).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentConfigure(this)
    })

    $(this.deleteIcon).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentRemoveChild(this)
    })

    $(this.errorIcon).on("click", (event) => {
      event.stopPropagation()
      this.mindmap.onComponentShowErrors(this)
    })

    $(this.infoIcon).on("click", (event) => {
      event.stopPropagation()
      this.mindmap.onComponentShowInfo(this)
    })

    this.setSelected(false)
  }
}
