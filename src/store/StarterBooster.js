
import components from "./StarterBooster_data.js"

function longname(model) {
  return model.name + " (" + model.data.strom + " A)"
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.strom - b.data.strom)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "starterBooster"
    element.longname = longname(element)
    element.data.chargeSupport = element.data.chargeSupport.sort()
  })
  return payload
}

export default {
  namespaced: true,
  state: {
    components: enrichComponents(sortComponents(components))
  },
  getters: {
    getByUuid: (state, getters, rootState, rootGetters) => (id) => {
      return state.components.find(component => component.uuid === id)
    },
    longname: (state, getters, rootState, rootGetters) => (model) => {
      return longname(model)
    }
  }
}
