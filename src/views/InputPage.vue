<!--
 * @Description: 账单输入页面
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 08:26:19
 * @LastEditTime: 2019-12-05 16:11:28
 * @LastEditors: your name
 -->
<template>
  <el-container direction="vertical" class="container inputpage">
    <el-header class="header">
      <el-row type="flex" class="head-wrap" justify="space-between">
        <el-col :span="6" class="el-row is-justify-flex-start el-row--flex">
          <el-col class="head-left" :span="8">
            <div class="oper-area">
              <el-button class="text-btn" type="primary" size="medium" @click="clickSave">保存</el-button>
            </div>
          </el-col>
          <el-col class="head-left" :span="12">
            <div class="oper-area">
              <el-button class="text-btn" type="danger" size="medium" @click="clearAll">清空表格</el-button>
            </div>
          </el-col>
          <div class="lf-btn-group">
            <div class="save-btn" @click="clickSave"></div>
            <div class="delete-btn" @click="clearAll"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="header-title w100 h100">
            <drop-select name="input_year" id="input_year" :value-arr="yearRange" :search="searchYear"
              @searchChange="yearChange"></drop-select>年
            <drop-select name="input_month" id="input_month" :value-arr="monthRange" :search="searchMonth"
              @searchChange="monthChange"></drop-select>月账单输入
          </div>
        </el-col>
        <el-col :span="6">
          <div class="setting-menu">
            <setting-menu :menuItems="menuItems" :showTitle.sync="showTitle" :whichItemShow.sync="whichItemShow"
              :defaultParams="originData" :paramsCallback="paramsCallback" :arithmeticCb="arithmeticCbFn" />
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main pop-relative">
      <input-table class="table-area" :sendOriginData="JSON.stringify(originData)" @dealDayBill="dealDayBill"
        :curMonLength="curMonLength" v-print="isPrint" :isPrint="isPrint" />
      <pop-dialog v-if="showConfirmModal" type="confirmModal" :msg="modalMsg" :tips="modalTips"
        :tipsIcon="modalTipsIcon" :confirmCbFn="confirmCbFn" />
      <pop-dialog v-if="isSave" type="msgModal" :state="saveState" :autoHidden.sync="isSave" />
      <pop-dialog v-if="showGenModal" :showGenModal.sync="showGenModal" type="generalModal" :tips="modalTips"
        :tipsIcon="modalTipsIcon" :msg="modalMsg" />
    </el-main>
  </el-container>
</template>

<script>
import inputTable from "../components/input-page/InputTable";
import dropSelect from "../components/DropSelect";
import settingMenu from "../components/SettingMenu";

