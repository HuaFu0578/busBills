<!--
 * @Description: 数据输入页
 * @Author: LiuHuaifu
 * @Date: 2019-08-13 09:41:23
 * @LastEditTime: 2019-08-16 08:04:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="input-table">
    <div class="head-wrapper">
      <table cellspacing="0" cellpadding="0" border="0">
        <colgroup>
          <col class="lh" />
          <col class="content" v-for="car in carNum" :key="'head_col'+car" />
        </colgroup>
        <thead>
          <tr>
            <th class="lh"></th>
            <th
              class="content"
              v-for="(carname,index) in carName"
              :key="'head_'+carname"
              :class="focusingCar===index+1 ? 'focus':''"
            >{{carname}}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="body-wrapper">
      <table cellspacing="0" cellpadding="0" border="0">
        <colgroup>
          <col class="lh" />
          <col class="content" v-for="car in carNum" :key="'head_col'+car" />
        </colgroup>
        <tbody>
          <tr v-for="day in curMonLength" :key="'tr'+day">
            <th class="lh" :class="{focus:isFocused(day)}">{{day}}</th>
            <td class="content" v-for="(car,index) in carNum" :key="'tr'+day+car">
              <div class="aux-wrap">
                <input
                  type="text"
                  :class="transClass(receiveOrData(day)[car])"
                  :data-pos="day+','+(index+1)"
                  :data-car="car"
                  :data-day="day"
                  :ref="day+'_'+(index+1)"
                  v-focus
                  :value="receiveOrData(day)[car]"
                  @change="inpValChange"
                  @focus="handleFocus(day,(index+1),$event)"
                  @blur="handleBlur"
                  v-if="!isPrint"
                />
                <span v-else>{{receiveOrData(day)[car]}}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
  props: ["sendOriginData", "curMonLength", "isPrint"],
  methods: {
    inpValChange(e) {
      let target = e.target,
        value = target.value,
        car = target.dataset.car,
        day = "day" + target.dataset.day;
      this.$emit("dealDayBill", day, car, value);
    },
    handleFocus(day, carIndex, e) {
      e.target.select();
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
            if (e.keyCode < 37 || e.keyCode > 40) {
              return;
            }
            let dir = "";
            switch (e.keyCode) {
              //上
              case 38: {
                dir = "top";
                break;
              }
              //下
              case 40: {
                dir = "bottom";
                break;
              }
              //左
              case 37: {
                dir = "left";
                break;
              }
              //右
              case 39: {
                dir = "right";
                break;
              }
            }
            el.dirStore[dir].select();
            el.dirStore[dir].focus();
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
.input-table {
  width: 100%;
  height: 100%;
  padding: 0.6rem 1.2rem;
  box-sizing: border-box;

  @thead-row-heghit: 3.5rem;
  @tbody-row-height: 2.5rem;

  .head-wrapper {
    width: 100%;

    tr {
      line-height: @thead-row-heghit;
    }
  }
  .body-wrapper {
    height: 90%;
    overflow-y: auto;
    /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
    -ms-overflow-style: none;
    /*火狐下隐藏滚动条*/
    overflow: -moz-scrollbars-none;

    tr {
      line-height: @tbody-row-height;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
  table {
    width: 100%;
    height: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #666; /*no*/
    }
    .lh {
      width: 10%;
    }
    .content {
      width: calc(90% / 6);
    }
    tbody {
      input {
        width: 100%;
        height: @tbody-row-height;
        line-height: @tbody-row-height;
        border: none;
        outline: none;
        overflow: hidden;
        text-align: center;
        background-color: rgb(248, 248, 197);
        box-sizing: border-box;
      }
    }
    th {
      background-color: rgb(88, 228, 163);
      font-weight: 800;
      font-size: 1.8rem;

      &.focus {
        background-color: rgb(245, 65, 65);
        color: #fff;
      }
    }
    td {
      .aux-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: stretch;
      }

      input {
        font-weight: 500;
        font-size: 1.5rem;

        &:focus {
          border: 2px solid red; /*no*/
        }
      }

      .xiuban {
        color: #cd12de;
      }
      .weipao {
        color: #f00;
      }
      .taban {
        color: orange;
        font-size: 1rem;
      }
    }
  }
}
</style>

