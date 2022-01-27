
import components from "./FuseBox_data.js"

function longname(model) {
  return model.name + " (" + model.data.anschluesse + " x " + model.data.strom_je_anschluss + "A)"
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.anschluesse - b.data.anschluesse)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "fuseBox"
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
    getByUuid: (state, getters, rootState, rootGetters) => (id) => {
      return state.components.find(component => component.uuid === id)
    },
    longname: (state, getters, rootState, rootGetters) => (model) => {
      return longname(model)
    }
  }
}
