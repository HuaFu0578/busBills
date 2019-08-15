<!--
 * @Description: 账单输入页面
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 08:26:19
 * @LastEditTime: 2019-08-15 10:39:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <div class="header">
      <def-button class="save-data" @click.native="clickSave" toggle-class="mousedown">
        <template #btn-text>保存</template>
      </def-button>
      <div class="head-wrap">
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
      <setting-menu
        :menuItems="menuItems"
        :showTitle.sync="showTitle"
        :whichItemShow.sync="whichItemShow"
        :defaultParams="originData"
        :paramsCallback="paramsCallback"
      />
    </div>
    <input-table
      class="table-area"
      :sendOriginData="JSON.stringify(originData)"
      @dealDayBill="dealDayBill"
      :curMonLength="curMonLength"
      v-print="isPrint"
    />
    <pop-dialog
      v-if="isCover"
      type="confirmModal"
      :msg="modalMsg"
      :tips="modalTips"
      :tipsIcon="modalTipsIcon"
      @isConfirm="isConfirmCallback"
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
  </div>
</template>

<script>
import inputTable from "../components/InputTable";
import dropSelect from "../components/DropSelect";
import defButton from "../components/ButtonDefault";
import settingMenu from "../components/SettingMenu";

import { mapState, mapGetters } from "vuex";
import qs from "qs";
export default {
  name: "inputPage",
  data() {
    return {
      isCover: false,
      isSave: false,
      showGenModal: false,
      showTitle: true,
      isPrint: false, //是否进行打印
      whichItemShow: "", //menuItems的key值
      modalTips: "",
      modalTipsIcon: "",
      modalMsg: "",
      saveState: "" //文件保存状态 success||fail
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
    defButton,
    settingMenu,
    popDialog: () => import("../components/PopDialog")
  },
  created() {
    this.pullData();
  },
  methods: {
    clickSave() {
      this.confirmRequest();
    },
    oilFeeFn() {
      this.whichItemShow = "oilFee";
    },
    printerFn() {
      // this.whichItemShow = "printer";
      // this.isPrint=true;
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

    //确认模态框的结果，是否将已有数据覆盖
    isConfirmCallback(val) {
      this.isCover = false;
      if (val) {
        this.pushData(this.originData);
      }
      return this;
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
    confirmRequest() {
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
            this.modalTips = "警告";
            this.modalTipsIcon = require("../assets/warning.png");
            this.modalMsg = `${year}年${month}月账单数据文件已存在，是否覆盖原数据？`;
            this.isCover = true;
          } else {
            this.pushData();
          }
        },
        err => {
          console.log(err);
        }
      );
      return this;
    },
    requestData(config) {
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
.wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(148, 205, 228, 0.5);
  text-align: center;
  position: relative;

  // @top-height: 56px;
  @top-height: 4.5rem;
  .header {
    width: 100%;
    height: @top-height;
    // padding: 8px 5px 8px;
    padding: 0.5rem 0.3rem 0.5rem;
    box-sizing: border-box;
    // font-size: calc(1.8 * 16px);
    font-size: 1.8rem;
    background-color: rgba(154, 205, 50, 0.7);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .head-wrap {
      font-weight: 600;
    }
    .save-data {
      // width: calc(16px * 6);
      // height: calc(16px * 2);
      width: 6rem;
      height: 2rem;
      // line-height: calc(16px * 2);
      line-height: 2rem;
      margin: auto 0;
      position: absolute;
      // left: calc(16px * 2);
      left: 2rem;
      top: 0;
      bottom: 0;
      border: none;
      outline: none;
      background-color: #409eff;
      cursor: pointer;
      // border-radius: calc(16px * 0.3);
      border-radius: 0.3rem;
      // font-size: calc(16px * 1.2);
      font-size: 1.2rem;
      color: #fff;
      font-weight: 600;

      &:hover {
        background-color: #74b6f8;
      }

      &.mousedown {
        background-color: #409eff;
      }
    }
  }
  .table-area {
    width: 100%;
    height: calc(100% - @top-height);
  }
}
#input_year,
#input_month {
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  text-align: inherit;
  display: inline-block;
  background-color: aquamarine;
  // padding: 0 calc(16px * 0.3);
  padding: 0 0.3rem;
  cursor: pointer;
  // border-radius: calc(16px * 0.4);
  border-radius: 0.4rem;
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
