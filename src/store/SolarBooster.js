
import components from "./SolarBooster_data.js"
import { toFixed } from "@/utils/Wire.js"

function longname(model) {
  return model.name + " (" + toFixed(model.data.eingangswatt) + " Watt)"
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.eingangswatt - b.data.eingangswatt)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "solarBooster"
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
