
import components from "./Light_data.js"

export default {
  namespaced: true,
  state: {
    components
  },
  getters: {
    getByUuid: (state, getters, rootState, rootGetters) => (uuid) => {
      return state.components.find(component => component.uuid === uuid)
    }
  }
}
