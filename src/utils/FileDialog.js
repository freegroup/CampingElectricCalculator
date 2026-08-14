/**
 * Opening and saving a JSON file from the browser.
 *
 * The File System Access API (showOpenFilePicker / showSaveFilePicker) exists only in
 * Chromium on the desktop. Firefox, Safari and every mobile browser - roughly three out
 * of four users - do not have it, and calling it there throws a TypeError that nobody
 * sees, so the buttons simply do nothing.
 *
 * Where the API is available it is used, because it gives the user a real "save as"
 * dialog. Everywhere else we fall back to the mechanisms that have always worked: a
 * hidden file input for opening and a download link for saving.
 */

const FILE_NAME = "CamperElectricConfiguration.json"
const MIME_TYPE = "application/json"

/**
 * Let the user pick a JSON file.
 * @returns {Promise<String|null>} the file content, or null if the user cancelled
 */
export async function openJsonFile () {
  if ( typeof window.showOpenFilePicker === "function" ) {
    let handles
    try {
      handles = await window.showOpenFilePicker({
        types: [{ description: "JSON Files", accept: { [MIME_TYPE]: [".json"] } }]
      })
    } catch (error) {
      // the user dismissed the dialog - not an error worth reporting
      if ( error.name === "AbortError" ) {
        return null
      }
      throw error
    }
    const file = await handles[0].getFile()
    return file.text()
  }

  return openViaInput()
}

/**
 * Hand a JSON file to the user for saving.
 * @returns {Promise<Boolean>} false if the user cancelled the save dialog
 */
export async function saveJsonFile (content) {
  const blob = new Blob([content], { type: `${MIME_TYPE};charset=utf-8` })

  if ( typeof window.showSaveFilePicker === "function" ) {
    let handle
    try {
      handle = await window.showSaveFilePicker({
        suggestedName: FILE_NAME,
        types: [{ accept: { [MIME_TYPE]: [".json"] } }],
        excludeAcceptAllOption: true
      })
    } catch (error) {
      if ( error.name === "AbortError" ) {
        return false
      }
      throw error
    }
    const writer = await handle.createWritable()
    await writer.write(blob)
    await writer.close()
    return true
  }

  downloadBlob(blob, FILE_NAME)
  return true
}

/**
 * Fallback for opening: a file input that is never shown.
 */
function openViaInput () {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = `.json,${MIME_TYPE}`
    input.style.display = "none"

    const done = (value) => {
      input.remove()
      resolve(value)
    }

    input.addEventListener("change", () => {
      const file = input.files[0]
      if ( !file ) {
        done(null)
        return
      }
      file.text().then(done, (error) => {
        input.remove()
        reject(error)
      })
    })
    // fired by the browser when the user dismisses the dialog without choosing anything
    input.addEventListener("cancel", () => done(null))

    document.body.append(input)
    input.click()
  })
}

/**
 * Fallback for saving: a download link that is never shown.
 */
function downloadBlob (blob, fileName) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  link.style.display = "none"

  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
