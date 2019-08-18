<!--
 * @Description: 主页面
 * @Author: LiuHuaiFu
 * @Date: 2019-08-08 08:01:20
 * @LastEditTime: 2019-08-18 10:26:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-container class="container">
    <el-aside class="aside-menu" width="15%">
      <aside-menu></aside-menu>
    </el-aside>
    <el-main class="content-show">
      <keep-alive exclude="tridayTable">
        <router-view />
      </keep-alive>
    </el-main>
  </el-container>
</template>
<script>
import Vue from "vue";
import AsideMenu from "@/components/home/AsideMenu";
import { setTimeout } from "timers";

Vue.directive("print", (el, binding, vnode) => {
  if (binding.value) {
    let oIframe = document.createElement("iframe"); //使用iframe不用window.open是为了解决引用css样式问题
    oIframe.id = "printWindow";
    oIframe.width = 0;
    oIframe.height = 0;
    document.body.appendChild(oIframe);
    let printWindow = document.getElementById("printWindow"),
      doc = printWindow.contentDocument,
      win = printWindow.contentWindow;
    doc.write(document.head.innerHTML);
    doc.write(el.outerHTML);
    doc.close();
    setTimeout(() => {
      win.focus();
      win.print();
      win.close();
      printWindow.remove();
    }, 1000);

    let exp = binding.expression;
    vnode.context[exp] && (vnode.context[exp] = false);
  }
});
export default {
  components: {
    AsideMenu
  }
};
</script>


<style>
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
}

.el-aside {
  text-align: center;
  line-height: 200px;
}

.el-main {
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<style>
.container {
  width: 100%;
}
.container,
.aside-menu {
  height: 100%;
}

.el-main {
  padding: 0;
}
.w100 {
  width: 100%;
}
.h100 {
  height: 100%;
}
::-webkit-scrollbar {
  display: none;
}
.xiuban {
  color: #cd12de !important;
}
.weipao {
  color: #f00 !important;
}
.taban {
  color: orange !important;
  font-size: 1rem !important;
}
</style>