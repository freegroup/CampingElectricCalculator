
import components from "./SolarPanel_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.watt - b.data.watt)
}

export default {
  namespaced: true,
  state: {
    components: sortComponents(components)
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
