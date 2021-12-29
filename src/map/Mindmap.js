import $ from 'jquery'
import { disableSelection, createCanvas } from './utils'
import LeftNode from './LeftNode'

export default class Mindmap {
  constructor (id, width, height) {
    this.width = width
    this.height = height
    this.leftChildren = []
    this.rightChildren = []
    this.selection = []
    this.selectionListeners = []
    this.html = null

    $(id).append(this.getHTMLElement())

    $(this.getAnchor())[0].scrollIntoView({
      behavior: 'auto',
      inline: 'center',
      block: 'center'
    })

    $(this.getAnchor()).on('click', (event) => {
      event.stopPropagation()
      this.setCurrentSelection(this)
    })

    this.eventbinding_mousedown = this._mousedown.bind(this)
    this.eventbinding_mouseup = this._mouseup.bind(this)
    this.eventbinding_mousemove = this._mousemove.bind(this)
    this.eventbinding_click = this._click.bind(this)

    $(this.html.parentNode).on('mousedown', this.eventbinding_mousedown)
    $(this.html.parentNode).on('mouseup', this.eventbinding_mouseup)
    $(this.html.parentNode).on('click', this.eventbinding_click)
    $(this.html.parentNode).on('mousemove', this.eventbinding_mousemove)

    disableSelection(this.html)
    this.setCurrentSelection(this)
  }

  /**
   * Binding for the click event
   * @private
   **/
  _click () {
    //  Event.stop(event)
  }

  /**
   * Binding for the mouse down event
   * @private
   **/
  _mousedown (event) {
    this.clientX = event.clientX
    this.clientY = event.clientY
    this.mousedown = true
  }

  /**
   * Binding for the mouse up event
   * @private
   **/
  _mouseup () {
    this.mousedown = false
  }

  /**
   * Binding for the mouse up event
   * @private
   **/
  _mousemove () { }

  /**
   * Returns the current selected nodes.<br>
   *
   * @type map.ArrayList
   **/
  getCurrentSelection () {
    return this.selection
  }

  /**
   * Set the current selected node of the mindmap and reset the old
   * selection
   *
   * @private
   **/
  setCurrentSelection (node) {
    this.selection.forEach((child) => child.setSelected(false))
    this.selection = []
    if (node !== null) {
      this.selection.push(node)
      node.setSelected(true)
    }
    this.notifyListeners()
  }

  /**
   * Set the current selected node of the mindmap and reset the old
   * selection
   *
   * @private
   **/
  removeCurrentSelection (node) {
    this.selection = $.grep(this.selection, (element) => element !== node)
    node.setSelected(false)
    this.notifyListeners()
  }

  /**
   * Add the handsover node the the selection. This is the support
   * for multiselect.
   *
   * @private
   **/
  addCurrentSelection (node) {
    this.selection.push(node)
    node.setSelected(true)
    this.notifyListeners()
  }

  /**
   * Reset the current selection
   * for multiselect.
   *
   * @private
   **/
  clearCurrentSelection () {
    this.selection.forEach((child) => child.setSelected(false))
    this.selection = []
    this.notifyListeners()
  }

  /**
   * Returns an empty child node.<br>
   * Inherited classes can override this method to return node depending child nodes.<br>
   *
   * @type map.Node
   * @abstract
   **/
  createEmptyChildNode () {
    return new LeftNode()
  }

  /**
   * Called by the framework to inform the mindmap that the root node has been selected.
   *
   * @param {boolean} flag [true] if you want mark this element as selected
   * @final
   **/
  setSelected (flag) {
    if (flag === true) {
      $(this.getAnchor()).addClass('selected_node')
      $(this.getAnchor()).removeClass('normal_node')
    } else {
      $(this.getAnchor()).removeClass('selected_node')
      $(this.getAnchor()).addClass('normal_node')
    }
  }

  /**
   * Returns whenether the element is deletable. The root node (the Mindmap)
   * always returns <code>false</code>
   *
   * @type boolean
   **/
  get deleteable () {
    return false
  }

  getAnchor () {
    return this.centerLabel
  }

  /**
   * @type HTMLElement
   **/
  addNode (node) {
    if (node instanceof LeftNode) {
      this.leftChildrenHTML.append(node.getHTMLElement())
      this.leftChildren.push(node)
    } else {
      this.rightChildrenHTML.append(node.getHTMLElement())
      this.rightChildren.push(node)
    }

    // The mindmap is parent and to root element of this node
    //
    node.parent = this
    node.mindmap = this
  }

