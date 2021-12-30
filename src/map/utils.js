function createCanvas(parent) {
  const canvas = document.createElement('canvas')
  parent.append(canvas)
  return canvas
}

function disableSelection(element) {
  element.onselectstart = () => false
  element.unselectable = 'on'
  element.style.MozUserSelect = 'none'
  element.style.cursor = 'default'
}

export { createCanvas, disableSelection }
