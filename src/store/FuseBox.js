
import components from "./FuseBox_data.js"

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.anschluesse - b.data.anschluesse)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "fuseBox"
    element.name = element.name + " (" + element.data.anschluesse + "x" + element.data.strom_je_anschluss + "A)"
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
    }
  }
}
