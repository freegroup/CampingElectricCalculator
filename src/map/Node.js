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

    this.eventbinding_collapse = this._collapse.bind(this)
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
    this.mouseDown = true
  }

  _mouseup() {
    this.mouseDown = false
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
    node.getHTMLElement().remove()
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
   *
   * @param {boolean} flag [true] if you want mark this element
   * */
  setHighlighted(flag) {
    if (flag) $(this.getAnchor()).addClass('highlighted_node')
    else $(this.getAnchor()).removeClass('highlighted_node')
  }

  /**
   * Event after the HTML has been generate.
   *
   * */
  afterCreateHTML() {
    $(this.getAnchor()).on('mousedown', this.eventbinding_mousedown)
    $(this.getAnchor()).on('click', this.eventbinding_click)
    $(this.getAnchor()).on('dblclick', this.eventbinding_dblclick)
    $(this.getAnchor()).on('mouseup', this.eventbinding_mouseup)

    $(this.actionIconIcon).on('mousedown', this.eventbinding_collapse)

    $(this.getAnchor()).on("click", ".component_configuration", (event) => {
      event.stopPropagation()
      this._mindmap.onComponentConfigure(this)
    })

    $(this.errorIcon).on("click", (event) => {
      event.stopPropagation()
      this._mindmap.onComponentShowErrors(this)
    })

    this.setSelected(false)
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
      this.html.className = 'left_node'

      const row = this.html.insertRow(0)
      row.style.height = '100%'

      this.leftFiller = row.insertCell(0)
      this.leftFiller.className = 'filler'
      this.leftFiller.style.height = '100%'
      this.leftFiller.innerHTML = '&nbsp;'

      this.childrenContainer = row.insertCell(1)
      this.childrenContainer.style.height = '100%'
      this.childrenContainer.className = 'children'

      const innerTable = document.createElement('table')
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
      this.actionIcon.className = 'action'

      this.actionIconIcon = document.createElement('img')
      this.actionIconIcon.src = require('@/assets/icon_plus.png')
      this.actionIconIcon.className = 'action_icon'
      this.actionIcon.append(this.actionIconIcon)

      this.leftLabel = row.insertCell(3)
      this.leftLabel.className = 'label'
      {
        this.labelContainer = document.createElement('div')
        this.leftLabel.append(this.labelContainer)
        {
          this.labelDiv = document.createElement('div')
          this.labelDiv.className = 'container'
          this.labelContainer.append(this.labelDiv)

          this.errorIcon = document.createElement('img')
          this.errorIcon.src = require('@/assets/error.png')
          this.errorIcon.className = 'error_icon'
          this.labelContainer.append(this.errorIcon)
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
      this.html.className = 'right_node'

      const row = this.html.insertRow(0)
      row.style.height = '100%'

      this.leftLabel = row.insertCell(0)
      this.leftLabel.className = 'label'
      this.labelDiv = document.createElement('div')
      this.labelDiv.className = 'container'
      this.leftLabel.append(this.labelDiv)

      this.actionIcon = row.insertCell(1)
      this.actionIcon.className = 'action'
      this.actionIconIcon = document.createElement('img')
      this.actionIconIcon.src = require('@/assets/icon_plus.png')
      this.actionIconIcon.className = 'action_icon'
      this.actionIcon.append(this.actionIconIcon)

      this.childrenContainer = row.insertCell(2)
      this.childrenContainer.style.height = '100%'
      this.childrenContainer.className = 'children'

      const innerTable = document.createElement('table')
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
}
