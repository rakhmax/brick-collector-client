import {
  addMinifigure,
  deleteMinifigure,
  getMinifigures,
  updateMinifigure,
} from '../../api/minifigures';
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

  async [ADD_MINIFIGURE]({ commit, state }, payload) {
    try {
      state.saving = true;

      const { data } = await addMinifigure(payload);
      const idx = state.minifigures.findIndex((minifig) => minifig.itemId === data.itemId);
      const el = state.minifigures.find((minifig) => minifig.itemId === data.itemId);

      if (el) {
        el.count += 1;
        commit(ADD_MINIFIGURE, { idx, el });
      } else {
        commit(ADD_MINIFIGURE, data);
      }

      commit(ADD_MINIFIGURE_SUCCESS);
    } catch (error) {
      commit(ADD_MINIFIGURE_ERROR, error);
      throw new Error(error);
    }
  },

  async [UPDATE_MINIFIGURE]({ commit, state }, payload) {
    try {
      state.saving = true;

      const { data } = await updateMinifigure(payload);
      const idx = state.minifigures.findIndex((set) => set.itemId === data.itemId);

      commit(UPDATE_MINIFIGURE, { idx, data });
      commit(UPDATE_MINIFIGURE_SUCCESS);
    } catch (error) {
      commit(UPDATE_MINIFIGURE_ERROR, error);
      throw new Error(error);
    }
  },

  async [DELETE_MINIFIGURE]({ commit, state }, payload) {
    try {
      state.loading = true;

      const { data } = await deleteMinifigure(payload);
      const filteredData = state.minifigures
        .filter((minifig) => minifig.itemId !== data.itemId);

      commit(DELETE_MINIFIGURE, filteredData);
      commit(DELETE_MINIFIGURE_SUCCESS);
    } catch (error) {
      commit(DELETE_MINIFIGURE_ERROR, error);
      throw new Error(error);
    }
  },
};
