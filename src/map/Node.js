import $ from 'jquery'
import GenericNode from './GenericNode'
import { createCanvas } from "./utils.js"
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

  setLeftSide (flag) {
    this.leftSide = flag
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
                  this.canvas.setAttribute('width', '30')
                  this.canvas.setAttribute('height', '30')
                }
              }
            }
          }
        }

        // ACTIONS
        // ===============================
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

        // LABEL or the Node itself
        // ===============================
        this.leftLabel = row.insertCell()
        {
          this.leftLabel.className = 'label'
          this.labelContainer = document.createElement('div')
          {
            this.leftLabel.append(this.labelContainer)
            
            this.toolbarDiv = document.createElement('div')
            {
              this.labelContainer.append(this.toolbarDiv)
              this.toolbarDiv.className = 'toolbar'

              this.configIcon = document.createElement('img')
              {
                this.toolbarDiv.append(this.configIcon)
                this.configIcon.src = require('@/assets/configuration.png')
              }

              this.deleteIcon = document.createElement('img')
              {
                this.toolbarDiv.append(this.deleteIcon)
                this.deleteIcon.src = require('@/assets/delete.png')
              }
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

      const row = this.html.insertRow(0)
      {
        this.leftLabel = row.insertCell(0)
        {
          this.leftLabel.className = 'label'
          this.labelContainer = document.createElement('div')
          {
            this.leftLabel.append(this.labelContainer)
            this.toolbarDiv = document.createElement('div')
            {
              this.labelContainer.append(this.toolbarDiv)
              this.toolbarDiv.className = 'toolbar'

              this.configIcon = document.createElement('img')
              {
                this.toolbarDiv.append(this.configIcon)
                this.configIcon.src = require('@/assets/configuration.png')
              }

              this.deleteIcon = document.createElement('img')
              {
                this.toolbarDiv.append(this.deleteIcon)
                this.deleteIcon.src = require('@/assets/delete.png')
              }
            }

            this.labelDiv = document.createElement('div')
            {
              this.labelContainer.append(this.labelDiv)
              this.labelDiv.className = 'container'
            }
          }
        }

        this.addChildCell = row.insertCell(1)
        {
          this.addChildCell.className = 'action'

          this.addChildIcon = document.createElement('img')
          {
            this.addChildCell.append(this.addChildIcon)
            this.addChildIcon.src = require('@/assets/icon_plus.png')
            this.addChildIcon.className = 'addChild_icon'
          }
        }

        this.childrenContainer = row.insertCell(2)
        {
          this.childrenContainer.className = 'children'

          const innerTable = document.createElement('table')
          {
            this.childrenContainer.append(innerTable)
 
            const innerRow = innerTable.insertRow(0)
            {
              const cell = innerRow.insertCell(0)
              {
                this.canvas = createCanvas(cell)
                {
                  this.canvas.setAttribute('width', '30')
                  this.canvas.setAttribute('height', '30')
                }
              }

              this.childContainer = innerRow.insertCell(1)
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
      ctx.clearRect(0, 0, 30, height)
      ctx.strokeStyle = '#4550A9'
      ctx.lineWidth = 4
      this.children.forEach((child) => {
        const anchor = child.getAbsoluteAnchor()
        const top = anchor.top - thisAnchor.top + child.getAnchorHeight() / 2
        if (this.leftSide) {
          ctx.moveTo(0, top)
          ctx.bezierCurveTo(20, top, 15, height / 2, 30, height / 2)  
        } else {
          ctx.moveTo(30, top)
          ctx.bezierCurveTo(0, top, 15, height / 2, 0, height / 2)
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

    $(this.configIcon).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentConfigure(this)
    })

    $(this.deleteIcon).on("click", event => {
      event.stopPropagation()
      this.parent.removeNode(this)
    })

    $(this.errorIcon).on("click", (event) => {
      event.stopPropagation()
      this.mindmap.onComponentShowErrors(this)
    })

    this.setSelected(false)
  }
}
