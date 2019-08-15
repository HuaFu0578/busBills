<!--
 * @Description: 最后统计的账单页面
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 08:27:13
 * @LastEditTime: 2019-08-11 16:31:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="container" v-print="isPrint">
    <div class="header">
      <def-button class="save-data noprint" @click.native="clickPrint" toggle-class="mousedown">
        <template #btn-text>打印</template>
      </def-button>
      <div class="head-explain">
        <span>{{searchYear}}</span>年
        <span>{{searchMonth}}</span>月份平衡账
        <span class="vice-title">{{viceTitle}}</span>
      </div>
      <div class="menu noprint">
        <div class="trans-view" :class="viewBgClass" @click="ClickTransView"></div>
      </div>
    </div>
    <div class="table-view" v-if="whichView=='table'">
      <final-table :headConfig="headConfig" :bodyConfig="bodyConfig"></final-table>
    </div>
    <div class="graphics-view" v-else-if="whichView=='graphics'">
      <final-graphics />
    </div>
  </div>
</template>

<script>
import defButton from "../components/ButtonDefault";
import finalTable from "../components/FinalTable";
import finalGraphics from "../components/FinalGraphics";
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
    defButton,
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
  height: 100%;
  width: 100%;
  color: #252525;
  padding: 0 0.6rem 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  .header {
    width: 100%;
    height: 10%;
    flex: 1 1 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .save-data {
      width: 6rem;
      height: 2rem;
      line-height: 2rem;
      margin: auto 0;
      position: absolute;
      left: 2rem;
      top: 0;
      bottom: 0;
      border: none;
      outline: none;
      background-color: #409eff;
      cursor: pointer;
      border-radius: 0.3rem;
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

    .head-explain {
      font-size: 2rem;
      font-weight: 600;

      .vice-title {
        font-size: 1.5rem;
      }
    }

    .trans-view {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 2rem;
      margin: auto 0;
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

  .table-view,
  .graphics-view {
    width: 100%;
    height: 100%;
  }
}
</style>