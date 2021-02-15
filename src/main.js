import Vue from 'vue';
import vueVimeoPlayer from 'vue-vimeo-player';
import VueLoading from 'vuejs-loading-plugin';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/global.scss';

Vue.use(vueVimeoPlayer);
Vue.config.productionTip = false;
Vue.use(VueLoading);

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'Login' }); // login/ register screen
    } else {
      next();
    }
  } else if (to.name === 'Login' && token) {
    next({ name: 'Class' });
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
