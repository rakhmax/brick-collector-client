import {
  addMinifigure,
  deleteMinifigure,
  getMinifigures,
} from '../../api/minifigures';
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
  async [GET_MINIFIGURES]({ commit, state }) {
    try {
      if (!state.minifigures.length) {
        state.loading = true;
        commit(GET_MINIFIGURES, await getMinifigures());
        commit(GET_MINIFIGURES_SUCCESS);
      }
    } catch (error) {
      commit(GET_MINIFIGURES_ERROR, error);
      throw new Error(error);
    }
  },

  async [SET_MINIFIGURES]({ commit, state }, payload) {
    try {
      state.saving = true;

      const { data } = await addMinifigure(payload);
      const idx = state.minifigures.findIndex((minifig) => minifig.itemId === data.itemId);
      const el = state.minifigures.find((minifig) => minifig.itemId === data.itemId);

      if (el) {
        el.count += 1;
        commit(SET_MINIFIGURES, { idx, el });
      } else {
        commit(SET_MINIFIGURES, data);
      }

      commit(SET_MINIFIGURES_SUCCESS);
    } catch (error) {
      commit(SET_MINIFIGURES_ERROR, error);
      throw new Error(error);
    }
  },

  async [DELETE_MINIFIGURES]({ commit, state }, payload) {
    try {
      state.loading = true;
      const { data } = await deleteMinifigure(payload);

      const filteredData = state.minifigures
        .filter((minifigure) => minifigure.itemId !== data.itemId);

      commit(DELETE_MINIFIGURES, filteredData);
      commit(DELETE_MINIFIGURES_SUCCESS);
    } catch (error) {
      commit(DELETE_MINIFIGURES_ERROR, error);
      throw new Error(error);
    }
  },
};
