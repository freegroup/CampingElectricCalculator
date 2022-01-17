
import components from "./SolarSet_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.panel.watt - b.data.panel.watt)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "solarSet"
    element.noteableAttributes = []
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