import { mapState, mapGetters } from "vuex";
import qs from "qs";
export default {
  name: "inputPage",
  data() {
    return {
      arithmetic: "deductFirst",
      correctLMR: "",
      showConfirmModal: false,
      isSave: false,
      showGenModal: false,
      showTitle: true,
      isPrint: false, //是否进行打印
      whichItemShow: "", //menuItems的key值
      modalTips: "",
      modalTipsIcon: "",
      modalMsg: "",
      saveState: "", //文件保存状态 success||fail
      isClearAll: false, //通过isClearAll的值来初始化originData
      confirmCbFn: () => {}, //弹窗操作的回调函数
      loadingInstance: null,
      loadingOptions: {
        fullscreen: true,
        text: "请求数据中......",
        background: "rgba(0,0,0,.6)",
        lock: true
      }
    };
  },
  computed: {
    ...mapState([
      "carNum",
      "siteHF",
      "curMonLength",
      "searchYear",
      "searchMonth",
      "dealedData",
      "addRemain"
    ]),
    ...mapGetters(["yearRange", "monthRange"]),
    storageName() {
      return `${this.searchYear}-${this.searchMonth}-UnSaveData`;
    },
    originData() {
      //初始化原始数据
      this.isClearAll; //只是为了改变isClearAll导致计算属性依赖发生变化，从而强制给计算属性赋默认值
      let obj = {
          date: this.searchYear + "_" + this.searchMonth,
          oilFee: 180,
          mulOilFee: 120,
          lastMonthRemain: "",
          currentMonthRemain: "",
          deductArithmetic: "deductFirst",
          hasSaved: false
        },
        carObj = {};
      this.carNum.forEach(car => {
        carObj[car] = "";
      });
      for (let i = 0, len = this.curMonLength; i < len; i++) {
        obj["day" + (i + 1)] = {
          ...carObj
        };
      }
      return obj;
    },
    menuItems() {
      //菜单目录配置
      return {
        oilFee: {
          title: "设置默认参数",
          callback: this.oilFeeFn
        },
        printer: {
          title: "打印表格",
          callback: this.printerFn
        },
        output: {
          title: "导出",
          callback: this.outputFn
        }
      };
    }
  },
  components: {
    inputTable,
    dropSelect,
    settingMenu,
    popDialog: () => import("../components/PopDialog")
  },
  created() {
    this.getStorage()
      .then(data => this.refreshOriginData(data))
      .catch(() => this.pullData());
    this.watchUnLoad(this.unLoad);
  },
  methods: {
    clickSave() {
      //保存数据
      this.confirmRequest((year, month) => {
        const title = `${year}年${month}月账单数据已存在，是否更新数据？`;
        return this.confirmModal({ title })
          .then(() => this.pushData(this.originData))
          .catch(() => {});
      });
    },
    clearAll() {
      this.confirmModal({ title: `是否清空当前表格所有数据？` })
        .then(() => (this.isClearAll = true))
        .catch(() => {});
    },
    oilFeeFn() {
      this.whichItemShow = "oilFee";
    },
    printerFn() {
      // this.whichItemShow = "printer";
      // this.isPrint = true;
      this.modalTips = "温馨提示";
      this.modalTipsIcon = require("../assets/warmTip.png");
      this.modalMsg = "打印功能正在快马加鞭建设中，请耐心等待......";
      this.showGenModal = true;
    },
    outputFn() {
      // this.whichItemShow = "output";  //待功能完善后启用

      this.modalTips = "温馨提示";
      this.modalTipsIcon = require("../assets/warmTip.png");
      this.modalMsg = "导出功能正在快马加鞭建设中，请耐心等待......";
      this.showGenModal = true;
    },
    arithmeticCbFn(e) {
      let val = e.target.value;
      this.$store.commit("changeArithmetic", val);
      this.arithmetic = val;
      this.refreshCurRemain();
      this.$set(this.originData, "deductArithmetic", val);
    },
    //其他默认参数设置，失去焦点是的回调函数
    paramsCallback(e, type) {
      if (type == "addRemain") {
        this.$store.commit("changeAddRemain", e.target.checked);
      }

      let value = parseInt(e.target.value);
      if (isNaN(value)) {
        return;
      }
      switch (type) {
        case "oilFee": {
          this.$set(this.originData, "oilFee", value);
          break;
        }
        case "mulOilFee": {
          this.$set(this.originData, "mulOilFee", value);
          break;
        }
        case "lastMonthRemain": {
          this.$set(this.originData, "lastMonthRemain", value);
          break;
        }
        case "currentMonthRemain": {
          this.$set(this.originData, "currentMonthRemain", value);
          break;
        }
      }
      this.calculateData(this.originData);
    },
    yearChange(val) {
      this.$store.commit("searchYear", val);
      this.pullData().changeMonLength();
      this.$store.commit("changeAddRemain", true);
    },
    monthChange(val) {
      this.$store.commit("searchMonth", val);
      this.pullData().changeMonLength();
      this.$store.commit("changeAddRemain", true);
    },
    dealDayBill(day, car, value) {
      this.originData.hasSaved = false;
      this.originData[day][car] = value;
      this.refreshOriginData();
    },
    changeMonLength() {
      this.$store.commit("changeMonLength", {
        year: this.searchYear,
        month: this.searchMonth
      });
      return this;
    },
    refreshCurRemain() {
      let summaryData = this.dealedData.commonData.summaryData;
      if (this.arithmetic == "deductFirst" && summaryData.deductionFirst) {
        this.$set(
          this.originData,
          "currentMonthRemain",
          summaryData.deductionFirst.endDeduction.remain
        );
      } else if (this.arithmetic == "deductLast" && summaryData.deductionLast) {
        this.$set(
          this.originData,
          "currentMonthRemain",
          summaryData.deductionLast.afterDeduction.remain
        );
      }
    },
    refreshOriginData(orData) {
      //刷新或重新赋值源数据，已进行双向绑定
      Object.assign(this.originData, orData || {});
      this.$forceUpdate();
      return this;
    },
    //判断该月份数据是否已存在，如果存在则需用户确认,不存在则直接将数据保存到文件中
    confirmRequest(confirmCbFn) {
      let year = this.searchYear,
        month = this.searchMonth,
        site = this.siteHF,
        comMethods = this.comMethods;
      let config = {
        url: site.hostName + site.queryData, //查询数据
        method: "GET",
        params: {
          year,
          month
        }
      };
      this.requestData(config).then(
        res => {
          let receiver = res.data;
          if (receiver.status == "ok") {
            //此状态为验证的文件已存在
            confirmCbFn(year, month);
          } else {
            this.pushData();
          }
          this.loadingInstance.close();
        },
        err => {
          console.log(err);
        }
      );
      return this;
    },
    requestData(config) {
      //请求数据的通用方法
      this.loadingInstance = this.$loading(this.loadingOptions);
      if (config.method === "POST") {
        return this.$ajax.post(config.url, config.data);
      } else if (config.method === "GET") {
        return this.$ajax.get(config.url, {
          params: config.params
        });
      }
    },
    calculateData(data) {
      let site = this.siteHF,
        comMethods = this.comMethods;
      let config = {
        url: site.hostName + site.calData, //计算数据
        method: "POST",
        data: qs.stringify({
          data: comMethods.encrypt(data)
        })
      };
      this.requestData(config).then(
        res => {
          let receiver = res.data;
          if (receiver.status == "ok") {
            let dealedData = comMethods.unEncrypt(receiver.data);
            this.$store.commit("refreshDealedData", dealedData);
            this.refreshCurRemain();
            this.loadingInstance.close(); //关闭蒙层
          } else {
            this.$store.commit("refreshDealedData", "init");
            console.log("计算数据失败", receiver);
          }
        },
        err => {
          console.log(err);
        }
      );
      return this;
    },
    pullData() {
      let year = this.searchYear,
        month = this.searchMonth,
        site = this.siteHF,
        comMethods = this.comMethods;
      let config = {
        url: site.hostName + site.getData, //获取数据
        method: "GET",
        params: {
          year,
          month
        }
      };
      this.requestData(config).then(
        res => {
          let receiver = res.data;
          if (receiver.status == "ok" && receiver.data.length > 0) {
            let orData = comMethods.unEncrypt(
              JSON.parse(receiver.data[0].bills)
            );
            this.refreshOriginData(orData).calculateData(orData);
          } else {
            //获取文件数据失败，文件不存在或其他原因
            this.$store.commit("refreshDealedData", "init");
          }
          this.loadingInstance.close();
        },
        err => {
          //ajax请求出错
          console.log(err);
        }
      );
      return this;
    },
    pushData() {
      let year = this.searchYear,
        month = this.searchMonth,
        site = this.siteHF,
        comMethods = this.comMethods;
      this.originData.hasSaved = true; //更改数据保存状态以供复杂情况使用
      let config = {
        url: site.hostName + site.setData,
        method: "POST",
        data: qs.stringify({
          data: comMethods.encrypt(this.originData),
          year,
          month,
          addRemain: this.addRemain
        })
      };
      this.setStorage(); //记录缓存
      this.requestData(config)
        .then(res => {
          let receiver = res.data;
          if (receiver.status == "ok") {
            this.saveState = "success";
            this.removeStorage();
          } else {
            this.originData.hasSaved = false; //如果保存失败，则重新更改数据保存状态
            this.saveState = "fail";
            this.setStorage();
          }
          this.loadingInstance.close();
          this.isSave = true;
        })
        .catch(err => console.log(err));
      return this;
    },
    /**调起确认弹窗 */
    confirmModal({
      name = "警告",
      ico = require("../assets/warning.png"),
      title = ""
    }) {
      return new Promise((resolve, reject) => {
        this.modalTips = name;
        this.modalTipsIcon = ico;
        this.modalMsg = title;
        this.showConfirmModal = true;
        this.confirmCbFn = val => {
          if (val) resolve();
          else reject();
          this.showConfirmModal = false;
        };
      });
    },
    /**从缓存中获取数据 */
    getStorage() {
      const unSaveData = window.localStorage.getItem(this.storageName);
      if (unSaveData) {
        if (unSaveData == JSON.stringify(this.originData)) {
          return Promise.resolve(this.originData);
        }
        const data = JSON.parse(unSaveData);
        const title = `${this.searchYear}年${this.searchMonth}月账单数据退出时未保存，是否进入重新编辑？`;
        return this.confirmModal({ title }).then(() => Promise.resolve(data));
      }
      return Promise.reject();
    },
    /**将数据放入缓存 */
    setStorage() {
      window.localStorage.setItem(
        this.storageName,
        JSON.stringify(this.originData)
      );
    },
    /**移除缓存 */
    removeStorage() {
      window.localStorage.removeItem(this.storageName);
    },
    doneBeforeExit() {
      if (!this.originData.hasSaved) {
        this.setStorage();
      }
    },
    watchUnLoad() {
      window.onunload = () => {
        this.doneBeforeExit();
        window.onunload = null;
      };
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  .header {
    background-color: rgba(154, 205, 50, 0.6);
    line-height: 8vh; /*no*/
    height: 8vh !important;
    padding: 0 8px; /*no*/
    font-size: 1.8rem;
    font-weight: 600;

    .head-wrap {
      width: 100%;
      height: 100%;
    }
    .header-title {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .oper-area {
      width: 100%;
      height: 100%;
      margin-left: 20px; /*no*/
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .pop-relative {
    position: relative;
  }
  #input_year,
  #input_month {
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    text-align: center;
    display: inline-block;
    background-color: aquamarine;
    padding: 0 0.3rem;
    cursor: pointer;
    border-radius: 0.4rem;
  }
}
</style>

<style scoped>
.header >>> .oilFee {
  background-image: url(../assets/oilFee.png);
}
.header >>> .printer {
  background-image: url(../assets/printer.png);
}
.header >>> .output {
  background-image: url(../assets/output.png);
}
</style>

<style lang="less"  scoped>
/* 移动端适配 */
@media (min-width: 768px) {
  .container.inputpage {
    .header {
      min-height: 60px;
      .lf-btn-group {
        display: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .container.inputpage {
    .header {
      .head-left {
        display: none;
      }
      .lf-btn-group {
        width: 100%;
        height: 100%;
        padding: 1.5vh 1.5vh 1.5vh 1.5vh;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .common-style {
          width: 4vh;
          height: 4vh;
          border-radius: 50%;
          margin-right: 1.5vh;
          background-size: 70% 70%;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .save-btn {
          .common-style;
          background-color: #409eff;
          border-color: #409eff;
          background-image: url(../assets/save-data.png);
        }
        .delete-btn {
          .common-style;
          background-color: #f56c6c;
          border-color: #f56c6c;
          background-image: url(../assets/delete-data.png);
        }
      }
      .header-title {
        font-size: 4vw !important;
      }
    }
    .main {
      height: 80vh !important;
    }
  }
}
@media (max-width: 576px) {
  .container.inputpage {
    .main {
      height: 74vh !important;
    }
  }
}
</style>