const delta = 0.02
const gamma = 57.18

function querschnitt (laengeInMeter, strom, spannung) {
  return ((laengeInMeter / 100) * 2 * strom) / ( delta * spannung * gamma)
}
  
function kabelquerschnitt (laengeInMeter, strom, spannung) {
  const q = querschnitt(laengeInMeter, strom, spannung) * 1.12 // 12% Sicherheit dazurechnen
  let diameters = [1, 2.5, 4, 6, 8, 10, 16, 25, 35, 50, 60, 100, 150, 200, 500, q]
  diameters = diameters.sort( (a, b) => a - b )
  const index = diameters.indexOf(q)
  return diameters[index + 1]
}

function toFixed(value) {
  if ( isNaN(value) ) {
    return value
  }
  // return value.toFixed(2).replace(/\.00$/, '')
  return parseFloat(value.toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1'))
}

export { kabelquerschnitt, delta, gamma, querschnitt, toFixed }
