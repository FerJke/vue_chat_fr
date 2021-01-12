import axios from '@/plugins/axios';
import mutations from '../mutations';

const {
  SET_PUBLIC_CHATS,
  SET_SELECTED_CHAT_ID,
  CURRENT_CHAT,
  CURRENT_CHAT_MESSAGESS,
  SENDING_MSG,
  ADD_NEW_MSG,
} = mutations;

const chatsStore = {
  namespaced: true,
  state: {
    publicChats: [],
    selectedChatId: null,
    currentChat: null,
    currentChatMessages: [],
    sendingMsg: false,
  },
  getters: {
    publicChats: ({ publicChats }) => publicChats,
    getSelectedChatId: ({ selectedChatId }) => selectedChatId,
    getcurrentChat: ({ currentChat }) => currentChat,
    getCurrentChatMessages: ({ currentChatMessages }) => currentChatMessages,
  },
  mutations: {
    [SET_PUBLIC_CHATS](state, payload) {
      state.publicChats = payload;
    },
    [SET_SELECTED_CHAT_ID](state, id) {
      state.selectedChatId = id;
    },
    [CURRENT_CHAT](state, payload) {
      state.currentChat = payload;
    },
    [CURRENT_CHAT_MESSAGESS](state, payload) {
      state.currentChatMessages = payload;
    },
    [SENDING_MSG](state, payload) {
      state.sendingMsg = payload;
    },
    [ADD_NEW_MSG](state, payload) {
      state.currentChatMessages.push(payload);
    },
  },
  actions: {
    async getPublicChats({ commit }) {
      try {
        const chats = await axios.get('/chats/public');
        commit(SET_PUBLIC_CHATS, chats.data);
      } catch (err) {
        console.error(err);
      }
    },
    async getSelectedChat({ commit }, id) {
      try {
        const chat = await axios.get(`/chats/${id}`);
        commit(CURRENT_CHAT, chat.data);
      } catch (err) {
        console.error(err);
      }
    },
    async getSelectedChatMsgs({ commit }, id) {
      try {
        const messages = await axios.get(`/messages/chat/${id}`);
        commit(CURRENT_CHAT_MESSAGESS, messages.data);
      } catch (err) {
        console.error(err);
        commit(CURRENT_CHAT_MESSAGESS, []);
      }
    },
    selectChat({ commit, dispatch }, id) {
      commit(SET_SELECTED_CHAT_ID, id);
      dispatch('getSelectedChat', id);
      dispatch('getSelectedChatMsgs', id);
    },
    addNewMessage({ commit }, message) {
      commit(ADD_NEW_MSG, message);
    },
  },
};

export default chatsStore;
