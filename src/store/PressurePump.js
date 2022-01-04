
import components from "./PressurePump_data.js"

export default {
  namespaced: true,
  state: {
    components: components
  },
  getters: {
    getByUuid: (state, getters, rootState, rootGetters) => (uuid) => {
      return state.components.find(component => component.uuid === uuid)
    }
  }
}
