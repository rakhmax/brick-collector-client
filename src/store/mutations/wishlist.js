import {
  GET_WISHLIST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_ERROR,
  ADD_WISHLIST,
  ADD_WISHLIST_SUCCESS,
  ADD_WISHLIST_ERROR,
  UPDATE_WISHLIST,
  UPDATE_WISHLIST_SUCCESS,
  UPDATE_WISHLIST_ERROR,
  DELETE_WISHLIST,
  DELETE_WISHLIST_SUCCESS,
  DELETE_WISHLIST_ERROR,
} from '../types';

export default {
  [GET_WISHLIST](state, { data }) {
    state.wishlist = data;
  },
  [GET_WISHLIST_SUCCESS](state) {
    state.loading = false;
  },
  [GET_WISHLIST_ERROR](state, payload) {
    state.loading = false;
    state.error = payload;
  },

  [ADD_WISHLIST](state, payload) {
    if (payload.type === 'M') {
      if (Array.isArray(payload)) {
        state.wishlist.minifigures.push(...payload);
      } else if (Object.prototype.hasOwnProperty.call(payload, 'idx')) {
        state.wishlist.minifigures.splice(payload.idx, 1, payload.el);
      } else {
        state.wishlist.minifigures.push(payload);
      }
    }
    if (payload.type === 'S') {
      if (Array.isArray(payload)) {
        state.wishlist.sets.push(...payload);
      } else if (Object.prototype.hasOwnProperty.call(payload, 'idx')) {
        state.wishlist.sets.splice(payload.idx, 1, payload.el);
      } else {
        state.wishlist.sets.push(payload);
      }
    }
  },
  [ADD_WISHLIST_SUCCESS](state) {
    state.saving = false;
  },
  [ADD_WISHLIST_ERROR](state, payload) {
    state.saving = false;
    state.error = payload;
  },

  [UPDATE_WISHLIST](state, { idx, data, type }) {
    if (type === 'M') {
      state.minifigures.push(data);
      state.wishlist.minifigures.splice(idx, 1);
    }
    if (type === 'S') {
      state.minifigures.push(...data.minifigures);
      state.wishlist.minifigures.splice(idx, 1);
      state.sets.push(data.set);
      state.wishlist.sets.splice(idx, 1);
    }
  },
  [UPDATE_WISHLIST_SUCCESS](state) {
    state.saving = false;
  },
  [UPDATE_WISHLIST_ERROR](state, payload) {
    state.saving = false;
    state.error = payload;
  },

  [DELETE_WISHLIST](state, { minifigures, sets }) {
    state.wishlist.minifigures = minifigures;
    state.wishlist.sets = sets;
  },
  [DELETE_WISHLIST_SUCCESS](state) {
    state.saving = false;
  },
  [DELETE_WISHLIST_ERROR](state, payload) {
    state.saving = false;
    state.error = payload;
  },
};
