<!--
 * @Description: 设置菜单
 * @Author: LiuHuaifu
 * @Date: 2019-08-06 15:19:36
 * @LastEditTime: 2019-12-03 22:31:06
 * @LastEditors: your name
 -->
<template>
  <div
    class="setting-menu stm balance"
    :class="Object.keys(menuItems).length>0?'item-num-'+Object.keys(menuItems).length:''"
    title="设置"
    @mouseleave="handleLeave"
  >
    <button
      v-for="(item,key) in menuItems"
      :key="item.title"
      :class="`menu-btn ${key} ${whichItemShow==key?'down-arrow':''}`"
      :title="showTitle?item.title:''"
      @click="item.callback"
    >
      <item-show
        v-if="whichItemShow==key"
        :type="whichItemShow"
        :defaultParams="defaultParams"
        :itemShowEnter="itemShowEnter"
        :itemShowLeave="itemShowLeave"
        :paramsCallback="paramsCallback"
        :arithmeticCb="arithmeticCb"
      />
    </button>
  </div>
</template>
<script>
export default {
  props: [
    "menuItems",
    "whichItemShow",
    "defaultParams",
    "showTitle",
    "paramsCallback",
    "arithmeticCb"
  ],
  components: {
    itemShow: () => import("../components/MenuItemShow")
  },
  methods: {
    handleLeave() {
      this.$emit("update:whichItemShow", "");
    },
    itemShowEnter() {
      this.$emit("update:showTitle", false);
    },
    itemShowLeave() {
      this.$emit("update:showTitle", true);
    }
  }
};
</script>

<style lang="less" scoped>
@menu-item-number: 5; //菜单项的个数最多为5个
@item-gap: 1rem; //菜单项之间的间隙
@squre-size: 1.8rem;

.setting-menu {
  width: 0;
  height: @squre-size;
  padding: 0.3rem;
  padding-right: @squre-size; //为伪元素留空间
  border-radius: 0.5rem;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  right: 1rem;
  top: 0;
  bottom: 0;
  margin: auto 0;
  transition: all 0.3s linear;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &::after {
    content: "";
    width: @squre-size;
    height: @squre-size;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background-image: url(../assets/setting.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    background-color: yellowgreen;
  }
  .itemNum(@number) {
    @className: ~"item-num-@{number}";
    &.@{className}:hover {
      width: (@squre-size + @item-gap) * @number+ @item-gap;
    }
  }
  .loopItem(@i) when(@i <= @menu-item-number) {
    .itemNum(@i);
    .loopItem(@i+1);
  }
  .loopItem(1);

  &:hover {
    background-color: rgba(210, 243, 198, 0.5);

    button {
      display: block;
    }
  }

  button {
    border: none;
    outline: none;
    display: none;
    width: @squre-size;
    height: @squre-size;
    margin-right: @item-gap;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: yellowgreen;
    }

    &.down-arrow::after {
      @arrow-size: 0.6rem;
      content: "";
      position: absolute;
      bottom: -@arrow-size - 0.2rem;
      height: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 0;
      border-width: @arrow-size+.2rem @arrow-size;
      border-style: solid;
      border-color: transparent transparent #ddd;
    }
  }
}
</style>
<style lang="less" scoped>
// 移动端适配
@media (max-width: 768px) {
  .setting-menu {
    &.balance.stm:hover {
      width: 1.8rem+1rem;
    }
    button:not(.oilFee) {
      display: none;
    }
  }
}
</style>