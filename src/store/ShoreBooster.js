import components from "./ShoreBooster_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.strom - b.data.strom)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "shoreBooster"
    element.data.watt = element.data.strom * element.data.spannung
    element.data.chargeSupport = element.data.chargeSupport.sort()
    element.name = element.name + " (" + element.data.strom + "A, " + element.data.chargeSupport.join(", ") + " )"
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
    }
  }
}
