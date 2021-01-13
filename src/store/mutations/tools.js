import {
  GET_DOLLAR_RATE,
  GET_THEMES,
  GET_IS_MOBILE,
  SET_LAYOUT,
  SET_DARK_MODE,
} from '../types';

export default {
  [GET_DOLLAR_RATE](state, payload) {
    state.dollarRate = payload;
  },
  [GET_THEMES](state, payload) {
    state.themes = payload;
  },
  [GET_IS_MOBILE](state, payload) {
    state.isMobile = payload;
  },
  [SET_LAYOUT](state, payload) {
    state.layout = payload;
  },
  [SET_DARK_MODE](state, payload) {
    state.darkMode = payload;
  },
};
