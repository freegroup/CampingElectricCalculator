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
    this.host = $(id)

    this.host.append(this.getHTMLElement())

    $(this.getAnchor())[0].scrollIntoView({
      behavior: 'auto',
      inline: 'center',
      block: 'center'
    })

    this.eventbinding_mousedown = this._mousedown.bind(this)
    this.eventbinding_mouseup = this._mouseup.bind(this)
    this.eventbinding_click = this._click.bind(this)

    $(this.html.parentNode).on('mousedown', this.eventbinding_mousedown)
    $(this.html.parentNode).on('mouseup', this.eventbinding_mouseup)
    $(this.html.parentNode).on('click', this.eventbinding_click)

    disableSelection(this.html)
    this.setCurrentSelection(this)
  }

  getLeftChildCandidates () {
    return ["fuse", "fuseBox", "solarBooster", "starterBooster"] 
  }

  getRightChildCandidates () {
    return ["fuse", "fuseBox"] 
  }

  reset () {
    this.leftChildren = []
    this.rightChildren = []
    if (this.html !== null ) {
      this.html.remove()
      this.html = null
    }
    this.host.append(this.getHTMLElement())

    $(this.getAnchor())[0].scrollIntoView({
      behavior: 'auto',
      inline: 'center',
      block: 'center'
    })
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
  }

  /**
   * Binding for the mouse up event
   * @private
   * */
  _mouseup() {
  }

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
        const row = this.html.insertRow()

        this.leftChildrenHTML = row.insertCell()
        {
          this.leftChildrenHTML.className = 'left_canvas producer'
          this.leftChildrenHTML.width = `${parseInt(this.width / 2)}`
        }

        this.leftLines = row.insertCell()
        {
          this.leftLines.className = 'producer'
          this.leftLines.style.width = `${this.lineCanvasWidth}px`
          this.leftLines.style.height = `${this.height}px`
          this.leftCanvas = createCanvas(this.leftLines)
          {
            this.leftCanvas.style.height = `${this.height}px`
            this.leftCanvas.setAttribute('width', this.lineCanvasWidth)
            this.leftCanvas.setAttribute('height', this.height)
          }
        }

        const addLeftChildCell = row.insertCell()
        {
          addLeftChildCell.className = 'storage'
          this.addLeftChildIcon = document.createElement('img')
          {
            addLeftChildCell.append(this.addLeftChildIcon)
            this.addLeftChildIcon.src = require('@/assets/icon_plus.png')
            this.addLeftChildIcon.className = 'addChild_icon'
          }
        }

        this.centerCanvas = row.insertCell()
        {
          this.centerCanvas.className = 'node storage'
          this.labelContainer = document.createElement('div')
          {
            this.centerCanvas.append(this.labelContainer)
            this.toolbarDiv = document.createElement('div')
            {
              this.labelContainer.append(this.toolbarDiv)
              this.toolbarDiv.className = 'toolbar'

              this.infoIcon = document.createElement('img')
              {
                this.toolbarDiv.append(this.infoIcon)
                this.infoIcon.src = require('@/assets/info.png')
              }

              this.configIcon = document.createElement('img')
              {
                this.toolbarDiv.append(this.configIcon)
                this.configIcon.src = require('@/assets/configuration.png')
              }
            }

            this.centerLabel = document.createElement('div')
            {
              this.centerLabel.className = 'container'
              this.labelContainer.append(this.centerLabel)
            }
          }
        }

        const addRightChildCell = row.insertCell()
        {
          addRightChildCell.className = 'storage'
          this.addRightChildIcon = document.createElement('img')
          {
            addRightChildCell.append(this.addRightChildIcon)
            this.addRightChildIcon.src = require('@/assets/icon_plus.png')
            this.addRightChildIcon.className = 'addChild_icon'
          }
        }

        this.rightLines = row.insertCell()
        {
          this.rightLines.className = 'consumer'
          this.rightLines.style.width = `${this.lineCanvasWidth}px`
          this.rightLines.style.height = `${this.height}px`
          this.rightCanvas = createCanvas(this.rightLines)
          this.rightCanvas.style.height = `${this.height}px`
          this.rightCanvas.setAttribute('width', this.lineCanvasWidth)
          this.rightCanvas.setAttribute('height', this.height)
        }

        this.rightChildrenHTML = row.insertCell()
        {
          this.rightChildrenHTML.className = 'right_canvas consumer'
          this.rightChildrenHTML.width = `${parseInt(this.width / 2)}`
        }
      }

      $(this.centerLabel).on('click', (event) => {
        event.stopPropagation()
        this.setCurrentSelection(this)
      })
      $(this.configIcon).on("click", event => {
        event.stopPropagation()
        this.onComponentConfigure(this)
      })
  
      $(this.infoIcon).on("click", event => {
        event.stopPropagation()
        this.onComponentShowInfo(this)
      })
  
      $(this.addLeftChildIcon).on("click", event => {
        event.stopPropagation()
        this.notifyListeners({ event: "addChild", component: this, leftSide: true, candidates: this.getLeftChildCandidates() })
      })
  
      $(this.addRightChildIcon).on("click", event => {
        event.stopPropagation()
        this.notifyListeners({ event: "addChild", component: this, leftSide: false, candidates: this.getRightChildCandidates() })
      })  

      $(this.getAnchor()).on('click', '.output_button', (event) => {
        event.stopPropagation()
        this.onComponentBilanz(this)
      })
  
      $(this.getAnchor()).on('click', '.input_button', (event) => {
        event.stopPropagation()
        this.onComponentBilanz(this)
      })  
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

  onComponentAddChild(parent, leftSide) {
    this.notifyListeners({ event: "addChild", component: parent, leftSide: leftSide, candidates: parent.getChildCandidates() })
  }

  onComponentRemoveChild(node) {
    this.notifyListeners({ event: "removeChild", component: node })
  }

  onComponentConfigure(component) {
    this.notifyListeners({ event: "configure", component: component })
  }

  onComponentShowErrors(component) {
    this.notifyListeners({ event: "showError", component: component })
  }

  onComponentShowInfo(component) {
    this.notifyListeners({ event: "showInfo", component: component })
  }

  onComponentBilanz(component) {
    this.notifyListeners({ event: "showBilanz", component: component })
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

  toJson() {
    // deep copy the data
    const json = {}
    json.center = { uuid: this.model.uuid, type: this.model.type }
    json.left = []
    json.right = []
    this.leftChildren.forEach( child => {
      json.left.push(child.toJson())
    })
    this.rightChildren.forEach( child => {
      json.right.push(child.toJson())
    })
    return json
  }
}
