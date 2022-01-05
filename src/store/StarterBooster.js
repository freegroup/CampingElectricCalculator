
import components from "./StarterBooster_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.strom - b.data.strom)
}

export default {
  namespaced: true,
  state: {
    components: sortComponents(components)
  },
  getters: {
    getByUuid: (state, getters, rootState, rootGetters) => (id) => {
      return state.components.find(component => component.uuid === id)
    }
  }
}
