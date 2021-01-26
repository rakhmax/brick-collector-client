import {
  addWishlist,
  deleteWishlist,
  getWishlist,
  updateWishlist,
} from '../../api/wishlist';
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
  async [GET_WISHLIST]({ commit, state }) {
    try {
      if (!state.wishlist.minifigures.length || !state.wishlist.sets.length) {
        state.loading = true;

        commit(GET_WISHLIST, await getWishlist());
        commit(GET_WISHLIST_SUCCESS);
      }
    } catch (error) {
      commit(GET_WISHLIST_ERROR, error);
      throw new Error(error);
    }
  },

  async [ADD_WISHLIST]({ commit, state }, payload) {
    try {
      state.saving = true;

      const { data } = await addWishlist(payload);

      let idx;
      let el;

      if (payload.type === 'M') {
        idx = state.wishlist.minifigures.findIndex((minifig) => minifig.itemId === data.itemId);
        el = state.wishlist.minifigures.find((minifig) => minifig.itemId === data.itemId);
      }
      if (payload.type === 'S') {
        idx = state.wishlist.sets.findIndex((set) => set.itemId === data.itemId);
        el = state.wishlist.sets.find((set) => set.itemId === data.itemId);
      }

      if (el) {
        el.qty += 1;
        commit(ADD_WISHLIST, { idx, el });
      } else {
        commit(ADD_WISHLIST, { type: payload.type, ...data });
      }

      commit(ADD_WISHLIST_SUCCESS);
    } catch (error) {
      commit(ADD_WISHLIST_ERROR, error);
      throw new Error(error);
    }
  },

  async [UPDATE_WISHLIST]({ commit, state }, payload) {
    try {
      state.saving = true;

      const { data } = await updateWishlist(payload);

      let idx;

      if (payload.type === 'M') {
        idx = state.minifigures.findIndex((minifig) => minifig.itemId === data.itemId);
      }
      if (payload.type === 'S') {
        idx = {
          minifigures: data.minifigures.map((minifig) => state.minifigures
            .findIndex((mf) => minifig.itemId === mf.itemId)),
          set: state.sets.findIndex((set) => set.itemId === data.set.itemId),
        };
      }

      commit(UPDATE_WISHLIST, { idx, data, type: payload.type });
      commit(UPDATE_WISHLIST_SUCCESS);
    } catch (error) {
      commit(UPDATE_WISHLIST_ERROR, error);
      throw new Error(error);
    }
  },

  async [DELETE_WISHLIST]({ commit, state }, { itemId }) {
    try {
      state.loading = true;

      const { data } = await deleteWishlist({ itemId });
      const filteredWishlistMinifigs = state.wishlist.minifigures
        .filter((minifig) => minifig.itemId !== data.itemId);
      const filteredSetsMinifigs = state.wishlist.sets
        .filter((minifig) => minifig.itemId !== data.itemId);

      commit(DELETE_WISHLIST, {
        minifigures: filteredWishlistMinifigs,
        sets: filteredSetsMinifigs,
      });
      commit(DELETE_WISHLIST_SUCCESS);
    } catch (error) {
      commit(DELETE_WISHLIST_ERROR, error);
      throw new Error(error);
    }
  },
};
