<!--
 * @Description: 将Echarts动态图片转成Base64再通过img展示出来
 * @Author: LiuHuaifu
 * @Date: 2019-08-11 22:31:13
 * @LastEditTime: 2019-09-03 20:22:29
 * @LastEditors: your name
 -->
<template>
  <div class="wrapper">
    <div class="noprint" :ref="'chartBox'"></div>
    <div class="waitprint">
      <img :ref="'chartImg'" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["options", "imgParams"],
  watch: {
    "options.dataset": {
      handler(nVal, oVal) {
        this.refreshCharts();
      }
    }
  },
  mounted() {
    this.refreshCharts();
  },
  methods: {
    refreshCharts() {
      try {
        let { chartBox, chartImg } = this.$refs;
        let chart = this.$echarts.init(chartBox);
        chart.setOption(this.options);
        chart.on("finished", () => {
          chartImg.src = chart.getDataURL(this.imgParams || {});
        });
      } catch (e) {}
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper,
.waitprint,
.noprint {
  width: 100%;
  height: 100%;
}
.waitprint {
  display: none;
}
@media print {
  .waitprint {
    display: block;
  }
  .noprint {
    display: none;
  }
}
</style>