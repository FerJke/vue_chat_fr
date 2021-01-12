import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/plugins/firebase';
import { getFirebaseUserToken } from '@/services/firebase/auth';
import authGuard from '@/guards/auth.guard';
import { setItemToLocalStorage, removeLocalStorageItem } from '@/utils/localStorage';
import authStore from './modules/auth';
import user from './modules/user';
import notifications from './modules/notifications';
import chats from './modules/chats';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authStore,
    user,
    notifications,
    chats,
  },
});

auth.onAuthStateChanged(async (userData) => {
  store.dispatch('authStatusHandler', Boolean(userData));

  if (userData) {
    const token = await getFirebaseUserToken();
    setItemToLocalStorage(process.env.VUE_APP_LS_TOKEN, token);
    store.dispatch('user/getUserInfo');
  } else {
    removeLocalStorageItem(process.env.VUE_APP_LS_TOKEN);
    store.dispatch('user/setUser', null);
  }
});

authGuard(store);

export default store;
