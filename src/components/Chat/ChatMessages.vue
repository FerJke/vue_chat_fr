<template>
  <div class="chat-messages">
    <ChatMessage
      v-for="message in messages"
      :key="message._id"
      :message="message"
      :userId="userId"
    />
    <template v-if="isTyping">
      <p class="chat-messages__typing">Typing...</p>
    </template>
  </div>
</template>

<script>
import ChatMessage from '@/components/Chat/ChatMessage.vue';

export default {
  name: 'ChatMessages',
  components: {
    ChatMessage,
  },
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
    userId: {
      type: String,
      required: true,
    },
    isTyping: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-messages {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 15px;
  overflow-y: auto;

  &__typing {
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    color: #ccc;
    font-size: 12px;
  }
}
</style>
