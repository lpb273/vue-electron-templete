import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modulesA from './modules'
import number from "./number"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    modulesA,
    number
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
