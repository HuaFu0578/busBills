<!--
 * @Description: 最后统计的账单页面
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 08:27:13
 * @LastEditTime: 2019-08-16 15:29:05
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-container class="container" direction="vertical" v-print="isPrint">
    <el-header class="header">
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <div class="print-area noprint w100 h100">
            <el-button type="primary" size="medium" @click="clickPrint">打印</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="head-explain w100 h100">
            <span>{{searchYear}}</span>年
            <span>{{searchMonth}}</span>月份平衡账
            <span class="vice-title">{{viceTitle}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="menu w100 h100 noprint">
            <div class="trans-view" :class="viewBgClass" @click="ClickTransView"></div>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main w100">
      <div class="table-view w100 h100" v-if="whichView=='table'">
        <final-table :headConfig="headConfig" :bodyConfig="bodyConfig"></final-table>
      </div>
      <div class="graphics-view w100 h100" v-else-if="whichView=='graphics'">
        <final-graphics />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import finalTable from "../components/finalsum-page/FinalTable";
import finalGraphics from "../components/finalsum-page/FinalGraphics";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      isPrint: false,
      whichView: "table",
      viewList: ["table", "graphics"]
    };
  },
  computed: {
    ...mapState([
      "searchYear",
      "searchMonth",
      "curMonLength",
      "carNum",
      "dealedData"
    ]),
    ...mapGetters(["carName"]),
    pageRange() {
      let pageRangeArr = [],
        monthLength = this.curMonLength;
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
    headConfig() {
      return {
        carName: this.carName,
        pageRange: this.pageRange
      };
    },
    bodyConfig() {
      let summaryData = this.dealedData.commonData.summaryData;
      return Object.assign({ carNum: this.carNum }, summaryData);
    },
    viceTitle() {
      if (this.whichView == "table") {
        return "（表格）";
      } else if (this.whichView == "graphics") {
        return "（统计图）";
      }
    },
    viewBgClass() {
      if (this.whichView == "table") {
        return "graphics-view-bg";
      } else if (this.whichView == "graphics") {
        return "table-view-bg";
      }
    }
  },
  components: {
    finalTable,
    finalGraphics
  },
  methods: {
    clickPrint() {
      this.isPrint = true;
    },
    //切换视图
    ClickTransView() {
      let viewList = this.viewList,
        index = viewList.indexOf(this.whichView);
      this.whichView =
        viewList[(viewList.length + index + 1) % viewList.length];
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 0.5rem;
  box-sizing: border-box;
  font-size: 1.2rem;

  .header {
    line-height: 60px; /*no*/
    padding: 0 8px; /*no*/
    font-size: 1.8rem;
    font-weight: 600;

    .print-area {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 1rem;
    }

    .head-explain {
      font-size: 2rem;
      font-weight: 600;

      .vice-title {
        font-size: 1.5rem;
      }
    }
  }

  .menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 2.5rem;
    box-sizing: border-box;
  }
  .trans-view {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .table-view-bg {
    background-image: url(../assets/table-view.png);
  }
  .graphics-view-bg {
    background-image: url(../assets/graphics-view.png);
  }
}
</style>