import axios from '@/plugins/axios';
import mutations from '../mutations';

const {
  SET_USER,
  PROFILE_LOADER,
} = mutations;

const userStorage = {
  namespaced: true,
  state: {
    user: null,
    isLoading: false,
  },
  getters: {
    getUser: ({ user }) => user,
    getIsLoading: ({ isLoading }) => isLoading,
  },
  mutations: {
    [SET_USER](state, payload) {
      state.user = payload;
    },
    [PROFILE_LOADER](state, bool) {
      state.isLoading = bool;
    },
  },
  actions: {
    setUser({ commit }, userData) {
      commit(SET_USER, userData);
    },
    async getUserInfo({ commit, dispatch }) {
      try {
        const user = await axios.get('/user');
        commit(SET_USER, user.data[0]);
      } catch (err) {
        dispatch('loadMessage', { message: err.message, type: 'error' }, { root: true });
      }
    },
    async crateUserInfo({ commit, dispatch }, data) {
      try {
        commit(PROFILE_LOADER, true);
        await axios.post('/user', data);
        await dispatch('getUserInfo');
        dispatch('loadMessage', { message: 'User created', type: 'success' }, { root: true });
      } catch (err) {
        dispatch('loadMessage', { message: err.message, type: 'error' }, { root: true });
      } finally {
        commit(PROFILE_LOADER, false);
      }
    },
    async updateUserInfo({ commit, dispatch }, data) {
      try {
        commit(PROFILE_LOADER, true);
        await axios.put('/user', data);
        await dispatch('getUserInfo');
        dispatch('loadMessage', { message: 'User data updated', type: 'success' }, { root: true });
      } catch (err) {
        dispatch('loadMessage', { message: err.message, type: 'error' }, { root: true });
      } finally {
        commit(PROFILE_LOADER, false);
      }
    },
  },
};

export default userStorage;
