import Default from "./configuration/Default.json"
import Pure100WShore from "./configuration/pure_100w_shore.json"
import Pure100WAlternator from "./configuration/pure_100w_alternator.json"
import Standard100wSmallCooler from "./configuration/standard_100w_small_cooler.json"
import Standard160wSmallCooler from "./configuration/standard_160w_small_cooler.json"
import Aboveaverage200wLightCooler from "./configuration/aboveaverage_200w_light_cooler.json"
import Power540Watt from "./configuration/power_540w.json"

export default {
  namespaced: true,
  state: {
    all: [
      {
        name: "low",
        setups: [
          { id: "Pure100WShore", label: "100 Watt Solar + Charger", config: Pure100WShore }, 
          { id: "Pure100WAlternator", label: "100 Watt Solar + Alternator", config: Pure100WAlternator }
        ]
      },
      {
        name: "standard",
        setups: [
          { id: "Standard100wSmallCooler", label: "100 Watt Solar with small cooler", config: Standard100wSmallCooler },
          { id: "Standard160wSmallCooler", label: "160 Watt Solar with small cooler, light", config: Standard160wSmallCooler }
        ]
      },
      {
        name: "aboveaverage",
        setups: [
          { id: "Aboveaverage200wLightCooler", label: "200 Watt Solar with small cooler, light", config: Aboveaverage200wLightCooler }
        ]
      },
      {
        name: "power",
        setups: [
          { id: "Power540Watt", label: "540 Watt Solar with AGM Battery, Fridge, Water Pump,...", config: Power540Watt }
        ]
      }
    ]
  },
  actions: {
    saveUserConfiguration ({ commit }, payload) {
      commit('SET_USER_CONFIGURATION', payload)
    }
  },
  getters: {
    getById: (state, getters, rootState, rootGetters) => (id) => {
      if (id === "user" ) {
        if ( localStorage.getItem('configuration') ) {
          return JSON.parse( localStorage.getItem('configuration'))
        }
        return { id: "user", label: "User", config: Default }
      }

      let profiles = []
      state.all.forEach( profile => {
        profiles = profiles.concat( ...profile.setups)
      })
      const entry = profiles.find( entry => entry.id === id )
      if ( entry ) {
        return entry
      }
      return { id: "default", label: "Standard", config: Default }
    }
  },
  mutations: {
    SET_USER_CONFIGURATION (state, payload) {
      localStorage.setItem('configuration', JSON.stringify({ id: "user", label: "User", config: payload }, undefined, 2))
    }
  }
}
