
import components from "./Alternator_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.spannung - b.data.spannung)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "alternator"
    element.name = element.name + " (" + element.data.spannung + "Volt)"
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
