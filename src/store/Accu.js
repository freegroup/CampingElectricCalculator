
import components from "./Accu_data.js"
import { toFixed } from "@/utils/Wire.js"

function longname(model) {
  return `${model.name} (${toFixed(model.data.amperestunden)}Ah/${toFixed(model.data.spannung)}V, ${model.data.type})`
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.amperestunden - b.data.amperestunden)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "accu"
    element.longname = longname(element)
    // bring the attributes in a good oder for the user. We render this attributes in the UI in the order
    // they are named.
    element.data = {
      type: element.data.type,
      amperestunden: element.data.amperestunden,
      effective_amperestunden: element.data.effective_amperestunden, // es können die vollen 100Ah entnommen werden
      bms: element.data.bms,
      spannung: element.data.spannung,
      ladespannung: element.data.ladespannung
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
    getByUuid: (state, getters, rootState, rootGetters) => (uuid) => {
      return state.components.find(component => component.uuid === uuid)
    },
    longname: (state, getters, rootState, rootGetters) => (model) => {
      return longname(model)
    }
  }
}
