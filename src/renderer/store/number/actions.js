import * as types from "./mutation-type"

const actions = {
  addfn({ commit }, payload){
    commit(types.SET_ALL_RESULT, payload)
  }
}

export default actions