import GitHubAuth from '@/utils/GitHubAuth.js'

export default {
  namespaced: true,
  state: {
    isLoggedIn: false,
    user: null
  },
  mutations: {
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    async init({ commit }) {
      const isLoggedIn = await GitHubAuth.init()
      commit('SET_LOGIN_STATUS', isLoggedIn)
      if (isLoggedIn) {
        const user = GitHubAuth.getUser()
        commit('SET_USER', user)
      }
    },
    login({ commit }) {
      GitHubAuth.login()
    },
    logout({ commit }) {
      GitHubAuth.logout()
      commit('SET_LOGIN_STATUS', false)
      commit('SET_USER', null)
    },
    updateLoginStatus({ commit }) {
      const isLoggedIn = GitHubAuth.isLoggedIn()
      commit('SET_LOGIN_STATUS', isLoggedIn)
      if (isLoggedIn) {
        const user = GitHubAuth.getUser()
        commit('SET_USER', user)
      } else {
        commit('SET_USER', null)
      }
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user
  }
}
