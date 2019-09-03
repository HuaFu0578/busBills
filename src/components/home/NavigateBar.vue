<!--
 * @Description: file description
 * @Author: LiuHuaifu
 * @Date: 2019-08-31 16:32:53
 * @LastEditors: your name
 * @LastEditTime: 2019-09-01 10:06:49
 -->
<template>
  <div class="wrapper">
    <ul>
      <router-link :to="{name:'input'}" tag="li">
        <div class="tab tab-input"></div>
        <p class="text">账单输入</p>
      </router-link>
      <router-link :to="{name:'daily'}" tag="li">
        <div class="tab tab-daily"></div>
        <p class="text">每日小结</p>
      </router-link>
      <router-link :to="{name:'threeday'}" tag="li">
        <div class="tab tab-threeday"></div>
        <p class="text">三日小结</p>
      </router-link>
      <router-link :to="{name:'final'}" tag="li">
        <div class="tab tab-final"></div>
        <p class="text">账单汇总</p>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .tab {
        width: 4vh;
        height: 4vh;
        background-size: 100% 100%;
      }
      .text {
        font-size: 2vh;
        line-height: 2vh;
      }
      &.router-link-exact-active {
        .text {
          color: red;
        }
        .tab {
          background-image: url(../../assets/selected.png);
        }
      }
      .tab-input {
        background-image: url(../../assets/incomeinput.png);
      }
      .tab-daily {
        background-image: url(../../assets/dailytotal.png);
      }
      .tab-threeday {
        background-image: url(../../assets/threetotal.png);
      }
      .tab-final {
        background-image: url(../../assets/summary.png);
      }
    }
  }
}
</style>