import Empty from "./configuration/Empty.json"
import Default from "./configuration/Default.json"
import Pure100WShore from "./configuration/pure_100w_shore.json"
import Pure100WAlternator from "./configuration/pure_100w_alternator.json"
import Standard100wSmallCooler from "./configuration/standard_100w_small_cooler.json"
import Standard160wSmallCooler from "./configuration/standard_160w_small_cooler.json"
import Aboveaverage200wLightCooler from "./configuration/aboveaverage_200w_light_cooler.json"
import Power540Watt from "./configuration/power_540w.json"
import Power720Watt from "./configuration/power_720w.json"

const USER_CONFIGURATION_KEY = 'configuration'
const CORRUPT_CONFIGURATION_KEY = 'configuration.corrupted'

/**
 * Rough structural check of a configuration. Only verifies that the parts the map
 * relies on are present at all - the detailed, per component check happens while
 * building the map, because only there we know which components still exist.
 */
function hasExpectedShape (config) {
  return !!config &&
    typeof config === "object" &&
    !!config.center &&
    typeof config.center === "object" &&
    Array.isArray(config.left) &&
    Array.isArray(config.right)
}

/**
 * Read the configuration the user worked on last. The data comes from the localStorage
 * and can be unreadable for all kind of reasons outside of our control (aborted write,
 * exceeded quota, manual edit, ...).
 *
 * In this case we never let the app die: we move the unreadable data aside - so the user
 * keeps a chance to recover it by hand and the app heals itself on the next start - and
 * fall back to the default configuration. The returned "loadProblem" tells the view which
 * message it should show to the user.
 */
function readUserConfiguration () {
  const stored = localStorage.getItem(USER_CONFIGURATION_KEY)
  if (!stored) {
    return { id: "user", name: "User", config: Default }
  }

  let configuration = null
  try {
    configuration = JSON.parse(stored)
  } catch (error) {
    configuration = null
  }

  if (configuration && hasExpectedShape(configuration.config)) {
    return configuration
  }

  // Keep the broken data around for a possible manual rescue, but get it out of the way
  // so the user is not greeted by the same problem on every single start.
  try {
    localStorage.setItem(CORRUPT_CONFIGURATION_KEY, stored)
    localStorage.removeItem(USER_CONFIGURATION_KEY)
  } catch (error) {
    // Storage is not writable. Nothing we can do about it - the fallback below still works.
  }

  return { id: "user", name: "User", config: Default, loadProblem: "storageCorrupt" }
}

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
        return readUserConfiguration()
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
      try {
        localStorage.setItem(USER_CONFIGURATION_KEY, JSON.stringify({ id: "user", name: "User", config: payload }, undefined, 2))
      } catch (error) {
        // Storage full or blocked (private mode, ...). Losing the auto save is annoying but
        // it must never interrupt the user while editing the map.
      }
    }
  }
}
