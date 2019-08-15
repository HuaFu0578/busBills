/*
 * @Description: vuex状态管理仓库
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 07:35:24
 * @LastEditTime: 2019-08-15 08:36:58
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    carNum: ['D52759', 'D52760', 'D52639', 'F63735', 'F63491', 'F63817'],

    searchYear: new Date().getFullYear(),
    searchMonth: new Date().getMonth() + 1,

    siteHF: {
      hostName: 'https://api.hfullest.com',
      getData: '/busBillsCalculator/getData',
      setData: '/busBillsCalculator/setData',
      calData: '/busBillsCalculator/calData',
      rootHostName: 'https://www.hfullest.com',
    },

    dealedData: {
      commonData: {
        dailyData: {},
        summaryData: {},
        threeData: {},
      },
      specialData: {},
    },

    curMonLength: (() => {
      let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth();
      return new Date(year, month, 0).getDate();
    })(),

    authorized: true, //是否授权


  },
  getters: {
    carName(state) {
      let carNum = state.carNum;
      let carArr = carNum.map(car => car[0] === 'D' ? '鄂' + car : car[0] === 'F' ? '湘' + car : '');
      return carArr;
    },
    yearRange() {
      let start = 2016;
      let arr = new Array(20).join(',').split(',').map((_val, index) => start + index);
      return arr;
    },
    monthRange() {
      let start = 1;
      let arr = new Array(12).join(',').split(',').map((_val, index) => start + index);
      return arr;
    },
  },
  mutations: {
    refreshDealedData(state, payLoad) {
      if (payLoad == 'init') {
        state.dealedData = {
          commonData: {
            dailyData: {},
            summaryData: {},
            threeData: {},
          },
          specialData: {},
        };
      } else {
        state.dealedData = payLoad;
      }
    },
    changeMonLength(state, payLoad) {
      state.curMonLength = new Date(payLoad.year, payLoad.month, 0).getDate();
    },
    changeAuthorizedState(state, payLoad) {
      state.authorized = payLoad;
    },
    searchYear(state, payLoad) {
      state.searchYear = payLoad;
    },
    searchMonth(state, payLoad) {
      state.searchMonth = payLoad;
    }
  },
  actions: {

  },
  modules: {
    "FinalTable": {
      namespaced: true,
      state: {
        isFixed: true,
      },
      mutations: {
        changeIsFixed(state, payLoad) {
          state.isFixed = payLoad;
        }
      }
    }
  }
})