
import components from "./SolarBooster_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.eingangswatt - b.data.eingangswatt)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "solarBooster"
    element.data.chargeSupport = element.data.chargeSupport.sort()
    element.name = element.name + " (" + element.data.eingangswatt + " Watt)"
  })
  return payload
}

export default {
  namespaced: true,
  state: {
    components: enrichComponents(sortComponents(components))
  },
  actions: {
  },
  getters: {
    getByUuid: (state, getters, rootState, rootGetters) => (id) => {
      return state.components.find(component => component.uuid === id)
    }
  },
  mutations: {
  }
}
