import {
  GET_SETS,
  GET_SETS_SUCCESS,
  GET_SETS_ERROR,
  SET_SETS,
  SET_SETS_SUCCESS,
  SET_SETS_ERROR,
  DELETE_SETS,
  DELETE_SETS_SUCCESS,
  DELETE_SETS_ERROR,
} from '../types';

export default {
  [GET_SETS](state, { data }) {
    state.sets = data;
  },
  [GET_SETS_SUCCESS](state) {
    state.loading = false;
  },
  [GET_SETS_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },

  [SET_SETS](state, payload) {
    if (Array.isArray(payload)) {
      state.sets.push(...payload);
    } else if (Object.prototype.hasOwnProperty.call(payload, 'idx')) {
      state.sets.splice(payload.idx, 1, payload.el);
    } else {
      state.sets.push(payload);
    }
  },
  [SET_SETS_SUCCESS](state) {
    state.saving = false;
    state.minifigures = [];
  },
  [SET_SETS_ERROR](state, payload) {
    state.saving = false;
    state.error = payload;
  },

  [DELETE_SETS](state, data) {
    state.sets = data;
  },
  [DELETE_SETS_SUCCESS](state) {
    state.loading = false;
    state.minifigures = [];
  },
  [DELETE_SETS_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },
};
