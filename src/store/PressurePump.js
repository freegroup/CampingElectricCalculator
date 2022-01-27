
import components from "./PressurePump_data.js"

function longname(model) {
  return model.name + " (" + model.data.durchfluss + " l/m, " + model.data.druck + " bar)"
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.durchfluss - b.data.durchfluss)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "pressurePump"
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
    getByUuid: (state, getters, rootState, rootGetters) => (uuid) => {
      return state.components.find(component => component.uuid === uuid)
    },
    longname: (state, getters, rootState, rootGetters) => (model) => {
      return longname(model)
    }
  }
}
