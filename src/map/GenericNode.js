import $ from "jquery"
import { v4 as uuidv4 } from 'uuid'

let DRAGGING_COUNTER = 0
let DRAGGING_NODE = null

export default class GenericNode {
  constructor() {
    this.id = uuidv4()
    this.deleteable = false
    this.model = null
    this.errorIcon = null
    this.addChildCell = null
    this.price = { high: 0, low: 0 } // need member variable to ensure that the "watch" in the view ist working

    // some components do not run the hole day. Indicate if you can switch off/on them  and this result a a differnet 
    // power consumption balance
    //
    this.timerBased = false
  }

  get type() {
    return this.model.type
  }

  getChildCandidates () {
    return [] 
  }

  getErrorMessages () {
    return []
  }

  setOperationHours( hours ) {
    this.model.operationHours = hours
    if ( this.statusbarDiv ) {
      this.statusbarDiv.innerHTML = ` ${this.leftSide ? 'Running' : 'Connected'} ${hours} Hours / Day`
    }

    if ( this.mindmap ) {
      this.mindmap.updateStatusbar()
    }
    this.updateStatusIcons(true)
    if ( this.mindmap ) {
      this.mindmap.drawLines(true)
    }
  }

  updateStatusIcons(recursive) {
    const msgs = this.getErrorMessages()
    const errors = msgs.filter(msg => msg.type === "Error").length

    this.hideError(msgs.length === 0)
    
    if ( errors === 0) {
      $(this.errorIcon).removeClass("red--text text--darken-2")
      $(this.errorIcon).addClass("yellow--text text--darken-2")
    } else {
      $(this.errorIcon).addClass("red--text text--darken-2")
      $(this.errorIcon).removeClass("yellow--text text--darken-2")
    }
    if ( recursive ) {
      this.children.forEach( child => child.updateStatusIcons(recursive))
    }
    if ( this.parent ) {
      this.parent.updateStatusIcons(false)
    }
  }

  hideError(flag) {
    if (this.errorIcon === null) return

    if (flag) $(this.errorIcon).hide()
    else $(this.errorIcon).show()
  }

  setModel(model) {
    this.model = model
    this.renderModel()
    this.updateStatusIcons(true)
    if ( this.mindmap ) {
      this.mindmap.calculateSetupPrice()
    }
  }

  renderModel () {
    if (this.getComponentContainer() !== null ) {
      this.getComponentContainer().innerHTML = 
      `
      <div class="component">
        <div class="component_${this.model.type} component_label">${this.model.name}</div>
        <img draggable="false" class="component_${this.model.type} component_icon" src="${this.model.imageSrc}"></img>
      </div>
      `
      this.drawLines()
    }
  }

  afterCreateHTML() {
    $(this.labelContainer).on("dragstart", event => {
      // event.stopPropagation()
      // event.originalEvent.dataTransfer.effectAllowed = 'copyMove'
      // event.originalEvent.dataTransfer.dropEffect = "copy"
      DRAGGING_NODE = this
    })

    $(this.labelContainer).on("dragenter", event => {
      event.preventDefault() // required. If not present, the "drop" event is not fired.
      DRAGGING_COUNTER++
      if ( this.isDropTarget() ) {
        this.labelContainer.style.border = '2px dotted green'
      } else {
        this.labelContainer.style.border = '2px dotted red'
      }
    })
    
    // Required. If not present, the "drop" event is not fired
    $(this.labelContainer).on("dragover", event => {
      event.preventDefault()
    })

    $(this.labelContainer).on("dragleave", event => {
      DRAGGING_COUNTER--
      if (DRAGGING_COUNTER === 0) {
        this.labelContainer.style.border = '2px solid transparent'
      }
    })

    $(this.labelContainer).on("drop dragdrop", event => {
      event.stopPropagation()
      this.labelContainer.style.border = '2px solid transparent'
      if ( this.isDropTarget() ) {
        this.addNode(DRAGGING_NODE)
      }
      DRAGGING_COUNTER = 0
      DRAGGING_NODE = null
      if ( this.mindmap ) {
        this.mindmap.notifyListeners( { event: "changed" } )
      } else {
        this.notifyListeners( { event: "changed" } )
      }
    })
  }

  isDropTarget( ) {
    if (DRAGGING_NODE === this) {
      return false
    }

    if (DRAGGING_NODE.parent === this) {
      return false
    }
    // must be on the same side (left or right) or this is the center
    //
    if ( this.leftSide !== DRAGGING_NODE.leftSide ) {
      // LEft and Right do not match....in this case I must be the centered accu to be a valid drop target
      // candidate ( 'undefined' means I'm in the center)
      if ( this.leftSide !== undefined ) {
        return false
      }
    }

    // dropTarget does not be a child of the dragging node
    //
    if ( DRAGGING_NODE.isChildOfMe(this)) {
      return false
    }
    
    if (this.getChildCandidates(DRAGGING_NODE.leftSide).includes(DRAGGING_NODE.model.type)) {
      return true
    }

    return false
  }

  toJson() {
    let operationHours = this.model.operationHours
    if ( isNaN(operationHours) ) {
      operationHours = 24
    }

    const json = { uuid: this.model.uuid, type: this.model.type, operationHours: operationHours }
    json.children = []
    this.children.forEach( child => {
      json.children.push(child.toJson())
    })
    return json
  }

  calculateOutputData () {
    return JSON.parse(JSON.stringify(this.model.data)) // deep copy
  }

  calculateInputData () {
    return JSON.parse(JSON.stringify(this.model.data)) 
  }

  calculateConsumptionData () {
    return { strom: 0, spannung: 12, watt: 0 }
  }

  calculateSetupPrice () {
    if ( this.model && this.model.shopping.length > 0) {
      this.price.low = this.model.shopping.reduce((prev, curr) => prev.lastKnownPrice < curr.lastKnownPrice ? prev : curr).lastKnownPrice
      this.price.high = this.model.shopping.reduce((prev, curr) => prev.lastKnownPrice > curr.lastKnownPrice ? prev : curr).lastKnownPrice
    } else {
      this.price.low = 0
      this.price.high = 0
    }
    const addSubChildren = ( children ) => {
      if ( children ) {
        children.forEach( child => {
          const subPrice = child.calculateSetupPrice()
          this.price.low = this.price.low + subPrice.low
          this.price.high = this.price.high + subPrice.high
        })
      }
    }
    addSubChildren(this.children)
    addSubChildren(this.leftChildren)
    addSubChildren(this.rightChildren)

    return this.price
  }

  isChildOfMe ( childCandidate ) {
    const check = ( parent ) => {
      if ( parent === this ) {
        return true
      }
      if ( !parent ) {
        return false
      }
      return check(parent.parent)
    }
    return check(childCandidate.parent)
  }

  // calculates the overall percentage of the MindMap flow of this node.
  // This data is used to calculate the line thickness of the connectors.
  // [0..1]
  getPercentageOfAh () {
    return 0
  }
}
