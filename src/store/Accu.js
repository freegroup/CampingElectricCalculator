
import components from "./Accu_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.amperestunden - b.data.amperestunden)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "accu"
    element.name = element.name + " (" + element.data.amperestunden + "Ah, " + element.data.type + ")"
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
