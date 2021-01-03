import Vue from 'vue';
import Vuex from 'vuex';

import { minifiguresActions, toolsActions } from './actions';
import { minifiguresMutations, toolsMutations } from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    dollarRate: 0,
    error: null,
    loading: false,
    minifigures: [],
    saving: false,
    sets: [],
    themes: [],
  },
  mutations: {
    ...minifiguresMutations,
    ...toolsMutations,
  },
  actions: {
    ...minifiguresActions,
    ...toolsActions,
  },
  modules: {
  },
});
