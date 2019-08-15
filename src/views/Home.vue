<!--
 * @Description: 主页面
 * @Author: LiuHuaiFu
 * @Date: 2019-08-08 08:01:20
 * @LastEditTime: 2019-08-13 22:09:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="content">
    <aside-menu></aside-menu>
    <div id="show-page">
      <keep-alive exclude="inputPage">
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import AsideMenu from "@/components/AsideMenu";
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
    }, 400);

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

<style lang="less" scoped>
.content {
  @aside-width: 13%; // 定义侧边栏宽度

  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;

  #show-page {
    flex: 1 1 calc(100% - @aside-width);
    width: calc(100% - @aside-width);
    height: 100%;
    position: relative;
  }
}
</style>
