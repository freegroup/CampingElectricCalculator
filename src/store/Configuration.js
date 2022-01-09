import Default from "./configuration/Default.json"
import Empty from "./configuration/Empty.json"
import SolarOnly100W from "./configuration/SolarOnly100W.json"

export default {
  namespaced: true,
  state: {
    all: [
      { id: "user", label: "User Defined Configuration", config: Default }, 
      { id: "new", label: "Empty Setup", config: Empty }, 
      { id: "default", label: "Standard", config: Default }, 
      { id: "solarOnly100W", label: "100 Watt Solar", config: SolarOnly100W }
    ]
  },
  actions: {
    saveUserConfiguration ({ commit }, payload) {
      commit('SET_USER_CONFIGURATION', payload)
    }
  },
  getters: {
    getById: (state, getters, rootState, rootGetters) => (id) => {
      if (id === "user" && localStorage.getItem('configuration')) {
        return JSON.parse( localStorage.getItem('configuration'))
      }

      const entry = state.all.find( element => element.id === id)
      if ( entry ) {
        return entry
      }
      return state.all[1]
    }
  },
  mutations: {
    SET_USER_CONFIGURATION (state, payload) {
      state.all[0].config = payload
      localStorage.setItem('configuration', JSON.stringify(state.all[0], undefined, 2))
    }
  }
}
