import mutations from '../mutations';

const { SHOW_NOTIFY } = mutations;

const notificationStore = {
  state: {
    messagePool: [],
  },
  getters: {
    getLastMessage: ({ messagePool }) => messagePool[messagePool.length - 1],
  },
  mutations: {
    [SHOW_NOTIFY]({ messagePool }, msg) {
      messagePool.push(msg);
    },
  },
  actions: {
    loadMessage({ commit }, payload = {}) {
      commit(SHOW_NOTIFY, payload);
    },
  },
};

export default notificationStore;
