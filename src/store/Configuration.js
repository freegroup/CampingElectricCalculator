import Default from "./configuration/Default.json"
import SolarOnly from "./configuration/SolarOnly.json"

export default {
  namespaced: true,
  state: {
  },
  actions: {
  },
  getters: {
    getById: (state, getters, rootState, rootGetters) => ( id) => {
      switch (id) {
        case "SolarOnly":
          return SolarOnly
        default:
          return Default
      }
    }
  },
  mutations: {
  }
}
