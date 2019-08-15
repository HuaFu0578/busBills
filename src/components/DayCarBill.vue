<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 16:01:57
 * @LastEditTime: 2019-08-11 15:09:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="tr">
    <div class="th lt" :class="{focus:isFocused}">
      <span>{{day}}</span>
    </div>
    <div class="tr-group">
      <input
        class="td"
        v-for="(item,index) in carNum"
        :key="'day_bill_pos'+index"
        type="text"
        :class="transClass(sendDayBill[item])"
        :data-pos="day+','+(index+1)"
        :data-car="item"
        :data-day="day"
        :ref="day+'_'+(index+1)"
        v-focus
        :value="sendDayBill[item]"
        @change="inpValChange"
        @focus="handleFocus(index+1)"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isFocused: false
    };
  },
  computed: {
    ...mapState(["carNum"])
  },
  inject: ["refsMap"],
  props: ["day", "sendDayBill", "curMonLength", "focusingCar"],
  methods: {
    inpValChange(e) {
      let target = e.target,
        value = target.value,
        car = target.dataset.car,
        day = "day" + target.dataset.day;
      this.$set(this.sendDayBill, car, value);
      this.$emit("addDayBill", day, car, value);
    },
    handleFocus(val) {
      this.isFocused = true;
      this.$emit("update:focusingCar", val);
    },
    handleBlur() {
      this.isFocused = false;
      this.$emit("update:focusingCar", "");
    },
    transClass(val) {
      if (typeof val == "string") {
        let addClass =
          val.indexOf("休班") > -1
            ? "xiuban"
            : val.indexOf("未跑") > -1
            ? "weipao"
            : val.indexOf("踏班") > -1
            ? "taban"
            : "";
        return addClass;
      }
    }
  },
  mounted() {
    let ref = this.$refs,
      refsMap = this.refsMap,
      refArr = Object.keys(ref),
      refLen = refArr.length,
      curRow = refArr[0].split("_")[0];

    refArr.forEach((name, index) => {
      let dom = ref[name][0],
        dirStore = dom.dirStore || (dom.dirStore = {});
      refsMap.set(name, dom);
      if (index == 0) {
        dirStore.left = ref[refArr[refLen - 1]][0];
        dirStore.right = ref[refArr[index + 1]][0];
      } else if (index == refLen - 1) {
        dirStore.left = ref[refArr[index - 1]][0];
        dirStore.right = ref[refArr[0]][0];
      } else {
        dirStore.left = ref[refArr[index - 1]][0];
        dirStore.right = ref[refArr[index + 1]][0];
      }

      if (curRow != 1) {
        let lastEleName = curRow - 1 + "_" + name.split("_")[1];
        let lastEle = refsMap.get(lastEleName);
        dirStore.top = lastEle;
        lastEle.dirStore.bottom = dom;
      }
      if (curRow == this.curMonLength) {
        let firstEle = refsMap.get(1 + "_" + name.split("_")[1]);
        dirStore.bottom = firstEle;
        firstEle.dirStore.top = dom;
      }
    });
  },
  directives: {
    focus: {
      bind(el, bindings, vnode) {
        el.onfocus = function() {
          document.onkeydown = function(e) {
            switch (e.keyCode) {
              //上
              case 38: {
                el.dirStore.top.focus();
                break;
              }
              //下
              case 40: {
                el.dirStore.bottom.focus();
                break;
              }
              //左
              case 37: {
                el.dirStore.left.focus();
                break;
              }
              //右
              case 39: {
                el.dirStore.right.focus();
                break;
              }
            }
          };
        };
        el.addEventListener("blur", function() {
          document.onkeydown = null;
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tr .td {
  outline: none;
  border: none;
}

.td:focus {
  outline: 0.2rem solid red !important;
}
</style>
