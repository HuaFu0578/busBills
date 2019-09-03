<!--
 * @Description: 最后账单统计图
 * @Author: LiuHuaifu
 * @Date: 2019-08-11 16:11:37
 * @LastEditTime: 2019-09-03 20:07:41
 * @LastEditors: your name
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
      isMobile: false,
      incomeMin: Infinity,
      incomeMax: -Infinity,
      incomeAverage: 0,
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
        grid: { containLabel: true },
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
            formatter: this.formatIncomeData
          },
          axisPointer: { show: true, type: "line" }
        },
        legend: { bottom: "5%" },
        dataset: {},
        tooltip: {},
        grid: { containLabel: true },
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
        grid: { containLabel: true },
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
        carName = this.carName,
        source = [],
        min = Infinity,
        max = -Infinity,
        average = monthSum.averageSum;
      this.carName.forEach(carname => {
        let car = carname.slice(1),
          value = monthSum ? monthSum[car] : "";
        value < min ? (min = value) : value > max ? (max = value) : "";
        source.push({
          [dimensions[0]]: carname,
          [dimensions[1]]: value
        });
      });
      this.setAverageLine(average);
      this.incomeMin = min;
      this.incomeMax = max;
      this.incomeAverage = average;
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
    this.rotateLabel();
    this.setPartParam();
  },
  activated() {
    this.setPartParam();
  },
  methods: {
    formatIncomeData(val, index) {
      if (index < 3) {
        if (val < this.incomeMin) {
          //TODO:将使用最小值将Y轴分成4：6刻度，最小值从4/10处开始，将数据集中到上面刻度
        }
      }
      return `${val}元`;
    },
    setPartParam() {
      this.$set(this.deductOpt, "dataset", this.deductTotal);
      this.$set(this.incomeOpt, "dataset", this.sumAmount);
      this.$set(this.specialOpt, "dataset", this.specialCir);
    },
    setAverageLine(val) {
      let markLine = {
        label: {
          position: "start",
          formatter: "{b}:{c}元",
          color: "#fff",
          backgroundColor: "#582fdf",
          fontSize: 12,
          padding: 5,
          borderRadius: 5
        },
        lineStyle: {
          type: "dotted",
          color: "rgb(255,0,0)"
        },
        precision: 0,
        data: [{ name: "平均", yAxis: val }],
        symbol: ["circle", "none"]
      };
      this.incomeOpt.series[0].markLine = markLine;
    },
    rotateLabel() {
      //如果为移动端，则稍微调整Canvas图
      if (window.innerWidth < 768) {
        [this.deductOpt, this.incomeOpt, this.specialOpt].forEach(
          (el, index) => {
            this.$set(el.xAxis, "axisLabel", {
              rotate: 45,
              fontSize: 12
            });
            if (index == 0) {
              let fontSize = window.innerWidth < 350 ? 8 : 10;
              this.$set(el.series[0].label, "fontSize", fontSize);
              this.$set(el.series[1].label, "fontSize", fontSize);
            } else if (index == 1) {
              this.$set(el.series[0].label, "rotate", 45);
              this.$set(el.title, "top", "0");
              this.$set(el.series[0].label, "position", [0, "-5%"]);
            }
          }
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  .g1,
  .g2,
  .g3 {
    margin: auto;
    width: 800px;
    height: 50vh;
    min-height: 400px;
  }
}
</style>
<style lang="less" scoped>
//移动端适配
@media (max-width: 768px) {
  .container {
    height: auto;
    .g1,
    .g2,
    .g3 {
      width: 90vw;
      height: 50vh;
      box-sizing: border-box;
    }
  }
}
</style>