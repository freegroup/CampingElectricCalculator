
import components from "./Fridge_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.liter - b.data.liter)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "fridge"
    element.data.watt = element.data.strom * element.data.spannung
    element.name = element.name + " (" + element.data.liter + " Liter, " + element.data.watt + " Watt)"
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
