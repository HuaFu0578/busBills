<!--
 * @Description: 菜单项展示
 * @Author: LiuHuaifu
 * @Date: 2019-08-07 08:05:48
 * @LastEditTime: 2019-08-13 07:39:14
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper" @mouseenter="itemShowEnter" @mouseleave="itemShowLeave">
    <template v-if="type=='oilFee'">
      <div class="oil-fee">
        <div class="oil">
          <label class="label" for="single_oil_fee">单车油补：</label>
          <input
            type="text"
            id="single_oil_fee"
            :value="defaultParams.oilFee"
            @blur="paramsCallback($event,'oilFee')"
          />
          <span>元</span>
        </div>
        <div class="oil">
          <label class="label" for="multiply_oil_fee">多车油补：</label>
          <input
            type="text"
            id="multiply_oil_fee"
            :value="defaultParams.mulOilFee"
            @blur="paramsCallback($event,'mulOilFee')"
          />
          <span>元</span>
        </div>
      </div>
      <div class="remain-fee">
        <div class="remain">
          <label class="label" for="last_remain">上月余额：</label>
          <input
            type="text"
            id="last_remain"
            :value="defaultParams.lastMonthRemain"
            @blur="paramsCallback($event,'lastMonthRemain')"
          />
          <span>元</span>
        </div>
        <div class="remain">
          <label class="label" for="cur_remain">本月余额：</label>
          <input
            type="text"
            id="cur_remain"
            :value="defaultParams.currentMonthRemain"
            @blur="paramsCallback($event,'currentMonthRemain')"
            disabled
          />
          <span>元</span>
        </div>
      </div>
    </template>
    <template v-else-if="type=='printer'"></template>
    <template v-else-if="type=='output'"></template>
  </div>
</template>
<script>
export default {
  props: [
    "type",
    "defaultParams",
    "itemShowEnter",
    "itemShowLeave",
    "paramsCallback"
  ]
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 15rem;
  height: 10rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  position: absolute;
  top: 1.8rem + 0.5rem;
  right: -1rem;
  font-size: @font-size;
  @font-size: 1.1rem;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .oil-fee,
  .remain-fee {
    width: 100%;
    height: 40%;
    flex: 1 1 40%;
    display: flex;
    padding: 0.3rem;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .oil-fee .oil,
  .remain-fee .remain {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .oil-fee,
  .remain-fee {
    input {
      text-align: center;
      font-size: @font-size;
      padding: 0.2rem;
      box-sizing: border-box;
      width: 25%;
      height: 100%;
      background-color: rgb(200, 243, 46);
    }
  }
  .oil-fee {
    background-color: rgb(230, 182, 252);
  }
  .remain-fee {
    background-color: rgb(174, 222, 253);
  }
  #cur_remain {
    background-color: rgb(205, 222, 250);
  }
}
</style>

