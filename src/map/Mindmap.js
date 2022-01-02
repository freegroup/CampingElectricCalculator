import $ from 'jquery'
import { disableSelection, createCanvas } from './utils'
import GenericNode from './GenericNode'

export default class Mindmap extends GenericNode {
  constructor(id, width, height) {
    super()
    this.lineCanvasWidth = 80
    this.width = width
    this.height = height
    this.leftChildren = []
    this.rightChildren = []
    this.selection = null
    this.listeners = []
    this.html = null
    this.centerLabel = null

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
    $(this.getAnchor()).on("click", ".component_configuration", (event) => {
      event.stopPropagation()
      this.onComponentConfigure(this)
    })

    disableSelection(this.html)
    this.setCurrentSelection(this)
  }

  getComponentContainer () {
    return this.centerLabel
  }

  /**
   * Binding for the click event
   * @private
   * */
  _click() {
    //  Event.stop(event)
  }

  /**
   * Binding for the mouse down event
   * @private
   * */
  _mousedown(event) {
    this.clientX = event.clientX
    this.clientY = event.clientY
    this.mousedown = true
  }

  /**
   * Binding for the mouse up event
   * @private
   * */
  _mouseup() {
    this.mousedown = false
  }

  /**
   * Binding for the mouse up event
   * @private
   * */
  _mousemove() { }

  /**
   * Returns the current selected nodes.<br>
   *
   * @type {Node}
   * */
  getCurrentSelection() {
    return this.selection
  }

  /**
   * Set the current selected node of the mindmap and reset the old
   * selection
   *
   * @private
   * */
  setCurrentSelection(node) {
    if (this.selection !== null) {
      this.selection.setSelected(false)
    }
    this.selection = null
    if (node !== null) {
      this.selection = node
      node.setSelected(true)
    }
    this.notifyListeners({ event: "select", component: this.selection })
  }

  /**
   * Called by the framework to inform the mindmap that the root node has been selected.
   *
   * @param {boolean} flag [true] if you want mark this element as selected
   * @final
   * */
  setSelected(flag) {
    if (flag === true) {
      $(this.getAnchor()).addClass('selected_node')
    } else {
      $(this.getAnchor()).removeClass('selected_node')
    }
  }

  getAnchor() {
    return this.centerLabel
  }

  /**
   * @type HTMLElement
   * */
  addNode(node) {
    if (node.leftSide) {
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
   * */
  removeNode(node) {
    node.getHTMLElement().remove()
    this.leftChildren = $.grep(this.leftChildren, (value) => value !== node)
    this.rightChildren = $.grep(this.rightChildren, (value) => value !== node)

    // The mindmap is parent and to root element of this node
    //
    node.parent = null
    node.mindmap = null
    this.drawLines()
  }

  getHeight() {
    return this.height
  }

  getWidth() {
    return this.width
  }

  /**
   * @type HTMLElement
   * */
  getHTMLElement() {
    if (this.html === null) {
      this.html = document.createElement('table')
      this.html.className = 'root'
      this.html.style.width = `${this.width}px`
      this.html.style.height = `${this.height}px`

      {
        const row = this.html.insertRow(0)

        this.leftChildrenHTML = row.insertCell(0)
        this.leftChildrenHTML.className = 'left_canvas'
        this.leftChildrenHTML.width = `${parseInt(this.width / 2)}`

        this.leftLines = row.insertCell(1)
        this.leftLines.style.width = `${this.lineCanvasWidth}px`
        this.leftLines.style.height = `${this.height}px`
        this.leftCanvas = createCanvas(this.leftLines)
        this.leftCanvas.style.height = `${this.height}px`
        this.leftCanvas.setAttribute('width', this.lineCanvasWidth)
        this.leftCanvas.setAttribute('height', this.height)

        this.centerCanvas = row.insertCell(2)
        this.centerCanvas.className = 'center_canvas center_node'
        this.centerCanvas.width = '80'
        this.centerLabel = document.createElement('div')
        this.centerLabel.className = 'container'
        this.centerCanvas.append(this.centerLabel)

        this.rightLines = row.insertCell(3)
        this.rightLines.style.width = `${this.lineCanvasWidth}px`
        this.rightLines.style.height = `${this.height}px`
        this.rightCanvas = createCanvas(this.rightLines)
        this.rightCanvas.style.height = `${this.height}px`
        this.rightCanvas.setAttribute('width', this.lineCanvasWidth)
        this.rightCanvas.setAttribute('height', this.height)

        this.rightChildrenHTML = row.insertCell(4)
        this.rightChildrenHTML.className = 'right_canvas'
        this.rightChildrenHTML.width = `${parseInt(this.width / 2)}`
      }
    }
    return this.html
  }

  drawLines() {
    this.adjustCanvasHeight()

    let ctx = this.leftCanvas.getContext('2d')
    let thisAnchor = $(this.leftCanvas).offset()
    ctx.clearRect(0, 0, this.lineCanvasWidth, this.height)

    ctx.strokeStyle = '#4550A9'
    ctx.lineWidth = 4
    this.leftChildren.forEach((child) => {
      const anchor = child.getAbsoluteAnchor()
      const top = anchor.top - thisAnchor.top + child.getAnchorHeight() / 2
      ctx.moveTo(0, top)
      ctx.bezierCurveTo(20, top, 15, this.height / 2, this.lineCanvasWidth, this.height / 2)
      ctx.stroke()
    })

    ctx = this.rightCanvas.getContext('2d')
    thisAnchor = $(this.rightCanvas).offset()
    ctx.clearRect(0, 0, this.lineCanvasWidth, this.height)

    ctx.strokeStyle = '#4550A9'
    ctx.lineWidth = 4
    this.rightChildren.forEach((child) => {
      const anchor = child.getAbsoluteAnchor()
      const top = anchor.top - thisAnchor.top + child.getAnchorHeight() / 2
      ctx.moveTo(this.lineCanvasWidth, top)
      ctx.bezierCurveTo(0, top, 15, this.height / 2, 0, this.height / 2)
      ctx.stroke()
    })
  }

  /**
   *
   * @private
   * */
  adjustCanvasHeight() {
    this.leftCanvas.setAttribute('height', this.height)
    this.rightCanvas.setAttribute('height', this.height)

    return this.height
  }

  onComponentConfigure(component) {
    this.notifyListeners({ event: "configure", component: component })
  }

  onComponentShowErrors(component) {
    this.notifyListeners({ event: "showError", component: component })
  }

  /**
   * Adds a listener to the mindmap, which will be notified whenever the selection has been changed.
   * @param {String} event the kind of event you whant to listen.
   * @param {Function} listener function or listener to call if the event is fired
   */
  on(event, listener) {
    if (typeof listener.selectionChanged === "function") {
      this.listeners.push({ event: event, callback: listener.selectionChanged })
    } else if (typeof listener === "function") {
      this.listeners.push({ event: event, callback: listener })
    } else {
      throw Error("Object doesn't implement required callback interface")
    }
    return this
  }

  /**
   * Removes a listener.
   * @param {map.SelectionListener} listener the listener to remove.
   */
  off(listener) {
    this.listeners = $.grep(this.listeners, entry => (entry === listener || entry.selectionChanged === listener))
  }

  /**
   * Notifies selection listeners that the selection has been changed
   *
   * @private
   * */
  notifyListeners(event) {
    this.listeners.forEach(listener => { 
      if (listener.event === event.event) {
        listener.callback(event)
      }
    })
  }
}
