import {
  GET_SETS,
  GET_SETS_SUCCESS,
  GET_SETS_ERROR,
  ADD_SET,
  ADD_SET_SUCCESS,
  ADD_SET_ERROR,
  UPDATE_SET,
  UPDATE_SET_ERROR,
  UPDATE_SET_SUCCESS,
  DELETE_SET,
  DELETE_SET_SUCCESS,
  DELETE_SET_ERROR,
} from '../types';

export default {
  [GET_SETS](state, { data }) {
    state.sets = data.sets;
    state.statistics.sets = {
      total: data.total,
      unique: data.sets.length,
      totalPrice: state.sets.reduce((acc, set) => acc + Number(set.price), 0),
    };
  },
  [GET_SETS_SUCCESS](state) {
    state.loading = false;
  },
  [GET_SETS_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },

  [ADD_SET](state, payload) {
    if (Array.isArray(payload)) {
      state.sets.push(...payload);
    } else if (Object.prototype.hasOwnProperty.call(payload, 'idx')) {
      state.sets.splice(payload.idx, 1, payload.el);
    } else {
      state.sets.push(payload);
    }
  },
  [ADD_SET_SUCCESS](state) {
    state.saving = false;
    state.minifigures = [];
  },
  [ADD_SET_ERROR](state, payload) {
    state.saving = false;
    state.error = payload;
  },

  [UPDATE_SET](state, { idx, data }) {
    state.sets.splice(idx, 1, data);
  },
  [UPDATE_SET_SUCCESS](state) {
    state.saving = false;
  },
  [UPDATE_SET_ERROR](state, payload) {
    state.saving = false;
    state.error = payload;
  },

  [DELETE_SET](state, data) {
    state.sets = data;
  },
  [DELETE_SET_SUCCESS](state) {
    state.loading = false;
    state.minifigures = [];
  },
  [DELETE_SET_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },
};
