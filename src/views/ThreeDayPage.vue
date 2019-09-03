<!--
 * @Description: 三日小结账单
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 08:27:02
 * @LastEditTime: 2019-09-02 16:32:45
 * @LastEditors: your name
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
      <div class="table-item" v-for="(page,index) in pageRange" :key="'triday'+page">
        <triday-table
          :carNum="carNum"
          :page="index+1"
          :tridayData="dealedData.commonData.threeData"
          :curMonLength="curMonLength"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import TridayTable from "@/components/threeday-page/TridayTable";
export default {
  name: "tridayPage",
  computed: {
    ...mapState([
      "searchYear",
      "searchMonth",
      "carNum",
      "dealedData",
      "curMonLength"
    ]),
    ...mapGetters(["pageRange"])
  },
  components: {
    TridayTable
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
    width: 100%;
    height: calc(100% - 60px);
    padding: 0 2rem 2rem;
    box-sizing: border-box;
    overflow-y: auto;

    .table-item {
      width: 100%;
      padding: 10px;
    }
  }
}
</style>
<style lang="less" scoped>
//移动端适配
@media (max-width: 768px) {
  .container {
    padding: 0 1.5vh;

    .header {
      height: 8vh !important;
      line-height: 8vh !important;
      padding: 0;
      .head-explain {
        font-size: 4vw;
      }
    }
    .main {
      height: 80vh;
    }
  }
}
@media (max-width: 425px) {
  .container .header .head-explain {
    font-size: 5vw;
  }
}
</style>