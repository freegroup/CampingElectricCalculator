
import components from "./SolarSet_data.js"

function longname(model) {
  return model.name
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.panel.watt - b.data.panel.watt)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "solarSet"
    element.longname = longname(element)
    element.noteableAttributes = []
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
