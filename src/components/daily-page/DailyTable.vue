<!--
 * @Description: 每日小结表格
 * @Author: LiuHuaifu
 * @Date: 2019-08-16 19:21:46
 * @LastEditTime: 2019-09-03 10:26:54
 * @LastEditors: your name
 -->
<template>
  <div class="wrapper">
    <table cellspacing="0" cellpadding="0" border="0">
      <caption>
        <span>{{month}}月{{day}}日小结</span>
      </caption>
      <colgroup>
        <col class="lf-th" />
        <col class="rt-td" v-for="val in 5" :key="'col-'+val" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="item in titleList" :key="month+'_'+day+item">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(car,index) in carNum" :key="month+day+car">
          <th v-if="index<3">{{'鄂'+car}}</th>
          <th v-else>{{'湘'+car}}</th>
          <td :class="`${speClass(car)}`">{{total(car)}}</td>
          <td>{{dayData?dayData.average:""}}</td>
          <td>{{dayData?dayData[car].inbill:""}}</td>
          <td>{{dayData?dayData[car].outbill:""}}</td>
          <th v-if="index==5" class="remain-th">余额</th>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>总额合计</th>
          <td colspan="2" class="total-td">{{dayData?dayData.aggregate:""}}</td>
          <td>{{dayData?dayData.totalIn:""}}</td>
          <td>{{dayData?dayData.totalOut:""}}</td>
          <td class="remain-td">{{dayData?dayData.remain:""}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      titleList: ["车牌号", "总数", "平均数", "进账", "出账"]
    };
  },
  computed: {
    total() {
      return car => (this.dayData ? this.dayData[car].total : "");
    },
    dayData() {
      return this.dailyData["day" + this.day];
    },
    speClass() {
      return car => {
        let total = this.total(car);
        return total.indexOf("休班") > -1
          ? "xiuban"
          : total.indexOf("未跑") > -1
          ? "weipao"
          : total.indexOf("踏班") > -1
          ? "taban"
          : "";
      };
    }
  },
  props: ["month", "day", "carNum", "dailyData"]
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;

  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    white-space: nowrap;

    tr {
      line-height: 2rem;
    }
    caption {
      font-size: 1.5rem;
      font-weight: 600;
      caption-side: top;
      line-height: 3rem;
      box-sizing: border-box;

      span {
        background-color: #fff;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px;
      }
    }
    th {
      font-size: 1.4rem;
      font-weight: 600;
      background-color: rgba(245, 183, 245, 0.7);
    }
    td {
      font-size: 1.3rem;
      font-weight: 500;
      background-color: rgba(217, 248, 182, 0.7);
    }
    th,
    td {
      border: 1px solid #666;
    }
    .total-td {
      background-color: rgb(255, 233, 146);
    }
    .remain-th {
      background-color: rgb(191, 255, 96);
    }
    .remain-td {
      background-color: rgb(210, 210, 210);
    }
  }
}
</style>
<style lang="less" scoped>
//移动端适配
@media (max-width: 768px) {
  .wrapper {
    table {
      table-layout: fixed;
      tr {
        line-height: 1.2;
        th,
        td {
          padding: 1px;
        }
      }

      .lf-th {
        width: 22%;
      }
      caption {
        font-size: 3.5vw;
        span {
          padding: 3px;
        }
      }
      th,
      td {
        font-size: 3vw;
      }
    }
  }
}
@media (max-width: 425px) {
  .wrapper {
    table {
      caption {
        font-size: 4.5vw;
      }
      th,
      td {
        font-size: 4vw;
      }
    }
  }
}
</style>