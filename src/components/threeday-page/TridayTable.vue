<!--
 * @Description: 三日小结表格
 * @Author: LiuHuaifu
 * @Date: 2019-08-16 20:23:04
 * @LastEditTime: 2019-08-18 14:42:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th>车牌号</th>
          <template v-for="(car,index) in carNum">
            <th :key="'head'+car" v-if="index<3" colspan="3">{{'鄂'+car}}</th>
            <th :key="'head'+car" v-else colspan="3">{{'湘'+car}}</th>
          </template>
        </tr>
        <tr>
          <th>日期</th>
          <template v-for="car in carNum">
            <th class="date" :key="car+page+'No1'">{{page*3-2}}</th>
            <th :class="{date:!surplus1}" :key="car+page+'No2'">{{surplus1?"": page*3-1}}</th>
            <th :class="{date:!surplus2}" :key="car+page+'No3'">{{surplus2?"": page*3}}</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>收入</th>
          <template v-for="car in carNum">
            <td
              :key="car+'No1_income'"
              :class="speClass(car,'No1')"
            >{{pageData[car] ? pageData[car]['No1']['income']:""}}</td>
            <td
              :key="car+'No2_income'"
              :class="speClass(car,'No2')"
            >{{pageData[car] && !surplus1 ? pageData[car]['No2']['income']:""}}</td>
            <td
              :key="car+'No3_income'"
              :class="speClass(car,'No3')"
            >{{pageData[car] && !surplus2 ? pageData[car]['No3']['income']:""}}</td>
          </template>
        </tr>
        <tr>
          <th>分配</th>
          <template v-for="car in carNum">
            <td
              :key="car+'No1_allocation'"
            >{{pageData[car]?pageData[car]['No1']['allocation']:""}}</td>
            <td
              :key="car+'No2_allocation'"
            >{{pageData[car] && !surplus1?pageData[car]['No2']['allocation']:""}}</td>
            <td
              :key="car+'No3_allocation'"
            >{{pageData[car] && !surplus2?pageData[car]['No3']['allocation']:""}}</td>
          </template>
        </tr>
        <tr>
          <th rowspan="2">进出合计</th>
          <template v-for="car in carNum">
            <td
              :key="car+'No1_aggregate'"
              :class="symbolClass(aggreData(car,'No1'))"
            >{{aggreData(car,"No1")}}</td>
            <td
              :key="car+'No2_aggregate'"
              :class="symbolClass(surplus1?'':aggreData(car,'No2'))"
            >{{surplus1?"": aggreData(car,"No2")}}</td>
            <td
              :key="car+'No3_aggregate'"
              :class="symbolClass(surplus2?'':aggreData(car,'No3'))"
            >{{surplus2?"": aggreData(car,"No3")}}</td>
          </template>
        </tr>
        <tr>
          <template v-for="car in carNum">
            <td
              colspan="3"
              :key="car+'_aggregate'"
              :class="symbolClass(pageData[car] ? pageData[car]['aggregate']:'')"
            >{{pageData[car] ? pageData[car]['aggregate']:""}}</td>
          </template>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="empty-cell" />
          <td>进:</td>
          <td colspan="2" class="cell">{{pageData.totalIn?pageData.totalIn:""}}</td>
          <td colspan="2" class="empty-cell" />
          <td>出:</td>
          <td colspan="2" class="cell">{{pageData.totalOut?pageData.totalOut:""}}</td>
          <td colspan="2" class="empty-cell" />
          <td>余额:</td>
          <td colspan="2" class="cell">{{pageData.remain?pageData.remain:""}}</td>
          <td colspan="3" class="empty-cell" />
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
export default {
  name: "tridayTable",
  computed: {
    surplus1() {
      return this.page * 3 - 1 > this.curMonLength;
    },
    surplus2() {
      return this.page * 3 > this.curMonLength;
    },
    aggreData() {
      return (car, pos) =>
        this.pageData[car] ? this.pageData[car][pos]["aggregate"] : "";
    },
    pageData() {
      return this.tridayData["page" + this.page] || {};
    },
    symbolClass() {
      return val => (val > 0 ? "plus" : val < 0 ? "minus" : "");
    },
    speClass() {
      return (car, pos) => {
        let p = pos.slice(2),
          surplus = p == 2 ? this.surplus1 : p == 3 ? this.surplus2 : "",
          val =
            this.pageData[car] && !surplus
              ? this.pageData[car][pos]["income"]
              : "";
        return val.indexOf("休班") > -1
          ? "xiuban"
          : val.indexOf("未跑") > -1
          ? "weipao"
          : val.indexOf("踏班") > -1
          ? "taban"
          : "";
      };
    }
  },
  props: ["page", "carNum", "curMonLength", "tridayData"]
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
    background-color: rgba(235, 235, 235, 0.7);

    tr {
      line-height: 2rem;
    }

    th,
    td {
      width: 4rem;
      border: 1px solid #666;
    }
    tbody td {
      background-color: rgba(239, 255, 210, 0.7);
    }
    .date {
      background-color: rgb(217, 225, 242);
    }
    .cell {
      background-color: rgba(255, 255, 0, 0.5);
    }
    .plus {
      background-color: rgba(145, 192, 236, 0.7);
      color: #000;
    }

    .minus {
      background-color: rgba(255, 170, 217, 0.7);
      color: #f30;
    }
  }
}
</style>