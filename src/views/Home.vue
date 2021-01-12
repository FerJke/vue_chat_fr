<template>
  <div class="home">
    <div class="home-content">
      <Sidebar />
      <ChatWrapper />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import ChatWrapper from '@/components/Chat/ChatWrapper.vue';

export default {
  name: 'Home',
  components: {
    Sidebar,
    ChatWrapper,
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 0 0 5px;
}
.home-content {
  display: grid;
  grid-template-columns: minmax(100px, 250px) 1fr;
  height: 100%;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 10px 1px rgba(6, 32, 41, 0.4);
  border-radius: 4px;
  overflow: hidden;
}
</style>
