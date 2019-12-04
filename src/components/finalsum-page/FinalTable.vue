<!--
 * @Description: 最后总结表格
 * @Author: LiuHuaifu
 * @Date: 2019-08-09 12:57:09
 * @LastEditTime: 2019-12-04 09:12:44
 * @LastEditors: your name
 -->
<template>
  <div class="container">
    <div class="table-box">
      <table>
        <thead>
          <tr>
            <th class="page">
              <svg width="100%" height="100%" style="position:absolute;top:0;left:0;">
                <text x="50%" y="42%">车牌</text>
                <line x1="0" y1="0" x2="100%" y2="100%" style="stroke:red;stroke-width:.1rem" />
                <text x="10%" y="80%">日期</text>
              </svg>
            </th>
            <th class="data" v-for="item in headConfig.carName" :key="'head_'+item">{{item}}</th>
            <th class="remain">余额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(range,index) in headConfig.pageRange" :key="'final_'+range">
            <th class="page">{{range}}</th>
            <td
              class="data"
              :class="inOutData(index,car)==''?'':inOutData(index,car)<0?'minus':'plus'"
              v-for="car in bodyConfig.carNum"
              :key="range+car"
            >{{inOutData(index,car)}}</td>
            <td class="remain">{{remainData(index)}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-for="(item,index) in totalAmount" :key="item.head">
            <th
              class="page"
              v-if="index==1 || index==2"
              @click="clickFixDigit"
              title="点击切换精度"
            >{{item.head}}</th>
            <th class="page" v-else>{{item.head}}</th>
            <template v-if="index==0">
              <td
                class="data totalInOut"
                :class="appendixData(item,car)==''?'':appendixData(item,car)<0?'minus':'plus'"
                v-for="car in bodyConfig.carNum"
                :key="'final'+item.head+car"
              >{{appendixData(item,car)}}</td>
              <td class="remain totalInOut">{{item.content.remain}}</td>
            </template>
            <template v-else-if="index==1">
              <td
                class="data beforeDeduction"
                :class="appendixData(item,car)==''?'':appendixData(item,car)<0?'minus':'plus'"
                v-for="car in bodyConfig.carNum"
                :key="'final'+item.head+car"
              >{{isFixed?fixedData(item,car): appendixData(item,car)}}</td>
              <td
                class="remain beforeDeduction"
                :class="isNaN(parseInt(item.content.lastMonthRemain)) ?'':' show-lt'"
              >{{item.content.lastMonthRemain}}</td>
            </template>
            <template v-else-if="index==2">
              <td
                class="data afterDeduction"
                :class="appendixData(item,car)==''?'':appendixData(item,car)<0?'minus':'plus'"
                v-for="car in bodyConfig.carNum"
                :key="'final'+item.head+car"
              >{{isFixed?fixedData(item,car): appendixData(item,car)}}</td>
              <td class="remain afterDeduction">{{item.content.remain}}</td>
            </template>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("FinalTable", ["isFixed"]),
    ...mapState(["arithmetic"]),
    isFirst() {
      //是否使用第一种算法
      return this.arithmetic == "deductFirst";
    },
    totalAmount() {
      let isFirst = this.isFirst;
      let deductionFirst = this.bodyConfig.deductionFirst || {},
        deductionLast = this.bodyConfig.deductionLast || {};
      return [
        {
          head: "进出总数",
          content: this.bodyConfig.totalInOut || {}
        },
        {
          head: isFirst ? "10%提成总数" : "提成前总数",
          content:
            (isFirst
              ? deductionFirst.afterDeduction
              : deductionLast.beforeDeduction) || {}
        },
        {
          head: isFirst ? "最终合计总数" : "10%提成总数",
          content:
            (isFirst
              ? deductionFirst.endDeduction
              : deductionLast.afterDeduction) || {}
        }
      ];
    },
    inOutData() {
      return (index, car) => {
        let temp = this.bodyConfig["page" + (index + 1)];
        return temp ? temp[car] : "";
      };
    },
    remainData() {
      return index => {
        let temp = this.bodyConfig["page" + (index + 1)];
        return temp ? temp.remain : "";
      };
    },
    appendixData() {
      return (item, car) => {
        let temp = item.content[car];
        return typeof temp !== "object" ? temp : "";
      };
    },
    fixedData() {
      return (item, car) => {
        let temp = item.content.fixedData;
        return temp ? temp[car] : "";
      };
    }
  },
  props: ["headConfig", "bodyConfig"],
  methods: {
    clickFixDigit() {
      this.$store.commit("FinalTable/changeIsFixed", !this.isFixed);
    }
  }
};
</script>

