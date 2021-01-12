<template>
  <div class="chat-wrapper">
    <template v-if="!currentChat">
      <ChatEmpty />
    </template>
    <template v-else>
      <ChatContainer :chatData="currentChat" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChatEmpty from '@/components/Chat/ChatEmpty.vue';
import ChatContainer from '@/components/Chat/ChatContainer.vue';

export default {
  name: 'ChatWrapper',
  components: {
    ChatEmpty,
    ChatContainer,
  },
  computed: {
    ...mapGetters('chats', ['getcurrentChat']),
    currentChat() {
      return this.getcurrentChat;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-wrapper {
  padding: 10px 15px;
  overflow: hidden;
}
</style>
