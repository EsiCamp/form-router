import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './App.vue';
import '../node_modules/bulma/css/bulma.min.css';
import './main.scss';

const router = new VueRouter({
  routes,
  mode: 'history',
});

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
