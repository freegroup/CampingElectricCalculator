
import components from "./SolarPanel_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.watt - b.data.watt)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "solarPanel"
    element.name = element.name + " (" + element.data.watt + " Watt)"
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
    getByUuid: (state, getters, rootState, rootGetters) => (uuid) => {
      return state.components.find(component => component.uuid === uuid)
    }
  },
  mutations: {
  }
}
