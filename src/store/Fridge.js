
import components from "./Fridge_data.js"
import { toFixed } from "@/utils/Wire.js"

function longname(model) {
  return model.name + " (" + toFixed(model.data.liter) + " Liter)"
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.liter - b.data.liter)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "fridge"
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
