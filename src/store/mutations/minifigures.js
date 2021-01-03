import {
  GET_MINIFIGURES,
  GET_MINIFIGURES_SUCCESS,
  GET_MINIFIGURES_ERROR,
  SET_MINIFIGURES,
  SET_MINIFIGURES_SUCCESS,
  SET_MINIFIGURES_ERROR,
  DELETE_MINIFIGURES,
  DELETE_MINIFIGURES_SUCCESS,
  DELETE_MINIFIGURES_ERROR,
} from '../types';

export default {
  [GET_MINIFIGURES](state, { data }) {
    state.minifigures = data;
  },
  [GET_MINIFIGURES_SUCCESS](state) {
    state.loading = false;
  },
  [GET_MINIFIGURES_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },

  [SET_MINIFIGURES](state, payload) {
    state.minifigures.push(payload);
  },
  [SET_MINIFIGURES_SUCCESS](state) {
    state.saving = false;
  },
  [SET_MINIFIGURES_ERROR](state, payload) {
    state.saving = false;
    state.error = payload;
  },

  [DELETE_MINIFIGURES](state, data) {
    state.minifigures = data;
  },
  [DELETE_MINIFIGURES_SUCCESS](state) {
    state.loading = false;
  },
  [DELETE_MINIFIGURES_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },
};
