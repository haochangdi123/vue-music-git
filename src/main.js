import Vue from 'vue';
import App from './App';
import router from './router';
import './common/style/index.scss'; // 引入scss
import FastClick from 'fastclick';
import axios from './api/ajax';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
