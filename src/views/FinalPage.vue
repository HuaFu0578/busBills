<!--
 * @Description: 最后统计的账单页面
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 08:27:13
 * @LastEditTime: 2019-09-03 15:56:10
 * @LastEditors: your name
 -->
<template>
  <el-container class="container" direction="vertical" v-print="isPrint">
    <el-header class="header">
      <el-row type="flex" justify="space-between" class="is-mobile-hidden head-wrap">
        <el-col :span="5">
          <div class="print-area noprint w100 h100" :class="viewBgClass">
            <el-button type="primary" size="medium" @click="clickPrint">打印</el-button>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="head-explain w100 h100">
            <span>{{searchYear}}</span>年
            <span>{{searchMonth}}</span>月份平衡账
            <span class="vice-title">{{viceTitle}}</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="menu w100 h100 noprint">
            <div class="trans-view" :class="viewBgClass" @click="ClickTransView"></div>
          </div>
        </el-col>
      </el-row>
      <div class="hd-row is-mobile-show">
        <div class="head-explain w100 h100">
          <span>{{searchYear}}</span>年
          <span>{{searchMonth}}</span>月份平衡账
          <span class="vice-title">{{viceTitle}}</span>
        </div>
        <div class="menu w100 h100 noprint">
          <div class="trans-view" :class="viewBgClass" @click="ClickTransView"></div>
        </div>
      </div>
    </el-header>
    <el-main class="main w100">
      <div class="table-view w100 tb-h" v-if="whichView=='table'">
        <final-table :headConfig="headConfig" :bodyConfig="bodyConfig"></final-table>
      </div>
      <div class="graphics-view w100 tb-h" v-else-if="whichView=='graphics'">
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
    ...mapGetters(["carName", "pageRange"]),
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
  padding: 1vh 1.5vh 0;
  box-sizing: border-box;
  font-size: 1.2rem;

  .header {
    height: 8vh !important;
    line-height: 8vh;
    font-size: 1.8rem;
    font-weight: 600;
    vertical-align: middle;
    max-height: 60px;

    .head-wrap {
      width: 100%;
      height: 100%;
      align-items: center;
    }
    .print-area {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .head-explain {
      font-size: 2rem;
      font-weight: 600;

      .vice-title {
        font-size: 1.5rem;
      }
    }
  }
  .main {
    width: 100%;
  }
  .menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
  }
  .trans-view {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .tb-h {
    width: 100%;
    height: 88vh;
  }
  .table-view-bg {
    background-image: url(../assets/table-view.png);
  }
  .graphics-view-bg {
    background-image: url(../assets/graphics-view.png);
  }
}
</style>
<style lang="less" scoped>
// 移动端适配
@media (min-width: 768px) {
  .container {
    .header {
      min-height: 40px;
      .is-mobile-show {
        display: none;
      }
      .is-mobile-hidden {
        display: flex;
      }
    }
  }
}
@media (max-width: 992px) {
  .container {
    .head-explain {
      font-size: 3.5vw !important;
    }
  }
}
@media (max-width: 768px) {
  .container {
    .header {
      min-height: auto;
      padding: 0;
      .is-mobile-show {
        display: block;
      }
      .is-mobile-hidden {
        display: none;
      }
      .hd-row {
        position: relative;
        width: 100%;
        height: 100%;

        .menu {
          width: 4vw;
          height: 4vw;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          right: 3.5vw;

          .trans-view {
            width: 100%;
            height: 100%;
          }
        }
      }
      .head-explain {
        font-size: 4vw !important;
        .vice-title {
          font-size: 3vw !important;
        }
      }
    }
  }
}
@media (max-width: 576px) {
  .container {
    .tb-h {
      height: 74vh;
    }
  }
}
@media (max-height: 500px) {
  .container {
    .tb-h {
      height: calc(95vh - 40px);
    }
  }
}
@media (min-height: 750px) {
  .container {
    .tb-h {
      height: calc(80vh - 60px);
    }
  }
}
</style>

// TODO:对统计图添加打印功能
///临时屏蔽功能
<style scoped>
.print-area.table-view-bg {
  display: none !important;
}
.print-area.graphics-view-bg {
  background: none;
}
</style>