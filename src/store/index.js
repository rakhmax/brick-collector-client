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
          title: 'Total',
          value: statistics.sets.total || 0,
        },
        {
          title: 'Unique',
          value: statistics.sets.unique || 0,
        },
        {
          title: 'Duplicates',
          value: statistics.sets.total - statistics.sets.unique || 0,
        },
        {
          title: 'Overall Price',
          value: statistics.sets.totalPrice || 0,
        },
      ];
    },

    minifiguresStatistics({ statistics }) {
      return [
        {
          title: 'Total',
          value: statistics.minifigures.total || 0,
        },
        {
          title: 'Unique',
          value: statistics.minifigures.unique || 0,
        },
        {
          title: 'Duplicates',
          value: statistics.minifigures.total - statistics.minifigures.unique || 0,
        },
        {
          title: 'Overall Price',
          value: statistics.minifigures.totalPrice || 0,
        },
      ];
    },
  },
});
