<!--
 * @Description: 自定义默认按钮
 * @Author: LiuHuaifu
 * @Date: 2019-08-04 10:30:40
 * @LastEditTime: 2019-08-13 07:41:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <button @mousedown="handleDown" @mouseup="handleUp" :class="addClass===true?toggleClass:''">
    <slot name="btn-text"></slot>
  </button>
</template>
<script>
export default {
  data() {
    return {
      addClass: false
    };
  },
  props: ["toggleClass"],
  methods: {
    handleDown() {
      this.addClass = true;
    },
    handleUp() {
      this.addClass = false;
    }
  }
};
</script>
