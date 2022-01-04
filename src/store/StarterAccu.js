
import components from "./StarterAccu_data.js"

export default {
  namespaced: true,
  state: {
    components: components
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
