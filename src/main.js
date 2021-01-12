import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import SocketPlugin from './plugins/socket';
import filters from './filters';
import './plugins/elementui';
import './styles/main.scss';

Vue.config.productionTip = false;

Vue.filter('passedTime', filters.passedTime);

Vue.use(new SocketPlugin({
  url: process.env.VUE_APP_API_SOCKET_URL,
}));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
