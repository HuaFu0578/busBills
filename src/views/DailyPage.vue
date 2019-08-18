<!--
 * @Description: 每日小结账单页面
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 08:26:46
 * @LastEditTime: 2019-08-17 11:20:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-container class="container" direction="vertical">
    <el-header class="header">
      <el-row type="flex" justify="space-between">
        <div class="head-explain w100 h100">
          <span>{{searchYear}}</span>年
          <span>{{searchMonth}}</span>月份每日小结账单
        </div>
      </el-row>
    </el-header>
    <el-main class="main">
      <div class="table-item" v-for="day in curMonLength" :key="'table'+day">
        <daily-table :month="searchMonth" :day="day" :carNum="carNum" :dailyData="dailyData" />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import DailyTable from "@/components/daily-page/DailyTable";
export default {
  computed: {
    ...mapState([
      "searchYear",
      "searchMonth",
      "carNum",
      "curMonLength",
      "dealedData"
    ]),
    dailyData() {
      return this.dealedData.commonData.dailyData;
    }
  },
  components: {
    DailyTable
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
  .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - 60px);
    padding-bottom: 50px;
    overflow-y: auto;

    .table-item {
      width: 50%;
      min-width: 400px;
      padding: 1rem;
      box-sizing: border-box;
    }
  }
}
</style>
