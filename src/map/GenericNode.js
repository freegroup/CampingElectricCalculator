import $ from "jquery"

export default class GenericNode {
  constructor() {
    this.deleteable = false
    this.model = null
    this.errorIcon = null
    this.addChildCell = null
    // some components do not run the hole day. Indicate if you can switch off/on them  and this result a a differnet 
    // power consumption balance
    //
    this.timerBased = false
  }

  get type() {
    return this.model.type
  }

  getChildCandidates () {
    return ["pressurePump", "fuse", "fuseBox", "solarBooster", "solarPanel", "starterBooster", "starterAccu", "alternator", "fridge", "usb", "usbConsumer"] 
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
    this.updateStatusIcons()
    if ( this.mindmap ) {
      this.mindmap.drawLines(true)
    }
  }

  updateStatusIcons() {
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

    if ( this.parent ) {
      this.parent.updateStatusIcons()
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
    this.updateStatusIcons()
  }

  renderModel () {
    if (this.getComponentContainer() !== null ) {
      this.getComponentContainer().innerHTML = 
      `
      <div class="component">
        <div class="component_${this.model.type} component_label">${this.model.name}</div>
        <img class="component_${this.model.type} component_icon" src="${this.model.imageSrc}"></img>
      </div>
      `
      this.drawLines()
    }
  }

  toJson() {
    // deep copy the data
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

  // calculates the overall percentage of the MindMap flow of this node.
  // This data is used to calculate the line thickness of the connectors.
  // [0..1]
  getPercentageOfAh () {
    return 0
  }
}
