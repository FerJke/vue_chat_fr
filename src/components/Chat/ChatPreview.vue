<template>
  <div
    class="chat-preview"
    :class="isSelectedChat"
    @click="selectChat"
  >
    <Avatar
      :content="logoLetter"
      fColor="#fff"
      :fWeight="600"
      bgColor="#767ece"
    />
    <div class="chat-preview__cont">
      <h5 class="chat-preview__title">{{ chatData.name }}</h5>
      <p class="chat-preview__msg">{{ lastMessage }}</p>
    </div>
    <div class="chat-preview__time">
      <span>{{ lastMessageTime | passedTime }}</span>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue';

export default {
  name: 'ChatPreview',
  components: {
    Avatar,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    logoLetter() {
      return this.chatData.name.slice(0, 1).toUpperCase();
    },
    lastMessage() {
      return this.chatData.lastMessage ? this.chatData.lastMessage.text : 'No message';
    },
    lastMessageTime() {
      return this.chatData.lastMessage ? this.chatData.lastMessage.time : '-';
    },
    isSelectedChat() {
      return {
        selected: this.isSelected,
      };
    },
  },
  methods: {
    selectChat() {
      this.$emit('select-chat', this.chatData._id);
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-preview {
  display: flex;
  padding: 8px 10px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  cursor: pointer;

  &:first-of-type {
    border-top: 1px solid #eee;
  }

  &.selected {
    background-color: #dcdcdc;
  }

  &__cont {
    flex-grow: 1;
    padding-left: 10px;
    overflow: hidden;
  }

  &__title {
    margin: 0;
    margin-bottom: 6px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__msg {
    margin: 0;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__time {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    max-width: 50px;

    span {
      display: inline-block;
      font-size: 10px;
      text-align: center;
    }
  }
}
</style>
