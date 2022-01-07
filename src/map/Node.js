import $ from 'jquery'
import GenericNode from './GenericNode'

/**
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
export default class Node extends GenericNode {
  constructor() {
    super()
    this._parent = null
    this._mindmap = null

    this.children = []
    this.leftSide = false
    this.html = null
    this.labelDiv = null
  }

  getComponentContainer () {
    return this.labelDiv
  }

  /**
   * @final
   * @private
   * */
  _collapse(event) {
    $(this.childrenContainer).toggle()
    event.stopPropagation()
    this.drawLines()
  }

  /**
   * @type HTMLElement
   * @final
   * */
  addNode(node) {
    this.children.push(node)
    this.childContainer.append(node.getHTMLElement())
    node.parent = this
    node.mindmap = this.mindmap
    this.updateStatusIcons()
  }

  /**
   * @type HTMLElement
   * @final
   * */
  removeNode(node) {
    this.children = $.grep(this.children, (element) => element !== node)
    node.html.remove()
    node.parent = null
    node.mindmap = null
    this.updateStatusIcons()
    this.drawLines()
  }

  /**
   * Set the parent node of this element.
   * @param {Node} parent
   */
  set parent(parent) {
    this._parent = parent
    this._parent !== null && this.drawLines()
    this.renderModel()
  }

  /**
   * Returns the parent node of this object.<br>
   *
   * @type map.Node
   * */
  get parent() {
    return this._parent
  }

  /**
   *
   * @private
   * */
  get visible() {
    return $(this.childrenContainer).css('visibility') !== 'hidden'
  }

  /**
   * Set the to root mindmap element of this node.
   *
   * @param {Mindmap} mindmap the mindmap of the element
   * */
  set mindmap(mindmap) {
    this._mindmap = mindmap
    this.children.forEach((child) => (child.mindmap = mindmap))
    this.renderModel()
  }

  get mindmap() {
    return this._mindmap
  }

  /**
   * Called by the framework to inform this element that this node
   * has been selected.<br>
   * The node is responsible to change the graphical representation.<br>
   * Subclases can override this method to customize the style of the node
   * in the selected mode.
   *
   * @param {boolean} flag [true] if you want mark this element as selected
   * */
  setSelected(flag) {
    if (flag === true) {
      $(this.getAnchor()).addClass('selected_node')
    } else {
      $(this.getAnchor()).removeClass('selected_node')
    }
  }

  /**
   * */
  getAnchor() {
    return this.labelDiv
  }

  /**
   * */
  getAbsoluteAnchor() {
    return $(this.labelDiv).offset()
  }

  /**
   * */
  getAnchorHeight() {
    return $(this.labelDiv).height()
  }

  /**
   * */
  getAnchorBoundigBox() {
    const pos = this.getAbsoluteAnchor()
    pos.width = $(this.labelDiv).width()
    pos.height = $(this.labelDiv).height()
    return pos
  }

  /**
   *
   * @private
   * */
  adjustCanvasHeight() {
    this.canvas.setAttribute('height', 5)
    const height = $(this.childrenContainer).outerHeight()
    this.canvas.setAttribute('height', height)

    return height
  }  

  /**
   * Event after the HTML has been generate.
   *
   * */
  afterCreateHTML() {
    $(this.addChildIcon).on('click', this.eventbinding_collapse)

    $(this.addChildIcon).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentAddChild(this, this.leftSide)
    })

    $(this.statusbarDiv).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentTimer(this)
    })

    $(this.gaugeIcon).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentBalance(this)
    })

    $(this.configIcon).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentConfigure(this)
    })

    $(this.deleteIcon).on("click", event => {
      event.stopPropagation()
      this.mindmap.onComponentRemoveChild(this)
    })

    $(this.errorIcon).on("click", (event) => {
      event.stopPropagation()
      this.mindmap.onComponentShowErrors(this)
    })

    $(this.infoIcon).on("click", (event) => {
      event.stopPropagation()
      this.mindmap.onComponentShowInfo(this)
    })

    this.setSelected(false)

    this.setOperationHours(this.model.operationHours)
  }
}
