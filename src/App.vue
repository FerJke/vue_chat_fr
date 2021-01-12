<template>
  <div id="app">
    <Header id="header" />
    <MainContentLayout id="maincontent" />
    <Notifier />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import MainContentLayout from './components/MainContentLayout.vue';
import Notifier from './components/Notifier.vue';

export default {
  name: 'App',
  components: {
    Header,
    Notifier,
    MainContentLayout,
  },
};
</script>

<style lang="scss">
#app {
  height: inherit;
  display: flex;
  flex-direction: column;
}
#header {
  flex: 0 0 auto;
}
#maincontent {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
