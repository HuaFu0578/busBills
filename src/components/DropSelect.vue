<!--
 * @Description: 日期下拉选择框
 * @Author: LiuHuaifu
 * @Date: 2019-08-04 08:14:11
 * @LastEditTime: 2019-08-13 07:40:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <select :name="name" :id="id" @change="handleChanged" :value="search">
    <option :value="item" v-for="item in valueArr" :key="id+item">{{item}}</option>
  </select>
</template>
<script>
export default {
  props: ["name", "id", "valueArr", "search"],
  methods: {
    handleChanged(e) {
      let value = e.target.value;
      this.$emit("searchChange", parseInt(value));
    }
  }
};
</script>
<style scoped>
select {
  /*统一边框*/
  border: none;
  outline: none;
  text-align: center;
  text-align-last: center;
  background-color: transparent;
  /*将默认的select选择框样式清除*/
  appearance: none; /*这个样式就是清楚他的下拉按钮的默认样式*/
  -moz-appearance: none;
  -webkit-appearance: none;
}
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand {
  display: none;
}
option {
  font-size: 0.8em;
  line-height: 0.8em;
  background-color: #fff;
  text-align: center;
  text-align-last: center;
}
</style>
>

