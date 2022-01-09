import $ from 'jquery'
import { disableSelection, createCanvas, htmlToElement } from './utils'
import GenericNode from './GenericNode'
import LeftDefaultNode from './LeftDefaultNode'
import RightDefaultNode from './RightDefaultNode'

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
    this.leftSide = true
    this.leftDefaultNode = new LeftDefaultNode()
    this.rightDefaultNode = new RightDefaultNode()

    this.host.append(this.getHTMLElement())

    this.center()

    disableSelection(this.html)

    this.leftChildrenHTML.append(this.leftDefaultNode.getHTMLElement())
    this.rightChildrenHTML.append(this.rightDefaultNode.getHTMLElement())
  }

  getLeftChildCandidates () {
    return ["fuse", "solarBooster", "starterBooster"] 
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
    this.leftChildrenHTML.append(this.leftDefaultNode.getHTMLElement())
    this.rightChildrenHTML.append(this.rightDefaultNode.getHTMLElement())

    this.leftDefaultNode.hidden = false
    this.rightDefaultNode.hidden = false
    $(this.rightLines).css('display', 'none')      
    $(this.addRightChildIcon).addClass('pulse')
    $(this.leftLines).css('display', 'none')      
    $(this.addLeftChildIcon).addClass('pulse')
  }

  center () {
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

  setModel ( model ) {
    super.setModel(model)
    this.updateStatusbar()
  }

  /**
   * @type HTMLElement
   * */
  addNode(node) {
    if (node.leftSide) {
      this.leftChildrenHTML.append(node.getHTMLElement())
      this.leftChildren.push(node)
      this.leftDefaultNode.hidden = true
      $(this.leftLines).css('display', 'initial')
      $(this.addLeftChildIcon).removeClass('pulse')
    } else {
      this.rightChildrenHTML.append(node.getHTMLElement())
      this.rightChildren.push(node)
      this.rightDefaultNode.hidden = true
      $(this.addRightChildIcon).removeClass('pulse')
      $(this.rightLines).css('display', 'initial')
    }

    // The mindmap is parent and to root element of this node
    //
    node.parent = this
    node.mindmap = this

    this.updateStatusbar()
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

    if ( this.leftChildren.length === 0 && node.leftSide === true) {
      this.leftDefaultNode.hidden = false
      $(this.leftLines).css('display', 'none')
      $(this.addLeftChildIcon).addClass('pulse')
    }
    if ( this.rightChildren.length === 0 && node.leftSide === false) {
      this.rightDefaultNode.hidden = false
      $(this.rightLines).css('display', 'none')      
      $(this.addRightChildIcon).addClass('pulse')
    }

    this.updateStatusbar()
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
          this.leftLines.style.display = `none`
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
          this.addLeftChildIcon = htmlToElement('<i aria-hidden="true" class="pulse addChild_icon v-icon mdi mdi-plus-circle-outline"></i>')
          addLeftChildCell.append(this.addLeftChildIcon)
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

              this.gaugeIcon = htmlToElement('<i aria-hidden="true" class="float-left toolbar_icon v-icon mdi mdi-gauge"></i>')
              this.toolbarDiv.append(this.gaugeIcon)

              this.infoIcon = htmlToElement('<i aria-hidden="true" class="float-left toolbar_icon v-icon mdi mdi-information-outline"></i>')
              this.toolbarDiv.append(this.infoIcon)

              this.configIcon = htmlToElement('<i aria-hidden="true" class="float-left toolbar_icon pr-8 v-icon mdi mdi-pencil"></i>')
              this.toolbarDiv.append(this.configIcon)
            }

            this.centerLabel = document.createElement('div')
            {
              this.centerLabel.className = 'container'
              this.labelContainer.append(this.centerLabel)
            }

            this.statusbarDiv = htmlToElement('<div class="balancebar"></div>')
            this.labelContainer.append(this.statusbarDiv)
            this.inputLabel = htmlToElement('<div class="input_label float-left">Input</div>')
            this.statusbarDiv.append(this.inputLabel)
            this.runtimeLabel = htmlToElement('<div class="runtime_label text-center">Running time</div>')
            this.statusbarDiv.append(this.runtimeLabel)
            this.outputLabel = htmlToElement('<div class="output_label float-right">Output</div>')
            this.statusbarDiv.append(this.outputLabel)
          }
        }

        const addRightChildCell = row.insertCell()
        {
          addRightChildCell.className = 'storage'
          this.addRightChildIcon = htmlToElement('<i aria-hidden="true" class="pulse addChild_icon v-icon mdi mdi-plus-circle-outline"></i>')
          addRightChildCell.append(this.addRightChildIcon)
        }

        this.rightLines = row.insertCell()
        {
          this.rightLines.className = 'consumer'
          this.rightLines.style.width = `${this.lineCanvasWidth}px`
          this.rightLines.style.height = `${this.height}px`
          this.rightLines.style.display = `none`
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

      $(this.gaugeIcon).on("click", event => {
        event.stopPropagation()
        this.onComponentBalance(this)
      })
  
      $(this.addLeftChildIcon).on("click", event => {
        event.stopPropagation()
        this.notifyListeners({ event: "addChild", component: this, leftSide: true, candidates: this.getLeftChildCandidates() })
      })
  
      $(this.addRightChildIcon).on("click", event => {
        event.stopPropagation()
        this.notifyListeners({ event: "addChild", component: this, leftSide: false, candidates: this.getRightChildCandidates() })
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

  calculateInputData () {
    const result = { strom: 0, spannung: 0, watt: 0, amperestunden: 0 }
    if ( this.leftChildren.length > 0 ) {
      let childData = this.leftChildren[0].calculateOutputData()
      // check that the attributes "strom" and "spannung" are in place
      result.amperestunden = childData.amperestunden
      result.strom = childData.strom
      result.spannung = childData.spannung
      this.leftChildren.slice(1).forEach( child => {
        childData = child.calculateOutputData()
        result.strom += childData.strom 
        result.amperestunden += childData.amperestunden 
      })
    }
    result.watt = result.strom * result.spannung
    return result
  }

  calculateOutputData () {
    const result = { strom: 0, spannung: this.model.data.spannung, watt: 0, amperestunden: 0 }
    if ( this.rightChildren.length > 0 ) {
      // check that the attributes "strom" and "spannung" are in place
      result.strom = this.rightChildren[0].calculateConsumptionData().strom
      result.amperestunden = this.rightChildren[0].calculateConsumptionData().amperestunden
      this.rightChildren.slice(1).forEach( child => {
        result.strom += child.calculateConsumptionData().strom 
        result.amperestunden += child.calculateConsumptionData().amperestunden 
      })
    }
    result.watt = (result.strom * result.spannung)
    return result
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

  onComponentTimer(component) {
    this.notifyListeners({ event: "timer", component: component })
  }

  onComponentShowErrors(component) {
    this.notifyListeners({ event: "showError", component: component })
  }

  onComponentShowInfo(component) {
    this.notifyListeners({ event: "showInfo", component: component })
  }

  onComponentBalance(component) {
    this.notifyListeners({ event: "showBalance", component: component })
  }

  updateStatusbar () {
    // something has changed in the client config. We can recalculate the balance values for the input/output
    // labels
    const input = this.calculateInputData()
    const output = this.calculateOutputData()
    const inputAh = input.amperestunden
    const outputAh = output.amperestunden
    const diff = inputAh - outputAh
    let runtimeDays = ""
    if ( diff >= 0 ) {
      runtimeDays = '<i aria-hidden="true" class="v-icon mdi mdi-all-inclusive"></i>'
    } else {
      runtimeDays = (this.model.data.amperestunden / Math.abs(diff)).toFixed(2).replace(/\.00$/, '')
    }
    this.inputLabel.innerHTML = "Input<br>" + (inputAh).toFixed(2).replace(/\.00$/, '') + " Ah"
    this.runtimeLabel.innerHTML = "Running Time<br>" + runtimeDays + " days"
    this.outputLabel.innerHTML = "Output<br>" + (outputAh).toFixed(2).replace(/\.00$/, '') + " Ah"
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
    this.updateStatusbar()
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
