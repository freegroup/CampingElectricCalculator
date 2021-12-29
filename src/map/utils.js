import $ from 'jquery'

var createCanvas = function (parent) {
  var canvas = document.createElement('canvas')
  $(canvas).addClass('mindmapCanvas')
  parent.append(canvas)
  return canvas
}

var disableSelection = function (element) {
  element.onselectstart = () => false
  element.unselectable = 'on'
  element.style.MozUserSelect = 'none'
  element.style.cursor = 'default'
}

export { createCanvas, disableSelection }
