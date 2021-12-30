import config from "./Configuration_data.js"

export default {
  namespaced: true,
  state: {
    config: config
  },
  actions: {
  },
  getters: {
    getCurrent: (state, getters, rootState, rootGetters) => () => {
      return state.config
    }
  },
  mutations: {
  }
}
