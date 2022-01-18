
import components from "./SwitchPanel_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.strom - b.data.strom)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "switchPanel"
    element.data.watt = element.data.strom * element.data.spannung * element.data.buchsen
    element.name = element.name + " (" + element.data.schalter + "x" + element.data.strom_je_anschluss + "A)"
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
