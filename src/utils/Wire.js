const delta = 0.02
// Leitfähigkeit von Kupfer in m/(Ohm*mm^2). Normwert für handelsübliche Kupferleitungen.
// Muss mit dem Wert übereinstimmen, den die Formelerklärung nennt (i18n: wireCalculator.info.variables.conductivity)
const gamma = 56

// handelsübliche Querschnitte in mm²
const diameters = [1, 2.5, 4, 6, 8, 10, 16, 25, 35, 50, 60, 100, 150, 200, 500]

// Eine Versorgungsspannung von 0 V würde durch null teilen. Das passiert mit den generischen
// Komponenten, deren Spannung so lange 0 ist, bis der Anwender sie gesetzt hat. In dem Fall
// wird mit 1 V weitergerechnet: das Ergebnis ist bewusst sehr groß und damit als "hier fehlt
// noch eine Angabe" erkennbar, statt die Berechnung mit einer Ausnahme abbrechen zu lassen.
const minSpannung = 1

function querschnitt (laengeInCm, strom, spannung) {
  const u = spannung > 0 ? spannung : minSpannung
  return ((laengeInCm / 100) * 2 * strom) / ( delta * u * gamma)
}

function kabelquerschnitt (laengeInCm, strom, spannung) {
  const q = querschnitt(laengeInCm, strom, spannung) * 1.12 // 12% Sicherheit dazurechnen
  const sorted = [...diameters, q].sort( (a, b) => a - b )
  const index = sorted.indexOf(q)
  // liegt der Bedarf über jedem Normquerschnitt, gibt es keinen nächstgrößeren mehr.
  // Dann den größten zurückgeben - "undefined" würde beim Anzeigen zur Ausnahme führen.
  return sorted[index + 1] !== undefined ? sorted[index + 1] : diameters[diameters.length - 1]
}

function toFixed(value) {
  if ( isNaN(value) ) {
    return value
  }
  // return value.toFixed(2).replace(/\.00$/, '')
  return parseFloat(value.toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1'))
}

export { kabelquerschnitt, delta, gamma, querschnitt, toFixed }
