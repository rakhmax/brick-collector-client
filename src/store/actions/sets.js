import {
  addSet,
  deleteSet,
  getSets,
} from '../../api/sets';
import { getMinifigures } from '../../api/minifigures';
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
  GET_MINIFIGURES,
  GET_MINIFIGURES_SUCCESS,
  GET_MINIFIGURES_ERROR,
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

  async [SET_SETS]({ commit, state }, payload) {
    try {
      state.saving = true;
      const { data } = await addSet(payload);
      commit(SET_SETS, data.set);
      commit(SET_SETS_SUCCESS);

      // TODO replace get with set
      try {
        commit(GET_MINIFIGURES, await getMinifigures());
        commit(GET_MINIFIGURES_SUCCESS);
      } catch (error) {
        commit(GET_MINIFIGURES_ERROR, error);
        throw new Error(error);
      }
    } catch (error) {
      commit(SET_SETS_ERROR, error);
      throw new Error(error);
    }
  },

  async [DELETE_SETS]({ commit, state }, payload) {
    try {
      state.loading = true;
      const { data } = await deleteSet(payload);

      const filteredData = state.sets
        .filter((set) => set.itemId !== data.itemId);

      commit(DELETE_SETS, filteredData);
      commit(DELETE_SETS_SUCCESS);
    } catch (error) {
      commit(DELETE_SETS_ERROR, error);
      throw new Error(error);
    }
  },
};
