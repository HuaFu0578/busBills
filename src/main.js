/*
 * @Description: 项目主入口文件
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 07:35:24
 * @LastEditTime: 2019-08-19 17:32:29
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import comMethods from './utils/comMethods';

// import "lib-flexible";

// axios.defaults.withCredentials = true; //每次请求，无论是否跨域，都带上cookie信息
Vue.prototype.$ajax = axios;
Vue.prototype.comMethods = comMethods;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

Vue.use(ElementUI);

//配置全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requireAuth)) {
    if (store.state.authorized) {
      next();
    } else {
      axios.defaults.withCredentials = true;
      axios.get("/busBills/isAuthorized").then(res => {
        if (res.data.status == 'ok') {
          store.commit("changeAuthorizedState", true);
          next();
        } else {
          next({
            path: '/login',
            params: {
              redirect: to.fullPath
            },
          });
        }
      });
      axios.defaults.withCredentials = false;
    }
  } else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')