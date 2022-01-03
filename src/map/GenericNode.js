import $ from "jquery"

export default class GenericNode {
  constructor() {
    this.deleteable = false
    this.model = null
    this.errorIcon = null
    this.addChildCell = null
  }

  getChildCandidates () {
    return ["fuse", "solarBooster", "solarPanel", "starterBooster"] 
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

  get type () {
    return this.model.type
  }

  setModel(model) {
    this.model = model
    this.renderModel()
    this.updateStatusIcons()
  }

  renderModel () {
    if (this.getComponentContainer() !== null ) {
      this.getComponentContainer().innerHTML = 
      `<div class="component">
        <div class="component_${this.model.type} component_label">${this.model.name}</div>
        <img class="component_${this.model.type} component_icon"          src="${this.model.imageSrc}">
      </div>`
      this.drawLines()
    }
  }
}