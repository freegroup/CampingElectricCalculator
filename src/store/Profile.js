import Empty from "./configuration/Empty.json"
import Default from "./configuration/Default.json"
import Pure100WShore from "./configuration/pure_100w_shore.json"
import Pure100WAlternator from "./configuration/pure_100w_alternator.json"
import Standard100wSmallCooler from "./configuration/standard_100w_small_cooler.json"
import Standard160wSmallCooler from "./configuration/standard_160w_small_cooler.json"
import Aboveaverage200wLightCooler from "./configuration/aboveaverage_200w_light_cooler.json"
import Power540Watt from "./configuration/power_540w.json"
import Power720Watt from "./configuration/power_720w.json"

export default {
  namespaced: true,
  state: {
    all: [
      {
        name: "low",
        children: [
          { id: "Pure100WShore", name: "100 Watt Solar + Charger", config: Pure100WShore }, 
          { id: "Pure100WAlternator", name: "100 Watt Solar + Alternator", config: Pure100WAlternator }
        ]
      },
      {
        name: "standard",
        children: [
          { id: "Standard100wSmallCooler", name: "100 Watt Solar with small cooler", config: Standard100wSmallCooler },
          { id: "Standard160wSmallCooler", name: "160 Watt Solar with small cooler, light", config: Standard160wSmallCooler }
        ]
      },
      {
        name: "aboveaverage",
        children: [
          { id: "Aboveaverage200wLightCooler", name: "200 Watt Solar with small cooler, light", config: Aboveaverage200wLightCooler }
        ]
      },
      {
        name: "power",
        children: [
          { id: "Power540Watt", name: "540 Watt Solar with AGM Battery, Fridge, Water Pump,...", config: Power540Watt },
          { id: "Power720Watt", name: "720 Watt Solar with LiFePO4 Battery, Fridge, Water Pump,...", config: Power720Watt }
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
      if (id === "new" ) {
        return { id: "new", name: "New", config: Empty }
      }

      if (id === "user" ) {
        if ( localStorage.getItem('configuration') ) {
          return JSON.parse( localStorage.getItem('configuration'))
        }
        return { id: "user", name: "User", config: Default }
      }

      let profiles = []
      state.all.forEach( profile => {
        profiles = profiles.concat( ...profile.children)
      })
      const entry = profiles.find( entry => entry.id === id )
      if ( entry ) {
        return entry
      }
      return { id: "default", name: "Standard", config: Default }
    }
  },

  mutations: {
    SET_USER_CONFIGURATION (state, payload) {
      localStorage.setItem('configuration', JSON.stringify({ id: "user", name: "User", config: payload }, undefined, 2))
    }
  }
}
