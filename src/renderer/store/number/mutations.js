import * as type from "./mutation-type"

const mutations={
  [type.SET_ALL_RESULT](state,payload){
    state.numlist = payload;
  }
}

export default mutations