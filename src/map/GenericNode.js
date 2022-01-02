import $ from "jquery"
const images = require.context("@/assets/", true, /\.png$/)

export default class GenericNode {
  constructor() {
    this.deleteable = false
    this.model = null
    this.errorIcon = null
    this.actionIcon = null
  }

  getErrors () {
    return []
  }

  updateStatusIcons() {
    this.hideAction(this.children && this.children.length === 0)
    this.hideError(this.getErrors().length === 0)
    if ( this.parent ) {
      this.parent.updateStatusIcons()
    }
  }

  /**
   * Hide the [+] Icon. Will be called if no children for this node are available.<br>
   * Called by the framework.
   *
   * @private
   * */
  hideAction(flag) {
    if (this.actionIcon === null) return

    if (flag) $(this.actionIcon).hide()
    else $(this.actionIcon).show()
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
        <img class="component_${this.model.type} component_configuration" src="${images("./configuration.png")}">
        <img class="component_${this.model.type} component_icon"          src="${this.model.imageSrc}">
      </div>`
      this.drawLines()
    }
  }
}
