import {
  addSet,
  deleteSet,
  getSets,
  updateSet,
} from '../../api/sets';
import {
  GET_SETS,
  GET_SETS_SUCCESS,
  GET_SETS_ERROR,
  ADD_SET,
  ADD_SET_SUCCESS,
  ADD_SET_ERROR,
  UPDATE_SET,
  UPDATE_SET_SUCCESS,
  UPDATE_SET_ERROR,
  DELETE_SET,
  DELETE_SET_SUCCESS,
  DELETE_SET_ERROR,
  ADD_MINIFIGURE,
  DELETE_WISHLIST,
} from '../types';

export default {
  async [GET_SETS]({ commit, state }) {
    try {
      if (!state.sets.length) {
        state.loading = true;

        commit(GET_SETS, await getSets());
        commit(GET_SETS_SUCCESS);
      }
    } catch (error) {
      commit(GET_SETS_ERROR, error);
      throw new Error(error);
    }
  },

  async [ADD_SET]({ commit, state }, payload) {
    try {
      state.saving = true;

      const { data } = await addSet(payload);
      const idx = state.sets.findIndex((set) => set.itemId === data.itemId);
      let el;

      if (idx !== -1) {
        el = state.sets.find((set) => set.itemId === data.itemId);
      }

      if (el) {
        el.qty += 1;
        commit(ADD_SET, { idx, el });
      } else {
        commit(ADD_SET, data.set);
      }

      commit(ADD_MINIFIGURE, data.minifigures);

      commit(ADD_SET_SUCCESS);
    } catch (error) {
      commit(ADD_SET_ERROR, error);
      throw new Error(error);
    }
  },

  async [UPDATE_SET]({ commit, state }, payload) {
    try {
      state.saving = true;

      const { data } = await updateSet(payload);
      const idx = state.sets.findIndex((set) => set.itemId === data.itemId);

      commit(UPDATE_SET, { idx, data });
      commit(UPDATE_SET_SUCCESS);
    } catch (error) {
      commit(UPDATE_SET_ERROR, error);
      throw new Error(error);
    }
  },

  async [DELETE_SET]({ commit, state }, payload) {
    try {
      state.loading = true;

      const { data } = await deleteSet(payload);
      const filteredData = state.sets
        .filter((set) => set.itemId !== data.set.itemId);
      const filteredWishlist = state.wishlist.sets
        .filter((minifig) => minifig.itemId !== data.itemId);

      if (data.minifigures) {
        data.minifigures.forEach((minifig) => {
          const idx = state.minifigures.findIndex((item) => item.itemId === minifig.itemId);
          state.minifigures.splice(idx, 1, minifig);
        });
      }
      commit(DELETE_SET, filteredData);
      commit(DELETE_WISHLIST, {
        minifigures: state.wishlist.minifigures,
        sets: filteredWishlist,
      });
      commit(DELETE_SET_SUCCESS);
    } catch (error) {
      commit(DELETE_SET_ERROR, error);
      throw new Error(error);
    }
  },
};