<style scoped>
@media print {
  html,
  body {
    margin: 0;
    padding: 0;
    width: 210mm !important;
    height: 297mm !important;
  }

  .table-box {
    width: 100%;
    height: 90% !important;
  }
  table {
    font-size: 1rem;
    text-align: center;
  }
  thead tr {
    line-height: 2rem !important;
  }
  tbody tr {
    height: 3.5rem !important;
  }
  tfoot tr {
    line-height: 1.8rem !important;
  }
  tfoot .page {
    font-size: 7pt !important;
  }
  th {
    background-color: rgb(223, 250, 174);
  }
}
</style>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;

  .table-box {
    width: 100%;
    height: 100%;

    table {
      width: 100%;
      height: 100%;
      line-height: 1.2;
      font-size: 1.5rem;
      border-collapse: collapse;
      border-color: #000;
      empty-cells: show;
      white-space: nowrap;

      @alpha: 0.7;

      th,
      td {
        border: 0.1rem solid red;
        box-sizing: border-box;
      }
      thead .page {
        position: relative;
        font-size: 1.2rem;
      }
      .page {
        font-size: 1.3rem;
        width: 12%;
      }
      .data {
        width: 13%;
      }
      .remain {
        width: 10%;
        background-color: rgba(191, 191, 191, @alpha);
      }
      tbody td,
      tfoot td {
        font-size: 1.5rem;
      }
      thead tr {
        height: 6.8vh;
        min-height: 40px;
      }
      tbody tr {
        height: 5vh;
        min-height: 24px;
      }
      tfoot tr {
        height: 6vh;
        min-height: 30px;

        &:last-of-type th,
        &:nth-last-of-type(2) {
          cursor: pointer;
        }
      }
      .remain.beforeDeduction {
        position: relative;

        &.show-lt::before {
          content: "上月";
          position: absolute;
          top: 0;
          left: 0;
          line-height: 1.2rem;
          font-size: 0.7rem;
          color: #fff;
          background-color: rgb(243, 107, 129);
        }
      }

      tfoot .page {
        @media (max-width: 1280px) {
          font-size: 16px; /*px*/
        }
        @media (max-width: 992px) {
          font-size: 13px; /*px*/
        }
      }
      tfoot .remain {
        font-size: 2rem;
        font-weight: bold;
      }
      thead .remain {
        background-color: rgba(112, 173, 71, @alpha);
      }
      tfoot {
        .totalInOut {
          background-color: rgba(232, 202, 234, @alpha);
        }
        .beforeDeduction {
          background-color: rgba(172, 238, 131, @alpha);
        }
        .afterDeduction {
          background-color: rgba(255, 230, 153, @alpha);
        }
      }
      .plus {
        background-color: rgba(155, 194, 230, @alpha);
        color: #000;
      }

      .minus {
        background-color: #fce4d6;
        color: #f30;
      }
    }
  }
}
</style>
<style lang="less" scoped>
//移动端适配
@media (max-width: 992px) {
  .container table th {
    font-size: 2.2vw !important;
  }
}
@media (max-width: 768px) {
  .container {
    table {
      tfoot tr {
        th {
          font-size: 2vw !important;
        }
      }
      th {
        font-size: 2.7vw !important;
      }
      td {
        font-size: 2.5vw !important;
      }
    }
  }
}
@media (max-width: 576px) {
  .container table {
    th {
      font-size: 2.4vw !important;
    }
  }
}
@media (max-height: 500px) {
  .container table {
    thead,
    tbody,
    tfoot {
      tr {
        min-height: auto;
      }
    }
  }
}
</style>