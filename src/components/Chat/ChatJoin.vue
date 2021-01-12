<template>
  <div class="chat-join">
    <ElButton
      type="primary"
      @click="joinChat"
    >
      + Join
    </ElButton>
  </div>
</template>

<script>
export default {
  name: 'ChatJoin',
  methods: {
    joinChat() {
      this.$emit('join-chat');
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-join {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
