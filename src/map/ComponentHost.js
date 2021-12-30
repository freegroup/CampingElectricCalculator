
export default class ComponentHost {
  constructor() {
  }

  getComponentContainer() {
    throw Error("Client must implement interface for ComponentHost")
  }

  setComponent(component) {
    this.getComponentContainer().innerHTML = component.getHTML()
    this.drawLines()
  }
}
