
import components from "./StarterAccu_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.strom - b.data.strom)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "starterAccu"
  })
  return payload
}

export default {
  namespaced: true,
  state: {
    components: enrichComponents(sortComponents(components))
  },
  getters: {
    getByUuid: (state, getters, rootState, rootGetters) => (uuid) => {
      return state.components.find(component => component.uuid === uuid)
    }
  }
}
