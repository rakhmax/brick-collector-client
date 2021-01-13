import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import animateNumber from './plugins/animateNumber';
import translator from './plugins/translator';
import categoryName from './plugins/categoryName';
import formatters from './plugins/formatters';

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  animateNumber,
  translator,
  categoryName,
  ...formatters,
  render: (h) => h(App),
}).$mount('#app');
