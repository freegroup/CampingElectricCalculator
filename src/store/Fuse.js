
import components from "./Fuse_data.js"
import { toFixed } from "@/utils/Wire.js"

function longname(model) {
  return model.name + " (" + toFixed(model.data.strom) + " A)"
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.strom - b.data.strom)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "fuse"
    element.longname = longname(element)
  })
  return payload
}

export default {
  namespaced: true,
  state: {
    components: enrichComponents(sortComponents(components))
  },
  getters: {
    getByUuid: (state, getters, rootState, rootGetters) => (id) => {
      return state.components.find(component => component.uuid === id)
    },
    longname: (state, getters, rootState, rootGetters) => (model) => {
      return longname(model)
    },
    getEnumValues: (state) => (fieldName) => {
      // Define which fields are enums
      const enumFields = ['type']
      
      // Check if the requested field is an enum
      if (!enumFields.includes(fieldName)) {
        return null
      }
      
      // Extract unique values for this enum field
      const values = new Set()
      
      state.components.forEach(comp => {
        if (comp.data && comp.data[fieldName] !== undefined) {
          values.add(comp.data[fieldName])
        }
      })
      
      // Return sorted array of enum values
      return Array.from(values).sort()
    }
  }
}
