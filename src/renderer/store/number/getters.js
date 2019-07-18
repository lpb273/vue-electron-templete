
const getters ={
  addNum(state) {
    return state.numlist.map(item => item += 3)
  }
}

export default getters