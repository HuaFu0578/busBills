<!--
 * @Description: 数据输入页
 * @Author: LiuHuaifu
 * @Date: 2019-08-13 09:41:23
 * @LastEditTime: 2019-08-15 10:38:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="input-page">
    <div class="table">
      <div class="thead">
        <div class="tr">
          <div
            class="th"
            v-for="(item,index) in ['',...carName]"
            :key="'inp-head'+index"
            :class="`${index==0 ?'lt':''} ${focusingCar===index ? 'focus':''}`"
          >
            <span>{{item}}</span>
          </div>
        </div>
      </div>
      <div class="tbody">
        <div class="tr" v-for="day in curMonLength" :key="'daybill'+day">
          <div class="th lt" :class="{focus:isFocused(day)}">
            <span>{{day}}</span>
          </div>
          <div class="tr-group">
            <input
              class="td"
              v-for="(item,index) in carNum"
              :key="'day_bill_pos'+index"
              type="text"
              :class="transClass(receiveOrData(day)[item])"
              :data-pos="day+','+(index+1)"
              :data-car="item"
              :data-day="day"
              :ref="day+'_'+(index+1)"
              v-focus
              :value="receiveOrData(day)[item]"
              @change="inpValChange"
              @focus="handleFocus(day,(index+1))"
              @blur="handleBlur"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      focusingCar: -1,
      focusingDay: -1
    };
  },
  computed: {
    ...mapState(["carNum"]),
    ...mapGetters(["carName"]),
    isFocused() {
      return day => (this.focusingDay == day ? true : false);
    },
    receiveOrData() {
      return day => JSON.parse(this.sendOriginData)["day" + day];
    }
  },
  props: ["sendOriginData", "curMonLength"],
  methods: {
    inpValChange(e) {
      let target = e.target,
        value = target.value,
        car = target.dataset.car,
        day = "day" + target.dataset.day;
      this.$emit("dealDayBill", day, car, value);
    },
    handleFocus(day, carIndex) {
      this.focusingCar = carIndex;
      this.focusingDay = day;
    },
    handleBlur() {
      this.focusingCar = -1;
      this.focusingDay = -1;
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
      refArr = Object.keys(ref);
    let [totalRow, totalCol] = refArr[refArr.length - 1].split("_");
    totalRow = parseInt(totalRow);
    totalCol = parseInt(totalCol);
    refArr.forEach((name, index) => {
      let dom = ref[name][0],
        dirStore = dom.dirStore || (dom.dirStore = {});
      let [curRow, curCol] = name.split("_");
      curRow = parseInt(curRow);
      curCol = parseInt(curCol);
      dirStore.top =
        ref[
          ((totalRow - 1 + (curRow - 1)) % totalRow) +
            1 +
            "_" +
            (((totalCol - 1 + curCol) % totalCol) + 1)
        ][0];
      dirStore.right =
        ref[
          ((totalRow - 1 + curRow) % totalRow) +
            1 +
            "_" +
            (((totalCol - 1 + curCol + 1) % totalCol) + 1)
        ][0];
      dirStore.bottom =
        ref[
          ((totalRow - 1 + (curRow + 1)) % totalRow) +
            1 +
            "_" +
            (((totalCol - 1 + curCol) % totalCol) + 1)
        ][0];
      dirStore.left =
        ref[
          ((totalRow - 1 + curRow) % totalRow) +
            1 +
            "_" +
            (((totalCol - 1 + curCol - 1) % totalCol) + 1)
        ][0];
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

<style scoped>
.input-page {
  margin: 0 auto;
  /* font-size: calc(16px * 1.2); */
  font-size: 1.2rem;
  /* line-height: calc(16px * 1.5); */
  line-height: 1.5rem;
  display: flex;
}
.table {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

.thead {
  width: 100%;
  height: 10%;
  flex: 0 0 10%;
  /* min-height: calc(16px * 2); */
  min-height: 2rem;
}

.tbody {
  width: 100%;
  /* flex: 0 0 calc(90% - calc(16px * 1.78)); */
  flex: 0 0 calc(90% - 1.78rem);
  /* height: calc(90% - calc(16px * 1.78)); */
  height: calc(90% - 1.78rem);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.tbody::-webkit-scrollbar {
  display: none;
}
.tr {
  display: flex;
  width: 100%;
}
.tr /*>>>*/ .th.lt {
  width: 7%;
  flex: 1 1 7%;
  /* min-width: calc(16px *); */
  min-width: 1.6rem;
}
.tr /*>>>*/ .tr-group {
  width: 93%;
  flex: 1 1 93%;
}
.tr /*>>>*/ .tr-group .th,
.tr /*>>>*/ .tr-group .td {
  flex: 1 1 calc(100% / 6);
  width: calc(100% / 6);
}

.tr /*>>>*/ .th {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(88, 228, 163);
  font-weight: 800;
}
.tr /*>>>*/ .td {
  font-weight: 500;
  outline: none;
  border: none;
}

.td:focus {
  outline: 2px solid red !important;
  outline: 0.2rem solid red !important;
}

.thead .tr {
  height: 100%;
}
.tr /*>>>*/ .th,
.tr /*>>>*/ .td {
  flex: 1 1 15.5%;
  width: 15.5%;
  text-align: center;
  /* font-size: calc(16px * 1.5); */
  font-size: 1.5rem;
  /* border: calc(16px * 0.06) solid rgba(58, 58, 58, 0.7); */
  border: 0.06rem solid rgba(58, 58, 58, 0.7);
  box-sizing: border-box;
}
.tr /*>>>*/ .th:not(.lt),
.tr /*>>>*/ .td {
  /* min-width: calc(16px * 6.6); */
  min-width: 6.6rem;
}
.tr /*>>>*/ .xiuban {
  color: #cd12de;
}
.tr /*>>>*/ .weipao {
  color: #f00;
}
.tr /*>>>*/ .taban {
  color: orange;
  font-size: 1rem !important;
}
.tr /*>>>*/ .th.focus {
  background-color: rgb(245, 65, 65);
  color: #fff;
}
</style>


