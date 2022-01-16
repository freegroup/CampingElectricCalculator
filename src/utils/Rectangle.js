export default class Rectangle {
  constructor(x, y, w, h) {
    // try to consume any kind rectangle definitions
    //
    if (x instanceof Rectangle) {
      y = x.y
      w = x.w
      h = x.h
      x = x.x
    } else if (typeof x.x === "number" && typeof x.y === "number") {
      y = x.y
      w = x.w | x.width
      h = x.h | x.height
      x = x.x
    } else if (typeof x.top === "number" && typeof x.left === "number") {
      y = x.top
      w = x.w | x.width
      h = x.h | x.height
      x = x.left
    }
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  resize(dw, dh) {
    this.w += dw
    this.h += dh
    return this
  }

  /**
   *
   * The width of the dimension element.
   *
   * @returns {Number}
   **/
  getWidth() {
    return this.w
  }

  /**
   *
   * Set the new width of the rectangle.
   *
   * @param {Number} w the new width of the rectangle
   * @returns  {this}
   */
  setWidth(w) {
    this.w = w
    return this
  }

  /**
   *
   * The height of the dimension element.
   *
   * @returns {Number}
   **/
  getHeight() {
    return this.h
  }

  /**
   *
   * Set the new height of the rectangle.
   *
   * @param {Number} h the new height of the rectangle
   * @returns  {this}
   */
  setHeight(h) {
    this.h = h
    return this
  }

  /**
   *
   * The x coordinate of the left corner.
   *
   * @returns {Number}
   **/
  getLeft() {
    return this.x
  }

  /**
   *
   * The x coordinate of the right corner.
   *
   * @returns {Number}
   **/
  getRight() {
    return this.x + this.w
  }

  /**
   *
   * The y coordinate of the top.
   *
   *@return {Number}
   **/
  getTop() {
    return this.y
  }

  /**
   *
   * The y coordinate of the bottom.
   *
   *@return {Number}
   **/
  getBottom() {
    return this.y + this.h
  }

  /**
   * Merge this rectangle with the given one.
   *
   * @param {draw2d.geo.Rectangle} rect
   * @since 4.8.0
   * @returns  {this}
   */
  merge(rect) {
    const r = Math.max(rect.getRight(), this.getRight())
    const b = Math.max(rect.getBottom(), this.getBottom())

    this.x = Math.min(this.x, rect.x)
    this.y = Math.min(this.y, rect.y)

    this.w = r - this.x
    this.h = b - this.y

    return this
  }
}
