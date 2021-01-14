import {
  GET_DOLLAR_RATE,
  GET_CATEGORIES,
  SET_LAYOUT,
  SET_DARK_MODE,
} from '../types';

export default {
  [GET_DOLLAR_RATE](state, payload) {
    state.dollarRate = payload;
  },
  [GET_CATEGORIES](state, payload) {
    state.categories = payload;
  },
  [SET_LAYOUT](state, payload) {
    state.layout = payload;
  },
  [SET_DARK_MODE](state, payload) {
    state.darkMode = payload;
  },
};
