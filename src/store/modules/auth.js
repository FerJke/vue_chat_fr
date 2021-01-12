import { signIn, regFirebase, resetPassword } from '@/services/firebase/auth';
import { readLocalStorageItem } from '@/utils/localStorage';
import mutations from '../mutations';

const {
  SET_AUTH_STATUS,
  LOGIN_LOADER,
} = mutations;

const authStore = {
  namespaced: true,
  state: {
    isAuth: readLocalStorageItem(process.env.VUE_APP_LS_TOKEN),
    loginLoader: false,
  },
  getters: {
    getUserAuth: ({ isAuth }) => isAuth,
    getLoginLoader: ({ loginLoader }) => loginLoader,
  },
  mutations: {
    [SET_AUTH_STATUS](state, bool) {
      state.isAuth = bool;
    },
    [LOGIN_LOADER](state, bool) {
      state.loginLoader = bool;
    },
  },
  actions: {
    authStatusHandler: {
      handler({ commit }, bool) {
        commit(SET_AUTH_STATUS, bool);
      },
      root: true,
    },

    async login({ commit, dispatch }, { email, password }) {
      try {
        commit(LOGIN_LOADER, true);
        await signIn(email, password);
      } catch (err) {
        dispatch('loadMessage', { message: err.message, type: 'error' }, { root: true });
      } finally {
        commit(LOGIN_LOADER, false);
      }
    },

    async registration({ commit, dispatch }, { email, password }) {
      try {
        commit(LOGIN_LOADER, true);
        await regFirebase(email, password);
      } catch (err) {
        dispatch('loadMessage', { message: err.message, type: 'error' }, { root: true });
      } finally {
        commit(LOGIN_LOADER, false);
      }
    },

    async forgotPassword({ commit, dispatch }, email) {
      try {
        commit(LOGIN_LOADER, true);
        await resetPassword(email);
        dispatch('loadMessage', { message: 'A letter has been sent to your Email', type: 'success' }, { root: true });
      } catch (err) {
        dispatch('loadMessage', { message: err.message, type: 'error' }, { root: true });
      } finally {
        commit(LOGIN_LOADER, false);
      }
    },
  },
};

export default authStore;
