<!--
 * @Description: 最后账单统计图
 * @Author: LiuHuaifu
 * @Date: 2019-08-11 16:11:37
 * @LastEditTime: 2019-08-16 10:36:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="container">
    <static-charts class="g1" :options="deductOpt" />
    <static-charts class="g2" :options="incomeOpt" />
    <static-charts class="g3" :options="specialOpt" />
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import staticCharts from "./StaticCharts";
export default {
  data() {
    return {
      deductOpt: {
        title: {
          text: "10%提成进出账总数",
          textAlign: "center",
          top: "5%",
          left: "48%"
        },
        xAxis: { type: "category" },
        yAxis: {
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: { fontSize: 16 },
          axisLabel: {
            show: true,
            formatter: "{value}元",
            fontSize: 11
          },
          axisPointer: { show: true, type: "line" }
        },
        legend: { bottom: "5%" },
        dataset: {},
        tooltip: {},
        series: [
          {
            type: "bar",
            stack: "balance",
            barWidth: 25 + "%",
            barGap: "20%",
            itemStyle: { color: "#2683e7" },
            label: {
              show: true,
              position: "top",
              fontWeight: 600,
              color: "#000"
            }
          },
          {
            type: "bar",
            stack: "balance",
            barWidth: 25 + "%",
            barGap: "20%",
            itemStyle: { color: "#e64c9e" },
            label: {
              show: true,
              position: "top",
              fontWeight: 600,
              color: "#000"
            }
          }
        ]
      },
      incomeOpt: {
        title: {
          text: "各车毛收入统计",
          textAlign: "center",
          top: "5%",
          left: "48%"
        },
        xAxis: { type: "category" },
        yAxis: {
          nameLocation: "center",
          nameGap: 50,
          nameTextStyle: { fontSize: 16 },
          axisLabel: {
            show: true,
            fontSize: 12,
            formatter: "{value}元"
          },
          axisPointer: { show: true, type: "line" }
        },
        legend: { bottom: "5%" },
        dataset: {},
        tooltip: {},
        grid: {
          x2: 150
        },
        series: [
          {
            type: "bar",
            barWidth: 25 + "%",
            barGap: "20%",
            itemStyle: { color: "#582fdf" },
            label: {
              show: true,
              position: "top",
              fontWeight: 600,
              color: "#000"
            }
          }
        ]
      },
      specialOpt: {
        title: {
          text: "各车特殊情况天数统计",
          textAlign: "center",
          top: "5%",
          left: "48%"
        },
        legend: { bottom: "5%" },
        tooltip: {},
        dataset: {},
        xAxis: { type: "category" },
        yAxis: {
          nameLocation: "center",
          nameGap: 35,
          nameTextStyle: { fontSize: 14 },
          axisLabel: {
            show: true,
            formatter: "{value}天"
          }
        },
        series: [
          {
            type: "bar",
            itemStyle: { color: "#cd12de" },
            label: {
              show: true,
              position: "top",
              fontWeight: 600,
              color: "#000"
            }
          },
          {
            type: "bar",
            itemStyle: { color: "red" },
            label: {
              show: true,
              position: "top",
              fontWeight: 600,
              color: "#000"
            }
          },
          {
            type: "bar",
            itemStyle: { color: "orange" },
            label: {
              show: true,
              position: "top",
              fontWeight: 600,
              color: "#000"
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["dealedData"]),
    ...mapState("FinalTable", ["isFixed"]),
    ...mapGetters(["carName"]),
    deductTotal() {
      let summaryData = this.dealedData.commonData.summaryData,
        afterDeduction = summaryData.afterDeduction
          ? this.isFixed
            ? summaryData.afterDeduction.fixedData
            : summaryData.afterDeduction
          : {},
        dimensions = ["carName", "10%提成后进账", "10%提成后出账"],
        source = [];
      this.carName.forEach(carname => {
        let car = carname.slice(1),
          value = afterDeduction[car];
        value = isNaN(parseInt(value)) ? "" : value;
        source.push({
          [dimensions[0]]: carname,
          [dimensions[1]]: value >= 0 ? value : "",
          [dimensions[2]]: value < 0 ? value : ""
        });
      });
      return { dimensions, source };
    },
    sumAmount() {
      let specialData = this.dealedData.specialData,
        monthSum = specialData.monthSum || "",
        dimensions = ["income", "毛收入（包括油补）"],
        source = [];
      this.carName.forEach(carname => {
        let car = carname.slice(1);
        source.push({
          [dimensions[0]]: carname,
          [dimensions[1]]: monthSum ? monthSum[car] : ""
        });
      });
      this.setAverageLine(monthSum.averageSum);
      return { dimensions, source };
    },
    specialCir() {
      let specialData = this.dealedData.specialData,
        xbTimes = specialData.xbTimes || "",
        wpTimes = specialData.wpTimes || "",
        tbTimes = specialData.tbTimes || "",
        source = [],
        dimensions = ["carName", "休班天数", "未跑天数", "踏班天数"];
      this.carName.forEach(carname => {
        let car = carname.slice(1);
        source.push({
          [dimensions[0]]: carname,
          [dimensions[1]]:
            xbTimes == ""
              ? ""
              : isNaN(parseInt(xbTimes[car]))
              ? 0
              : xbTimes[car],
          [dimensions[2]]:
            wpTimes == ""
              ? ""
              : isNaN(parseInt(wpTimes[car]))
              ? 0
              : wpTimes[car],
          [dimensions[3]]:
            tbTimes == ""
              ? ""
              : isNaN(parseInt(tbTimes[car]))
              ? 0
              : tbTimes[car]
        });
      });
      return { dimensions, source };
    }
  },
  components: {
    staticCharts
  },
  created() {
    this.setPartParam();
  },
  activated() {
    this.setPartParam();
  },
  methods: {
    setPartParam() {
      this.$set(this.deductOpt, "dataset", this.deductTotal);
      this.$set(this.incomeOpt, "dataset", this.sumAmount);
      this.$set(this.specialOpt, "dataset", this.specialCir);
    },
    setAverageLine(val) {
      let markLine = {
        label: {
          position: "end",
          formatter: "{b}:{c}元",
          color: "#fff",
          backgroundColor: "#582fdf",
          fontSize: 16,
          padding: 5,
          borderRadius: 5
        },
        lineStyle: {
          type: "dotted",
          color: "red"
        },
        precision: 0,
        data: [{ name: "平均", yAxis: val }]
      };
      this.incomeOpt.series[0].markLine = markLine;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .g1,
  .g2,
  .g3 {
    width: 700px;
    height: 400px;
  }
}

</style>