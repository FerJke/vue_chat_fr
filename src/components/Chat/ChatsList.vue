<template>
  <div class="chats-list">
    <ChatPreview
      v-for="chat in publicChats"
      :key="chat._id"
      :chatData="chat"
      :isSelected="chat._id === selectedChat"
      v-on:select-chat="onSelectChat"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import emitters from '@/plugins/socket/emitters';
import ChatPreview from '@/components/Chat/ChatPreview.vue';

export default {
  name: 'ChatsList',
  components: {
    ChatPreview,
  },
  data: () => ({}),
  computed: {
    ...mapGetters('chats', ['publicChats', 'getSelectedChatId']),
    ...mapGetters('user', ['getUser']),
    selectedChat() {
      return this.getSelectedChatId;
    },
  },
  watch: {
    getUser: 'setChatOnGetUser',
  },
  methods: {
    ...mapActions('chats', ['getPublicChats', 'selectChat']),
    setChatId(id) {
      if (id === this.getSelectedChatId) return;

      this.selectChat(id);
      this.$socket.emit(emitters.SELECT_CHAT, { chatId: id });
    },
    onSelectChat(id) {
      this.setChatId(id);
      this.$router.push({ query: { chatId: id } });
    },
    setChatOnGetUser(user) {
      if (!this.$route.query.chatId || !user._id) return;
      this.setChatId(this.$route.query.chatId);
    },
  },
  mounted() {
    this.getPublicChats();
  },
};
</script>

<style lang="scss" scoped></style>
