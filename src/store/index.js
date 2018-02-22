import Vue from 'vue'
import Vuex from 'vuex'

import mType from './mType'
import header from './header'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navId: 0
  },
  mutations: {
    [mType.UPDATE_NAV_ID](state, id) {
      state.navId = id
    }
  },
  modules: {
    header
  }
})
