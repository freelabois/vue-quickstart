import Vue from 'vue'
import Vuex from 'vuex'
import { exampleStore } from './modules/example'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    example: exampleStore,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
})
