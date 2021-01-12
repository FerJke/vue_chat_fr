<template>
  <div class="chat-container">
    <template v-if="!isMessages">
      <ChatNoMessages />
    </template>
    <template v-else>
      <ChatMessages
        :messages="getCurrentChatMessages"
        :userId="getUser._id"
        :isTyping="isTyping"
      />
    </template>
    <template v-if="!isJoinCurrentChat">
      <ChatJoin @join-chat="onJoinChat"/>
    </template>
    <template v-else>
      <ChatPanel
        @typing-message="onTypingMessage"
        @submit-message="onSubmitMessage"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import emitters from '@/plugins/socket/emitters';
import listeners from '@/plugins/socket/listeners';
import ChatNoMessages from '@/components/Chat/ChatNoMessages.vue';
import ChatMessages from '@/components/Chat/ChatMessages.vue';
import ChatJoin from '@/components/Chat/ChatJoin.vue';
import ChatPanel from '@/components/Chat/ChatPanel.vue';

export default {
  name: 'ChatContainer',
  components: {
    ChatNoMessages,
    ChatMessages,
    ChatJoin,
    ChatPanel,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isTyping: false,
    $typingTimeout: null,
  }),
  computed: {
    ...mapGetters('chats', ['getCurrentChatMessages']),
    ...mapGetters('user', ['getUser']),
    isMessages() {
      return Boolean(this.getCurrentChatMessages.length);
    },
    isJoinCurrentChat() {
      return this.getUser.chats.includes(this.chatData._id);
    },
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    ...mapActions('chats', ['createNewMessage', 'addNewMessage']),
    setTyping() {
      if (this.$typingTimeout) {
        clearTimeout(this.$typingTimeout);
      }

      this.isTyping = true;

      this.$typingTimeout = setTimeout(() => {
        this.isTyping = false;
      }, 1000);
    },
    onJoinChat() {
      this.$socket.emit(emitters.JOIN_CHAT, {
        chatId: this.chatData._id,
        userId: this.getUser._id,
        userFullName: `${this.getUser.firstName} ${this.getUser.lastName}`,
      });
    },
    onTypingMessage() {
      this.$socket.emit(emitters.USER_TYPING, {
        chatId: this.chatData._id,
        userId: this.getUser._id,
      });
    },
    onSubmitMessage(text) {
      this.$socket.emit(emitters.NEW_MESSAGE, {
        chat: this.chatData._id,
        user: this.getUser._id,
        text,
      });
    },
  },
  mounted() {
    this.$socket.on(listeners.NEW_USER_JOIN, ({ userName, userId }) => {
      console.log(userName);
      if (userId === this.getUser._id) {
        this.getUserInfo();
      }
    });
    this.$socket.on(listeners.USER_TYPING, ({ chatId, userId }) => {
      if (userId !== this.getUser._id && chatId === this.chatData._id) {
        this.setTyping();
      }
    });
    this.$socket.on(listeners.NEW_MESSAGE, (message) => {
      this.addNewMessage(message);
    });
  },
};
</script>

<style lang="scss" scoped>
.chat-container {
  height: 100%;
  display: grid;
  grid-template-rows: calc(100% - 100px) 100px;
  overflow: hidden;
}
</style>
