
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
/**
 * @param {Object} color a pair of { base, hover } from LINE_PRODUCER / LINE_CONSUMER
 */
function drawLine(svg, color, stroke, p0, p1, p2, p3) {
  // http://blogs.sitepointstatic.com/examples/tech/svg-curves/cubic-curve.html
  const path = `M${p0.x},${p0.y} C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`

  const group = document.createElementNS('http://www.w3.org/2000/svg', "g")
  group.setAttributeNS(null, "class", "node_line")
  // handed to the stylesheet, which does the switching on hover
  group.style.setProperty("--line-color", color.base)
  group.style.setProperty("--line-color-hover", color.hover)

  // A line of a few pixels is nearly impossible to hit with the mouse - and without a hit
  // the user never notices that it reacts at all. So the same curve is drawn a second time,
  // invisible but much wider, and that one catches the pointer.
  const hitArea = document.createElementNS('http://www.w3.org/2000/svg', "path")
  hitArea.setAttributeNS(null, "d", path)
  hitArea.setAttributeNS(null, "class", "node_line_hitarea")
  hitArea.setAttributeNS(null, "fill", "none")
  hitArea.setAttributeNS(null, "stroke", "transparent")
  hitArea.setAttributeNS(null, "stroke-width", HIT_AREA_STROKE)
  group.append(hitArea)

  // Outline in the hover colour, hidden until the pointer is on the line. Together with
  // the line brightening to that same colour it reads as the line growing thicker, and it
  // avoids the contrast problem a dark outline has under a dark line.
  const outline = document.createElementNS('http://www.w3.org/2000/svg', "path")
  outline.setAttributeNS(null, "d", path)
  outline.setAttributeNS(null, "class", "node_line_outline")
  outline.setAttributeNS(null, "fill", "none")
  outline.setAttributeNS(null, "stroke", color.hover)
  outline.setAttributeNS(null, "stroke-linecap", "round")
  outline.setAttributeNS(null, "stroke-width", stroke + OUTLINE_STROKE)
  group.append(outline)

  const newpath = document.createElementNS('http://www.w3.org/2000/svg', "path")
  newpath.setAttributeNS(null, "d", path)
  newpath.setAttributeNS(null, "class", "node_line_visible")
  newpath.setAttributeNS(null, "fill", "none")
  newpath.setAttributeNS(null, "stroke", color.base)
  newpath.setAttributeNS(null, "stroke-linecap", "round" )
  newpath.setAttributeNS(null, "stroke-width", stroke)
  group.append(newpath)

  svg.append(group)
  return group
}

/**
 * Width of a connection line, derived from its share of the overall flow.
 *
 * The share is NaN as long as nothing is consumed yet - a fresh setup has no load, so
 * there is no share to compute. "NaN > minimum" is false, which is exactly what we want:
 * the minimum width is used. Math.max() would have handed the NaN straight through to
 * stroke-width, where the browser discards it and falls back to a 1px hairline.
 */
function lineWidth (minimum, percentage) {
  const width = ARROW_STROKE * percentage
  return width > minimum ? width : minimum
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
// width of the invisible path that catches the pointer for a connection line
const HIT_AREA_STROKE = 18
// how much wider than the line itself its hover outline is drawn - half of it shows on
// each side, so this is twice the border thickness the user actually sees
const OUTLINE_STROKE = 4

// Colours of the connection lines. The resting tone is the darker one so the line stands
// out against the light map; on hover it switches to the lighter variant and the outline
// appears in that same colour.
const LINE_PRODUCER = { base: "#0288D1", hover: "#5CC9FA" }
const LINE_CONSUMER = { base: "#AD1457", hover: "#E91E63" }
export { createSvg, createCanvas, disableSelection, drawLine, lineWidth, drawArrowLine, drawCircle, htmlToElement, CANVAS_WIDTH, LINE_PRODUCER, LINE_CONSUMER }
