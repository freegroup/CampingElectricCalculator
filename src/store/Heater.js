
import components from "./Heater_data.js"

function longname(model) {
  return model.name + " (" + (model.data.heizleistung / 1000).toFixed(2) + " kW)"
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.strom - b.data.strom)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "heater"    
    element.longname = longname(element)
    element.data.watt = element.data.strom * element.data.spannung
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
