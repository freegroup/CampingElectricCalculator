
import components from "./SolarBooster_data.js"

export default {
  namespaced: true,
  state: {
    components: components
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
