const state = {
  main: 0
}

const getters = {
  SHOW_MAIN(state) {
    return state.main
  }
}

const mutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER(state, payload) {
    state.main += payload
  }
}

const actions = {
  someAsyncTask({ commit }, payload) {
    console.log(payload)
    commit('INCREMENT_MAIN_COUNTER', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
