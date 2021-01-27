import Vue from 'vue';
import Vuex from 'vuex';

import {
  minifiguresActions,
  setsActions,
  toolsActions,
  wishlistActions,
} from './actions';
import {
  minifiguresMutations,
  setsMutations,
  toolsMutations,
  wishlistMutations,
} from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: localStorage.getItem('darkMode') ? !!Number(localStorage.getItem('darkMode'))
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
    dollarRate: 0,
    error: null,
    loading: false,
    minifigures: [],
    layout: localStorage.getItem('layout'),
    isMobile: window.innerWidth < 600,
    saving: false,
    sets: [],
    categories: [],
    wishlist: {
      minifigures: [],
      sets: [],
    },
  },
  mutations: {
    ...minifiguresMutations,
    ...setsMutations,
    ...toolsMutations,
    ...wishlistMutations,
  },
  actions: {
    ...minifiguresActions,
    ...setsActions,
    ...toolsActions,
    ...wishlistActions,
  },
});
