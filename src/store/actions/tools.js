import axios from 'axios';
import Vuetify from '@/plugins/vuetify';
import http from '../../axios';
import {
  GET_DOLLAR_RATE,
  SET_LAYOUT,
  GET_THEMES,
  SET_DARK_MODE,
} from '../types';

export default {
  async [GET_DOLLAR_RATE]({ commit }) {
    const { data } = await axios.get('https://www.cbr-xml-daily.ru/latest.js');
    commit(GET_DOLLAR_RATE, data.rates.USD);
  },

  async [GET_THEMES]({ commit }) {
    let themes = null;

    if (!localStorage.getItem('categories')) {
      const { data } = await http.get('/themes');
      themes = data;
      localStorage.setItem('categories', JSON.stringify(themes));
    } else {
      themes = JSON.parse(localStorage.getItem('categories'));
    }

    commit(GET_THEMES, themes);
  },

  [SET_LAYOUT]({ commit }, payload) {
    localStorage.setItem('layout', payload);

    commit(SET_LAYOUT, String(payload));
  },

  [SET_DARK_MODE]({ commit }, payload) {
    Vuetify.framework.theme.dark = payload;
    commit(SET_DARK_MODE, payload);
  },
};
