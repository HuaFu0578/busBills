/*
 * @Description: 路由配置
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 07:35:24
 * @LastEditTime: 2019-08-19 17:32:26
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import store from './store';
import Router from 'vue-router'
import LoginPage from './views/LoginPage';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home'),
      redirect: '/home/inputAmount',
      children: [{
          path: 'inputAmount',
          name: 'input',
          meta: {
            requireAuth: true,
          },
          component: () => import('./views/InputPage')
        },
        {
          path: 'dailyAmount',
          name: 'daily',
          meta: {
            requireAuth: true,
          },
          component: () => import('./views/DailyPage')
        },
        {
          path: 'threeDayAmount',
          name: 'threeday',
          meta: {
            requireAuth: true,
          },
          component: () => import('./views/ThreeDayPage')
        },
        {
          path: 'finalAmount',
          name: 'final',
          meta: {
            requireAuth: true,
          },
          component: () => import('./views/FinalPage')
        },

      ]
    },
    {
      path: '/NotFound',
      name: 'notFound',
      component: () => import('./views/NotFound')
    },
    {
      path: "*",
      redirect(to) {
        if (to.path == '/') {
          if (store.state.authorized) {
            return '/home';
          } else {
            return '/login';

          }
        } else {
          return '/NotFound';
        }
      }
    }
  ]
})