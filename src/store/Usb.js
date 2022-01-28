
import components from "./Usb_data.js"

function longname(model) {
  if ( model.data.spannung_min === model.data.spannung_max ) {
    return `${model.name} (${model.data.spannung_min} V)`
  }
  return `${model.name} (${model.data.spannung_min}-${model.data.spannung_max} V)`
}

function sortComponents (payload) {
  return payload.sort((a, b) => a.data.strom - b.data.strom)
}

function enrichComponents (payload) {
  payload.forEach(element => {
    element.type = "usb"
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
