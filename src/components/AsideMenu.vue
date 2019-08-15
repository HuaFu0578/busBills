<!--
 * @Description: 侧边栏路由导航菜单
 * @Author: LiuHuaifu
 * @Date: 2019-08-05 07:45:15
 * @LastEditTime: 2019-08-15 10:49:05
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="aside">
    <ul @mousedown="handleMDown" @mouseup="handleMUp">
      <router-link
        tag="li"
        v-for="(item,index) in routeReg"
        :key="item.to.name"
        :data-index="index"
        :class="{clicked:item.hasDown===true}"
        :to="item.to"
      >{{item.desc}}</router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      routeReg: [
        { to: { name: "input" }, desc: "账单输入", hasDown: false },
        { to: { name: "daily" }, desc: "每日小结", hasDown: false },
        { to: { name: "threeday" }, desc: "三日小结", hasDown: false },
        { to: { name: "final" }, desc: "账单汇总", hasDown: false }
      ]
    };
  },
  methods: {
    handleMDown(e) {
      if (e.target.tagName !== "LI") {
        return;
      }
      let index = e.target.dataset.index,
        itemObj = this.routeReg[index];
      itemObj.hasDown = true;
      this.$set(this.routeReg, index, itemObj); //数组更改时立即渲染视图
    },
    handleMUp(e) {
      if (e.target.tagName !== "LI") {
        return;
      }
      let index = e.target.dataset.index,
        itemObj = this.routeReg[index];
      itemObj.hasDown = false;
      this.$set(this.routeReg, index, itemObj);
    }
  }
};
</script>
<style lang="less" scoped>
// @top-height: calc(16px * 4); // 定义顶端高度
@top-height: 4rem;
@aside-width: 13%; // 定义侧边栏宽度

#aside {
  flex: 1 1 @aside-width;
  width: @aside-width;
  // min-width: calc(16px * 12);
  min-width: 12rem;
  height: 100%;
  background-color: rgba(255, 165, 0, 0.7);

  ul {
    width: 100%;
    // height: calc(16px * 14);
    height: 14rem;
    // padding: calc(16px * 2) 0;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    overflow: hidden;

    li {
      // width: calc(16px * 7.5);
      // padding: calc(16px * 0.4) calc(16px * 1.5) calc(16px * 0.4) calc(16px * 2);
      // border-top-left-radius: calc(16px * 0.5);
      // border-bottom-left-radius: calc(16px * 0.5);
      // box-shadow: calc(-16px * 0.3) calc(16px * 0.6) calc(16px * 0.6)
      //     rgba(0, 0, 0, 0.5),
      //   inset 0px calc(-16px * 0.3) calc(16px * 0.3) 0px rgba(23, 23, 23, 0.8);
      width: 6 * 1.25rem;
      padding: 0.4rem 1.5rem 0.4rem 2rem;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      box-shadow: -0.3rem 0.6rem 0.6rem rgba(0, 0, 0, 0.5),
        inset 0px -0.3rem 0.3rem 0px rgba(23, 23, 23, 0.8);
      background-color: #ddd;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 600;
      transform: scale(1);
      transition: transform 0.2s linear;

      &:hover {
        transform: scale(1.15);
      }
      &.clicked {
        box-shadow: -0.3rem 0.6rem 0.6rem rgba(0, 0, 0, 0.5);
        color: red;
      }
    }
  }
  .router-link-exact-active {
    background: radial-gradient(ellipse at center, #fff, rgb(78, 243, 2));
  }
}
</style>
