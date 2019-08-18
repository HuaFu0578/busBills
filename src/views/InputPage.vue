<!--
 * @Description: 账单输入页面
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 08:26:19
 * @LastEditTime: 2019-08-18 16:50:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-container direction="vertical" class="container">
    <el-header class="header">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6" class="el-row is-justify-flex-start el-row--flex">
          <el-col :span="8">
            <div class="save-area">
              <el-button type="primary" size="medium" @click="clickSave">保存</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="save-area">
              <el-button type="danger" size="medium" @click="clearAll">清空表格</el-button>
            </div>
          </el-col>
        </el-col>
        <el-col :span="12">
          <div class="header-title w100 h100">
            <drop-select
              name="input_year"
              id="input_year"
              :value-arr="yearRange"
              :search="searchYear"
              @searchChange="yearChange"
            ></drop-select>年
            <drop-select
              name="input_month"
              id="input_month"
              :value-arr="monthRange"
              :search="searchMonth"
              @searchChange="monthChange"
            ></drop-select>月账单输入
          </div>
        </el-col>
        <el-col :span="6">
          <div class="setting-menu">
            <setting-menu
              :menuItems="menuItems"
              :showTitle.sync="showTitle"
              :whichItemShow.sync="whichItemShow"
              :defaultParams="originData"
              :paramsCallback="paramsCallback"
            />
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main pop-relative">
      <input-table
        class="table-area"
        :sendOriginData="JSON.stringify(originData)"
        @dealDayBill="dealDayBill"
        :curMonLength="curMonLength"
        v-print="isPrint"
        :isPrint="isPrint"
      />
      <pop-dialog
        v-if="showConfirmModal"
        type="confirmModal"
        :msg="modalMsg"
        :tips="modalTips"
        :tipsIcon="modalTipsIcon"
        :confirmCbFn="confirmCbFn"
      />
      <pop-dialog v-if="isSave" type="msgModal" :state="saveState" :autoHidden.sync="isSave" />
      <pop-dialog
        v-if="showGenModal"
        :showGenModal.sync="showGenModal"
        type="generalModal"
        :tips="modalTips"
        :tipsIcon="modalTipsIcon"
        :msg="modalMsg"
      />
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
      "searchMonth"
    ]),
    ...mapGetters(["yearRange", "monthRange"]),
    originData() {
      //初始化原始数据
      this.isClearAll; //只是为了改变isClearAll导致计算属性依赖发生变化，从而强制给计算属性赋默认值
      let obj = {
          date: this.searchYear + "_" + this.searchMonth,
          oilFee: 180,
          mulOilFee: 120,
          lastMonthRemain: "",
          currentMonthRemain: "",
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
    this.pullData();
  },
  methods: {
    clickSave() {
      this.confirmRequest((year, month) => {
        this.modalTips = "警告";
        this.modalTipsIcon = require("../assets/warning.png");
        this.modalMsg = `${year}年${month}月账单数据文件已存在，是否覆盖原数据？`;
        this.showConfirmModal = true;
        this.confirmCbFn = val => {
          if (val) {
            this.pushData(this.originData);
          }
          this.showConfirmModal = false;
        };
      });
    },
    clearAll() {
      this.modalTips = "警告";
      this.modalTipsIcon = require("../assets/warning.png");
      this.modalMsg = `是否清空当前表格所有数据？`;
      this.showConfirmModal = true;
      this.confirmCbFn = val => {
        if (val) {
          this.isClearAll = true;
        }
        this.showConfirmModal = false;
      };
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

    //其他默认参数设置，失去焦点是的回调函数
    paramsCallback(e, type) {
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
    },
    monthChange(val) {
      this.$store.commit("searchMonth", val);
      this.pullData().changeMonLength();
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
        url: site.hostName + site.setData,
        method: "GET",
        params: {
          oper: "origin",
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
        url: site.hostName + site.calData,
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
            this.loadingInstance.close();
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
        url: site.hostName + site.getData,
        method: "GET",
        params: {
          oper: "origin",
          year,
          month
        }
      };
      this.requestData(config).then(
        res => {
          let receiver = res.data;
          if (receiver.status == "ok") {
            let orData = comMethods.unEncrypt(receiver.data);
            this.refreshOriginData(orData).calculateData(orData);
          } else {
            //获取文件数据失败，文件不存在或其他原因
            this.$store.commit("refreshDealedData", "init");
            console.log(receiver);
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
          data: comMethods.encrypt(this.originData)
        })
      };
      this.requestData(config).then(
        res => {
          let receiver = res.data;
          if (receiver.status == "ok") {
            this.saveState = "success";
          } else {
            this.originData.hasSaved = false; //如果保存失败，则重新更改数据保存状态
            this.saveState = "fail";
          }
          this.loadingInstance.close();
          this.isSave = true;
        },
        err => {
          console.log(err);
        }
      );
      return this;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  .header {
    background-color: rgba(154, 205, 50, 0.7);
    line-height: 60px; /*no*/
    padding: 0 8px; /*no*/
    font-size: 1.8rem;
    font-weight: 600;

    .save-area {
      width: 100%;
      height: 100%;
      padding-left: 20px; /*no*/
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
