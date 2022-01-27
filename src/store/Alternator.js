
import components from "./Alternator_data.js"

function longname(model) {
  return model.name + " (" + model.data.spannung + " Volt)"
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.spannung - b.data.spannung)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "alternator"
    element.longname = longname(element)
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
    },
    longname: (state, getters, rootState, rootGetters) => (model) => {
      return longname(model)
    }
  }
}