  /**
   * @type HTMLElement
   **/
  removeNode (node) {
    if (node instanceof LeftNode) {
      node.getHTMLElement().remove()
      this.leftChildren = $.grep(this.leftChildren, (value) => value !== node)
    } else {
      node.getHTMLElement().remove()
      this.rightChildren = $.grep(this.rightChildren, (value) => value !== node)
    }

    // The mindmap is parent and to root element of this node
    //
    node.parent = null
    node.mindmap = null
    this.drawLines()
  }

  getHeight () {
    return this.height
  }

  getWidth () {
    return this.width
  }

  scrollTo (x, y) {
    this.html.parentNode.scrollLeft = x
    this.html.parentNode.scrollTop = y
  }

  /**
   * @type HTMLElement
   **/
  getHTMLElement () {
    if (this.html === null) {
      this.html = document.createElement('table')
      this.html.className = 'root'
      this.html.style.width = this.width + 'px'
      this.html.style.height = this.height + 'px'

      var row = this.html.insertRow(0)

      this.leftChildrenHTML = row.insertCell(0)
      this.leftChildrenHTML.className = 'left_canvas'
      this.leftChildrenHTML.width = '' + parseInt(this.width / 2)

      this.leftLines = row.insertCell(1)
      this.leftLines.style.width = '50px'
      this.leftLines.style.height = this.height + 'px'
      this.leftCanvas = createCanvas(this.leftLines)
      this.leftCanvas.style.height = this.height + 'px'
      this.leftCanvas.setAttribute('width', '50')
      this.leftCanvas.setAttribute('height', this.height)

      this.centerCanvas = row.insertCell(2)
      this.centerCanvas.className = 'center_canvas'
      this.centerCanvas.width = '80'
      this.centerLabel = document.createElement('div')
      this.centerLabel.innerHTML = 'CENTER'
      this.centerCanvas.append(this.centerLabel)

      this.rightLines = row.insertCell(3)
      this.rightLines.style.width = '50px'
      this.rightLines.style.height = this.height + 'px'
      this.rightCanvas = createCanvas(this.rightLines)
      this.rightCanvas.style.height = this.height + 'px'
      this.rightCanvas.setAttribute('width', '50')
      this.rightCanvas.setAttribute('height', this.height)

      this.rightChildrenHTML = row.insertCell(4)
      this.rightChildrenHTML.className = 'right_canvas'
      this.rightChildrenHTML.width = '' + parseInt(this.width / 2)
    }
    return this.html
  }

  drawLines () {
    this.adjustCanvasHeight()

    var ctx = this.leftCanvas.getContext('2d')
    var thisAnchor = $(this.leftCanvas).offset()
    ctx.clearRect(0, 0, 50, this.height)

    ctx.strokeStyle = '#999999'
    ctx.lineWidth = 0.3
    this.leftChildren.forEach((child) => {
      const anchor = child.getAbsoluteAnchor()
      const top = anchor.top - thisAnchor.top + child.getAnchorHeight() / 2
      ctx.moveTo(0, top)
      ctx.bezierCurveTo(20, top, 15, this.height / 2, 50, this.height / 2)
      ctx.stroke()
    })

    ctx = this.rightCanvas.getContext('2d')
    thisAnchor = $(this.rightCanvas).offset()
    ctx.clearRect(0, 0, 50, this.height)

    ctx.strokeStyle = '#999999'
    ctx.lineWidth = 0.3
    this.rightChildren.forEach((child) => {
      const anchor = child.getAbsoluteAnchor()
      const top = anchor.top - thisAnchor.top + child.getAnchorHeight() / 2
      ctx.moveTo(50, top)
      ctx.bezierCurveTo(0, top, 15, this.height / 2, 0, this.height / 2)
      ctx.stroke()
    })
  }

  /**
   *
   * @private
   **/
  adjustCanvasHeight () {
    this.leftCanvas.setAttribute('height', this.height - 5)
    this.rightCanvas.setAttribute('height', this.height - 5)

    return this.height
  }

  /**
   * Adds a listener to the mindmap, which will be notified whenever the selection has been changed.
   * @param {map.CommandStackListener} listener the listener to add.
   */
  addSelectionListener (listener) {
    this.selectionListeners.push(listener)
  }

  /**
   * Removes a listener.
   * @param {map.SelectionListener} listener the listener to remove.
   */
  removeSelectionListener (listener) {
    this.selectionListeners = $.grep(
      this.selectionListeners,
      (value) => value !== listener
    )
  }

  /**
   * Notifies selection listeners that the selection has been changed
   *
   * @private
   **/
  notifyListeners () {
    this.selectionListeners.forEach((listener) =>
      listener.selectionChanged(this.selection)
    )
  }
}
