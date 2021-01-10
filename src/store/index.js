import Vue from 'vue';
import Vuex from 'vuex';

import { minifiguresActions, setsActions, toolsActions } from './actions';
import { minifiguresMutations, setsMutations, toolsMutations } from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: localStorage.getItem('darkMode') ? !!Number(localStorage.getItem('darkMode'))
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
    dollarRate: 0,
    error: null,
    loading: false,
    minifigures: [],
    isCardLayout: !!Number(localStorage.getItem('cardLayout')),
    isMobile: window.innerWidth < 600,
    statistics: {
      minifigures: {},
      sets: {},
      parts: {},
    },
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
  getters: {
    setsStatistics({ statistics }) {
      return [
        {
          title: Vue.prototype.$t('total'),
          value: statistics.sets.total || 0,
        },
        {
          title: Vue.prototype.$t('unique'),
          value: statistics.sets.unique || 0,
        },
        {
          title: Vue.prototype.$t('dups'),
          value: statistics.sets.total - statistics.sets.unique || 0,
        },
        {
          title: Vue.prototype.$t('overallPrice'),
          value: statistics.sets.totalPrice || 0,
        },
      ];
    },

    minifiguresStatistics({ statistics }) {
      return [
        {
          title: Vue.prototype.$t('total'),
          value: statistics.minifigures.total || 0,
        },
        {
          title: Vue.prototype.$t('unique'),
          value: statistics.minifigures.unique || 0,
        },
        {
          title: Vue.prototype.$t('dups'),
          value: statistics.minifigures.total - statistics.minifigures.unique || 0,
        },
        {
          title: Vue.prototype.$t('overallPrice'),
          value: statistics.minifigures.totalPrice || 0,
        },
      ];
    },
  },
});
