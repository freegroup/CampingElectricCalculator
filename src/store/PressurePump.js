
import components from "./PressurePump_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.durchfluss - b.data.durchfluss)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "pressurePump"
    element.data.watt = element.data.strom * element.data.spannung
    element.name = element.name + " (" + element.data.durchfluss + " l/m, " + element.data.druck + " bar)"
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
    }
  }
}
