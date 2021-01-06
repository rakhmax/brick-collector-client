import Vue from 'vue';
import Vuex from 'vuex';

import { minifiguresActions, setsActions, toolsActions } from './actions';
import { minifiguresMutations, setsMutations, toolsMutations } from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    dollarRate: 0,
    error: null,
    loading: false,
    minifigures: [],
    statistics: {},
    saving: false,
    sets: [],
    themes: [],
  },
  mutations: {
    ...minifiguresMutations,
    ...setsMutations,
    ...toolsMutations,
  },
  actions: {
    ...minifiguresActions,
    ...setsActions,
    ...toolsActions,
  },
  modules: {
  },
});
