<template>
  <div class="chat-message" :class="classes">
    <Avatar :content="logo" />
    <div class="chat-message__content">
      <p class="author">{{ fullName }}</p>
      <p class="text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue';

export default {
  name: 'ChatMessage',
  components: {
    Avatar,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    logo() {
      return this.message.user.firstName.slice(0, 1).toUpperCase();
    },
    fullName() {
      return `${this.message.user.firstName} ${this.message.user.lastName}`;
    },
    text() {
      return this.message.text;
    },
    classes() {
      return {
        'is-my': this.message.user._id === this.userId,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-message {
  display: flex;
  margin-bottom: 25px;
  max-width: 80%;

  &:first-child {
    margin-top: auto;
  }

  &.is-my {
    margin-left: auto;
    flex-direction: row-reverse;
    text-align: right;
  }

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
    overflow: hidden;
  }

  &__content {
    padding: 0 15px;
  }

  p {
    margin: 0;
    font-size: 14px;

    &.author {
      margin-bottom: 10px;
      color: #4979a3;
      font-weight: bold;
    }
  }
}
</style>
