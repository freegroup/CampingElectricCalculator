/**
 * Turns the "data" object of a component into a flat list of rows for display.
 *
 * Most components have a flat data object, but some are nested - a solar set for example
 * carries a "panel" and a "controller" block. Iterating over the top level keys alone
 * would hand those objects straight to the template, which renders them as raw JSON.
 * Here a nested block becomes a heading followed by its indented values.
 *
 * @param {Object} data the "data" object of a component model
 * @param {Function} t the $t translation function of the calling component
 * @returns {Array} rows of either { path, label, group: true }
 *                  or { path, label, value, unit, indented }
 */
export function toDisplayRows (data, t, parentPath = []) {
  const rows = []
  if ( !data || typeof data !== "object" ) {
    return rows
  }

  Object.keys(data).forEach(key => {
    const value = data[key]
    const path = [...parentPath, key]
    const label = translate(t, "data.label." + key, key)

    // a nested block - a heading of its own, followed by its values
    if ( value !== null && typeof value === "object" && !Array.isArray(value) ) {
      rows.push({ path: path.join("."), label: label, group: true })
      rows.push(...toDisplayRows(value, t, path))
      return
    }

    rows.push({
      path: path.join("."),
      label: label,
      value: Array.isArray(value) ? value.join(", ") : value,
      unit: translate(t, "data.unit." + key, ""),
      indented: parentPath.length > 0
    })
  })

  return rows
}

/**
 * vue-i18n hands back the key itself when a translation is missing. Showing that raw key
 * to the user looks like a bug, so fall back to something readable.
 */
function translate (t, key, fallback) {
  const translated = t(key)
  return translated === key ? fallback : translated
}
