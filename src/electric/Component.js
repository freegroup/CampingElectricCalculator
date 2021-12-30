const images = require.context("@/assets/", true, /\.png$/)

export default class Component {
  constructor (componentData) {
    this.componentData = componentData
  }

  getHTML () {
    return `<div class="component">
               <div class="component_${this.componentData.type} component_label">${this.componentData.name}</div>
               <img class="component_${this.componentData.type} component_configuration" src="${images("./configuration.png")}">
               <img class="component_${this.componentData.type} component_icon"          src="${this.componentData.imageSrc}">
            </div>`
  }
}
