import Default from "./configuration/Default.json"
import SolarOnly100W from "./configuration/SolarOnly100W.json"

export default {
  namespaced: true,
  state: {
    all: [
      { id: "Default", label: "Standard", config: Default }, 
      { id: "SolarOnly100W", label: "100 Watt Solar", config: SolarOnly100W }
    ]
  },
  actions: {
  },
  getters: {
    getById: (state, getters, rootState, rootGetters) => (id) => {
      switch (id) {
        case "SolarOnly100W":
          return SolarOnly100W
        default:
          return Default
      }
    }
  },
  mutations: {
  }
}
