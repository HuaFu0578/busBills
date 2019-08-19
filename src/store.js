/*
 * @Description: vuex状态管理仓库
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 07:35:24
 * @LastEditTime: 2019-08-19 17:32:21
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

    authorized: process.env.NODE_ENV !== 'production', //是否授权


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
    pageRange(state) {
      let pageRangeArr = [],
        monthLength = state.curMonLength;
      for (let day = 1; day <= monthLength; day += 3) {
        if (monthLength - day < 3) {
          pageRangeArr.push(
            day + (monthLength === day ? "" : "-" + monthLength)
          );
        } else {
          pageRangeArr.push(day + "-" + (day + 2));
        }
      }
      return pageRangeArr;
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