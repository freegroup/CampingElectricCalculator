
export default class ComponentHost {
  constructor() {
    this.componentRef = null  
  }

  getComponentContainer() {
    throw Error("Client must implement interface for ComponentHost")
  }

  setComponent(component) {
    this.componentRef = component.componentData
    this.getComponentContainer().innerHTML = component.getHTML()
    this.drawLines()
  }

  get type() {
    return this.componentRef.type
  }
}
