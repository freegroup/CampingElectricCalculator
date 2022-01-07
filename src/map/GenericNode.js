import $ from "jquery"

export default class GenericNode {
  constructor() {
    this.deleteable = false
    this.model = null
    this.errorIcon = null
    this.addChildCell = null
  }

  get type() {
    return this.model.type
  }

  getChildCandidates () {
    return ["pressurePump", "fuse", "fuseBox", "solarBooster", "solarPanel", "starterBooster", "starterAccu", "alternator", "fridge", "usb", "usbConsumer"] 
  }

  getErrors () {
    return []
  }

  updateStatusIcons() {
    this.hideError(this.getErrors().length === 0)
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
    const json = { uuid: this.model.uuid, type: this.model.type }
    json.children = []
    this.children.forEach( child => {
      json.children.push(child.toJson())
    })
    return json
  }

  calculateOutputData () {
    // It is only allowed, that this element has ONE direct child element
    //
    return JSON.parse(JSON.stringify(this.model.data)) // deep copy
  }

  calculateInputData () {
    return JSON.parse(JSON.stringify(this.model.data)) 
  }

  calculateConsumptionData () {
    return { strom: 0, spannung: 12, watt: 0 }
  }
}
