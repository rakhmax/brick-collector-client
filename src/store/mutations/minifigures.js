import {
  GET_MINIFIGURES,
  GET_MINIFIGURES_SUCCESS,
  GET_MINIFIGURES_ERROR,
  ADD_MINIFIGURE,
  ADD_MINIFIGURE_SUCCESS,
  ADD_MINIFIGURE_ERROR,
  UPDATE_MINIFIGURE,
  UPDATE_MINIFIGURE_SUCCESS,
  UPDATE_MINIFIGURE_ERROR,
  DELETE_MINIFIGURE,
  DELETE_MINIFIGURE_SUCCESS,
  DELETE_MINIFIGURE_ERROR,
} from '../types';

export default {
  [GET_MINIFIGURES](state, { data }) {
    state.minifigures = data.minifigs;
    state.statistics.minifigures = {
      total: data.total,
      unique: data.minifigs.length,
      totalPrice: state.minifigures.reduce((acc, minifig) => acc + Number(minifig.price), 0),
    };
  },
  [GET_MINIFIGURES_SUCCESS](state) {
    state.loading = false;
  },
  [GET_MINIFIGURES_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },

  [ADD_MINIFIGURE](state, payload) {
    if (Array.isArray(payload)) {
      state.minifigures.push(...payload);
    } else if (Object.prototype.hasOwnProperty.call(payload, 'idx')) {
      state.minifigures.splice(payload.idx, 1, payload.el);
    } else {
      state.minifigures.push(payload);
    }
  },
  [ADD_MINIFIGURE_SUCCESS](state) {
    state.saving = false;
  },
  [ADD_MINIFIGURE_ERROR](state, payload) {
    state.saving = false;
    state.error = payload;
  },

  [UPDATE_MINIFIGURE](state, { idx, data }) {
    state.minifigures.splice(idx, 1, data);
  },
  [UPDATE_MINIFIGURE_SUCCESS](state) {
    state.saving = false;
  },
  [UPDATE_MINIFIGURE_ERROR](state, payload) {
    state.saving = false;
    state.error = payload;
  },

  [DELETE_MINIFIGURE](state, data) {
    state.minifigures = data;
  },
  [DELETE_MINIFIGURE_SUCCESS](state) {
    state.loading = false;
  },
  [DELETE_MINIFIGURE_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },
};
