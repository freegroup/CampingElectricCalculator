
import components from "./DCDCBooster_data.js"
import { toFixed } from "@/utils/Wire.js"

function longname(model) {
  return `${model.name} (${toFixed(model.data.spannung_in)}V &#8680; ${toFixed(model.data.spannung_out)}V)`
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.strom - b.data.strom)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "dcdcBooster"
    element.longname = longname(element)
    element.data = {
      // name all attributes again in a good order. The UI renders the attribute in that order
      spannung_in: element.data.spannung_in,
      strom_in: toFixed(element.data.strom_out * element.data.spannung_out) / element.data.spannung_in,
      spannung_out: element.data.spannung_out,
      strom_out: element.data.strom_out
    }
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
