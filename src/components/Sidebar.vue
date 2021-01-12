<template>
  <aside class="sidebar">
    <p class="sidebar-title">Select chat</p>
    <ChatsList />
  </aside>
</template>

<script>
import ChatsList from '@/components/Chat/ChatsList.vue';

export default {
  name: 'Sidebar',
  components: {
    ChatsList,
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 10px 0 0;
  border-right: 1px solid #eee;
  overflow-y: auto;
}
.sidebar-title {
  margin: 0;
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
}
</style>
