
function htmlToElement(html) {
  var template = document.createElement('template')
  html = html.trim() // Never return a text node of whitespace as the result
  template.innerHTML = html
  return template.content.firstChild
}

function createCanvas(parent) {
  const canvas = document.createElement("canvas")
  parent.append(canvas)
  return canvas
}

function createSvg(parent) {
  const canvas = htmlToElement(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>`)
  parent.append(canvas)
  return canvas
}

function disableSelection(element) {
  element.onselectstart = () => false
  element.unselectable = "on"
  element.style.MozUserSelect = "none"
  element.style.cursor = "default"
}
function drawLine(svg, color, stroke, p0, p1, p2, p3) {
  // http://blogs.sitepointstatic.com/examples/tech/svg-curves/cubic-curve.html
  const path = `M${p0.x},${p0.y} C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
  const newpath = document.createElementNS('http://www.w3.org/2000/svg', "path")
  newpath.setAttributeNS(null, "d", path)
  newpath.setAttributeNS(null, "class", "node_line")
  newpath.setAttributeNS(null, "fill", "none")
  newpath.setAttributeNS(null, "stroke", color)
  newpath.setAttributeNS(null, "stroke-linecap", "round" )
  newpath.setAttributeNS(null, "stroke-width", stroke)
  svg.append(newpath)
  return newpath
}

function drawCircle(ctx, centerX, centerY, radius) {
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
  ctx.fillStyle = 'green'
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = '#003300'
  ctx.stroke()
}
// draws both cubic and quadratic bezier
function drawArrowLine(ctx, p0, p1, p2, p3, arrowLength, hasStartArrow, hasEndArrow) {
  ctx.lineCap = "round"
  ctx.imageSmoothingEnabled = true
  var x, y, norm, ex, ey
  function pointsToNormalisedVec(p, pp) {
    var len
    norm.y = pp.x - p.x
    norm.x = -(pp.y - p.y)
    len = Math.sqrt(norm.x * norm.x + norm.y * norm.y)
    norm.x /= len
    norm.y /= len
    return norm
  }

  var arrowWidth = arrowLength / 2
  norm = {}
  // defaults to true for both arrows if arguments not included
  hasStartArrow = hasStartArrow === undefined || hasStartArrow === null ? true : hasStartArrow
  hasEndArrow = hasEndArrow === undefined || hasEndArrow === null ? true : hasEndArrow
  ctx.beginPath()
  ctx.moveTo(p0.x, p0.y)
  if (p3 === undefined) {
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y)
    ex = p2.x // get end point
    ey = p2.y
    norm = pointsToNormalisedVec(p1, p2)
  } else {
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
    ex = p3.x // get end point
    ey = p3.y
    norm = pointsToNormalisedVec(p2, p3)
  }
  ctx.stroke()
  if (hasEndArrow) {
    ctx.beginPath()
    x = arrowWidth * norm.x + arrowLength * -norm.y
    y = arrowWidth * norm.y + arrowLength * norm.x
    ctx.moveTo(ex + x, ey + y)
    ctx.lineTo(ex, ey)
    x = arrowWidth * -norm.x + arrowLength * -norm.y
    y = arrowWidth * -norm.y + arrowLength * norm.x
    ctx.lineTo(ex + x, ey + y)
    ctx.closePath()
    ctx.fill()
  }
  if (hasStartArrow) {
    ctx.beginPath()
    norm = pointsToNormalisedVec(p0, p1)
    x = arrowWidth * norm.x - arrowLength * -norm.y
    y = arrowWidth * norm.y - arrowLength * norm.x
    ctx.moveTo(p0.x + x, p0.y + y)
    ctx.lineTo(p0.x, p0.y)
    x = arrowWidth * -norm.x - arrowLength * -norm.y
    y = arrowWidth * -norm.y - arrowLength * norm.x
    ctx.lineTo(p0.x + x, p0.y + y)
    ctx.closePath()
    ctx.fill()
  }
  ctx.stroke()
}

const CANVAS_WIDTH = 80
const ARROW_STROKE = 10
export { createSvg, createCanvas, disableSelection, drawLine, drawArrowLine, drawCircle, htmlToElement, CANVAS_WIDTH, ARROW_STROKE }
