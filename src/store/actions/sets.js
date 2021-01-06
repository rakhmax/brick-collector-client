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
      const idx = state.sets.findIndex((set) => set.itemId === data.set.itemId);
      const el = state.sets.find((set) => set.itemId === data.set.itemId);

      if (el) {
        el.count += 1;
        commit(ADD_SET, { idx, el });
      } else {
        commit(ADD_SET, data.set);
      }

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
        .filter((set) => set.itemId !== data.itemId);

      commit(DELETE_SET, filteredData);
      commit(DELETE_SET_SUCCESS);
    } catch (error) {
      commit(DELETE_SET_ERROR, error);
      throw new Error(error);
    }
  },
};
