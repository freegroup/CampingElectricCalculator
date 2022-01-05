function createCanvas(parent) {
  const canvas = document.createElement("canvas")
  parent.append(canvas)
  return canvas
}

function disableSelection(element) {
  element.onselectstart = () => false
  element.unselectable = "on"
  element.style.MozUserSelect = "none"
  element.style.cursor = "default"
}

// draws both cubic and quadratic bezier
function drawArrowLine(ctx, p0, p1, p2, p3, arrowLength, hasStartArrow, hasEndArrow) {
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

export { createCanvas, disableSelection, drawArrowLine }
