import $ from 'jquery'

/**
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
export default class Node {
  constructor() {
    this._parent = null
    this._mindmap = null
    this._deleteable = true
    this.children = []
    this.actionIcon = null
    this.html = null

    this.eventbinding_collapse = this._collapse.bind(this)
    this.eventbinding_click = this._click.bind(this)
    this.eventbinding_dblclick = this._dblclick.bind(this)
    this.eventbinding_mousedown = this._mousedown.bind(this)
    this.eventbinding_mouseup = this._mouseup.bind(this)
    this.eventbinding_mousemove = this._mousemove.bind(this)
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
   * @final
   * @private
   * */
  _click() {
    this.mindmap.setCurrentSelection(this)
  }

  /**
   * @final
   * @private
   * */
  _dblclick() {
    this.startEdit()
  }

  _mousedown() {
    this.mouseDown = true
  }

  _mouseup() {
    this.mouseDown = false
  }

  _mousemove() { }

  /**
   * @type HTMLElement
   * @final
   * */
  addNode(node) {
    this.children.push(node)
    this.childContainer.append(node.getHTMLElement())
    node.parent = this
    node.mindmap = this.mindmap
    this.hideAction(this.children.length === 0)
  }

  /**
   * @type HTMLElement
   * @final
   * */
  removeNode(node) {
    this.children = $.grep(this.children, (element) => element !== node)
    node.getHTMLElement().remove()
    node.parent = null
    node.mindmap = null
    this.hideAction(this.children.length === 0)
    this.drawLines()
  }

  deepCopy(node) {
    const clone = this.createEmptyChildNode()
    clone.getHTMLElement()
    const children = node.getChildren()
    children.forEach((child) => {
      clone.addNode(this.deepCopy(child))
    })

    return clone
  }

  /**
   * Set the parent node of this element.
   * @param {Node} parent
   */
  set parent(parent) {
    this._parent = parent
    if (this._parent !== null) this.drawLines()
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
   * Returns the children nodes of this object.<br>
   *
   * @type map.Array
   * */
  getChildren() {
    return this.children
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
  }

  get mindmap() {
    return this._mindmap
  }

  /**
   * Set the deleteable attribute of the node.
   *
   * @param {boolean} flag The deleteable flag
   * */
  setDeleteable(flag) {
    this._deleteable = flag
  }

  /**
   * Returns whenether the element is deletable
   *
   * @type boolean
   * */
  get deleteable() {
    return this._deleteable
  }

  /**
   * Returns the current assigned mindmap object.<br>
   *
   * @type map.Mindmap
   * */
  getMindmap() {
    return this.mindmap
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
      $(this.getAnchor()).removeClass('normal_node')
    } else {
      $(this.getAnchor()).removeClass('selected_node')
      $(this.getAnchor()).addClass('normal_node')
    }
  }

  /**
   *
   * @param {boolean} flag [true] if you want mark this element
   * */
  setHighlighted(flag) {
    if (flag) $(this.getAnchor()).addClass('highlighted_node')
    else $(this.getAnchor()).removeClass('highlighted_node')
  }

  /**
   * Hide the [+] Icon. Will be called if no children for this node are available.<br>
   * Called by the framework.
   *
   * @private
   * */
  hideAction(flag) {
    if (this.actionIcon === undefined) return

    if (flag) $(this.actionIcon).hide()
    else $(this.actionIcon).show()
  }

  /**
   * Returns an empty child node.<br>
   * Inherited classes can override this method to return node depending child nodes.<br>
   *
   * @type map.Node
   * @abstract
   * */
  createEmptyChildNode() {
    throw Error('subclass must implement this method')
  }

  /**
   * Event after the HTML has been generate.
   *
   * @private
   * */
  afterCreateHTML() {
    $(this.getAnchor()).on('mousedown', this.eventbinding_mousedown)
    $(this.getAnchor()).on('click', this.eventbinding_click)
    $(this.getAnchor()).on('dblclick', this.eventbinding_dblclick)
    $(this.getAnchor()).on('mouseup', this.eventbinding_mouseup)
    $(this.getAnchor()).on('mousemove', this.eventbinding_mousemove)

    $(this.actionIconIcon).on('mousedown', this.eventbinding_collapse)

    this.setSelected(false)
  }

  /**
   *
   * @private
   * */
  startEdit() {
    alert('start edit')
  }

  /**
   * @private
   * */
  getAnchor() {
    return this.labelDiv
  }

  /**
   * @private
   * */
  getAbsoluteAnchor() {
    return $(this.labelDiv).offset()
  }

  /**
   * @private
   * */
  getAnchorHeight() {
    return $(this.labelDiv).height()
  }

  /**
   * @private
   * */
  getAnchorBoundigBox() {
    const pos = this.getAbsoluteAnchor()
    pos.width = $(this.labelDiv).width()
    pos.height = $(this.labelDiv).height()
    return pos
  }

  /**
   * @private
   * */
  isOver(iX, iY) {
    const box = this.getAnchorBoundigBox()
    const iX2 = box.left + box.width
    const iY2 = box.top - box.height
    return iX >= box.left && iX <= iX2 && iY <= box.top && iY >= iY2
  }
}
