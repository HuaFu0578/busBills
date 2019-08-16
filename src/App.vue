<!--
 * @Description: 应用主页面
 * @Author: LiuHuaifu
 * @Date: 2019-08-03 07:35:24
 * @LastEditTime: 2019-08-16 09:25:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <div class="route-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
:root,
body {
  width: 100%;
  height: 100%;
  // font-size: 16px; /*px*/
  font-family: "华文楷体", "宋体", "SimSum", "Sans-serif ";
}

input {
  border: none;
  outline: none;
}
#app {
  width: 100%;
  height: 100%;
  text-align: center;
  background-image: url(./assets/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;

  .route-wrapper {
    height: 100%;
    width: 100%;
  }
}
.wait-print {
  display: none !important;
}
@media print {
  .noprint {
    display: none !important;
  }
  .wait-print {
    display: block;
  }
}

:root {
  font-size: 12px;
  @media (min-width: 576px) {
    font-size: 12px;
  }
  @media (min-width: 768px) {
    font-size: 14px;
  }
  @media (min-width: 992px) {
    font-size: 14px;
  }
  @media (min-width: 1200px) {
    font-size: 16px;
  }
}
</style>
