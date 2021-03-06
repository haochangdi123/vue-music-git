import Vue from 'vue';
import App from './App';
import router from './router';
import './common/style/index.scss'; // 引入scss
import FastClick from 'fastclick';
import axios from './api/ajax';
import VueLazyload from 'vue-lazyload'; // 懒加载
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
});

FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
