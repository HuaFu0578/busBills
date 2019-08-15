<!--
 * @Description: 弹出框
 * @Author: LiuHuaifu
 * @Date: 2019-08-06 10:20:17
 * @LastEditTime: 2019-08-13 07:38:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- type:confirmModal || msgModal || generalModal-->
  <div id="mask" :class="{alpha:type=='confirmModal'}" @click.stop="handleModal(false)">
    <div class="box" v-if="type=='confirmModal'||type=='generalModal'">
      <div class="head">
        <img :src="tipsIcon" class="icon" v-show="tipsIcon" />
        <h3 class="notion">{{tips}}</h3>
      </div>
      <div class="msg-box">
        <p class="msg">{{msg}}</p>
      </div>
      <div class="btn-group">
        <button class="cancel" @click.stop="handleModal(false)" v-if="type=='confirmModal'">取消</button>
        <button class="confirm" @click.stop="handleModal(type=='confirmModal'?true:false)">确认</button>
      </div>
    </div>
    <div class="rect" v-else-if="type=='msgModal'">
      <div class="font-ico" :class="state"></div>
      <div class="notion">{{state=='success'?'数据保存成功':state=='fail'?'数据保存失败':''}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["msg", "tips", "tipsIcon", "type", "state"],
  methods: {
    handleModal(val) {
      if (this.type == "confirmModal") {
        this.$emit("isConfirm", val);
      } else if (this.type == "generalModal") {
        this.$emit("update:showGenModal", val);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$emit("update:autoHidden", false);
    }, 2000);
  }
};
</script>
<style lang="less" scoped>
#mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &.alpha {
    background-color: rgba(0, 0, 0, 0.5);
  }
  &:not(.alpha) .box {
    box-shadow: 0rem 0rem 0.6rem 0.1rem rgba(0, 0, 0, 0.5);
  }
  .box {
    z-index: 10;
    width: 20rem;
    height: 10rem;
    padding: 0.6rem 0 0;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.6rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .head {
      flex: 1 1 20%;
      height: 20%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      @size: 1.4rem;

      .icon {
        display: block;
        width: @size;
        height: @size;
      }

      .notion {
        margin-left: 0.5rem;
        font-size: @size;
        font-weight: 600;
      }
    }
    .msg-box {
      flex: 1 1 65%;
      height: 65%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.1rem;
      padding-bottom: 1rem;
      box-sizing: border-box;

      .msg {
        padding: 0 1.5rem;
      }
    }
    .btn-group {
      flex: 1 1 30%;
      height: 30%;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      button {
        flex: 1 1 50%;
        width: 50%;
        height: 100%;
        font-size: 1.2rem;
        padding: 0 1rem;
        border: none;
        outline: none;
        cursor: pointer;
      }
      .confirm {
        background-color: rgb(50, 247, 76);
      }
      .cancel {
        background-color: #ccc;
      }
    }
  }

  .rect {
    @size: 6.2rem;
    width: @size;
    height: @size;
    border-radius: 0.8rem;
    padding: 0.3rem;
    color: #fff;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);

    .font-ico {
      @size: 2rem;
      width: @size;
      height: @size;
      margin-bottom: 0.6rem;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      &.success {
        background-image: url(../assets/tick.png);
      }
      &.fail {
        background-image: url(../assets/forkMark.png);
      }
    }
  }
}
</style>
