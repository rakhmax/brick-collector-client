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
    state.sets.push(payload);
  },
  [SET_SETS_SUCCESS](state) {
    state.saving = false;
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
  },
  [DELETE_SETS_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },
};
