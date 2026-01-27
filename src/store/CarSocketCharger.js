import components from "./CarSocketCharger_data.js"
import { toFixed } from "@/utils/Wire.js"

function longname(model) {
  return model.name + " (" + toFixed(model.data.strom) + " A, " + toFixed(model.data.watt) + " W)"
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.watt - b.data.watt)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "carSocketCharger"
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
