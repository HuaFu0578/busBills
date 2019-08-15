<!--
 * @Description: 登录页面
 * @Author: LiuHuaifu
 * @Date: 2019-08-08 07:43:39
 * @LastEditTime: 2019-08-13 16:16:21
 * @LastEditors: Please set LastEditors
 * @TODO: 账号暂时还只能一次性登录使用，无法进行缓存，此时功能待完善，配合后端进行设置
 -->
<template>
  <div class="login-page">
    <h1 class="title">华调线账单汇总系统</h1>
    <div class="login-box">
      <div class="username input-line">
        <label for="username" :class="{valid:username==''}">用户名：</label>
        <input
          id="username"
          type="text"
          v-model="username"
          :class="{nothing:isNothing||noUsername}"
          @blur="handleUserBlur"
          @keypress.enter="handleEnter"
          autofocus
        />
      </div>
      <div class="password input-line">
        <label for="password" :class="{valid:password==''}">密&emsp;码：</label>
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{nothing:isNothing||noPassword}"
          @blur="handlePwdBlur"
          @keypress.enter="handleEnter"
        />
      </div>
      <div class="btn-group">
        <button
          @click="submit"
          :class="{down:isDown}"
          @mousedown="handleDown"
          @mouseup="handleUp"
          @keypress.enter="handleEnter"
          class="btn-login"
        >立即登录</button>
      </div>
    </div>
    <pop-dialog
      v-if="showGenModal"
      :showGenModal.sync="showGenModal"
      type="generalModal"
      :tips="modalTips"
      :tipsIcon="modalTipsIcon"
      :msg="modalMsg"
    />
  </div>
</template>
<script>
import qs from "qs";
import { mapState } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      isDown: false,
      isNothing: false,
      noUsername: false,
      noPassword: false,
      showGenModal: false,
      modalTips: "",
      modalTipsIcon: "",
      modalMsg: ""
    };
  },
  computed: {
    ...mapState(["authorized", "siteHF"])
  },
  components: {
    popDialog: () => import("../components/PopDialog")
  },
  methods: {
    submit() {
      if (!(this.username && this.password)) {
        this.isNothing = true;
      } else {
        let data = qs.stringify({
          data: this.comMethods.encrypt({
            username: this.username,
            password: this.password
          })
        });
        this.$ajax.defaults.withCredentials = true;
        this.$ajax
          .post("/busBills/login", data)
          .then(res => {
            if (res.data.status == "ok") {
              this.jumpToHome();
            } else {
              this.modalTips = "温馨提示";
              this.modalMsg = "用户名或密码错误！";
              this.showGenModal = true;
            }
          });
        this.$ajax.defaults.withCredentials = false;
      }
    },
    handleUserBlur() {
      if (this.username) {
        this.noUsername = false;
      } else {
        this.noUsername = true;
      }
    },
    handlePwdBlur() {
      if (this.password) {
        this.noPassword = false;
      } else {
        this.noPassword = true;
      }
    },
    handleDown() {
      this.isDown = true;
    },
    handleUp() {
      this.isDown = false;
    },
    handleEnter() {
      this.submit();
    },
    jumpToHome() {
      this.$store.commit("changeAuthorizedState", true);
      this.$router.push("/home");
    }
  }
};
</script>
<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-color: rgba(156, 158, 152, 0.5);
  padding: 3rem 5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1.title {
    font-size: 4rem;
    font-family: "华文行楷";
    font-weight: 400;
    letter-spacing: 0.5rem;
  }

  .login-box {
    width: 22rem;
    height: 15rem;
    margin-top: 3rem;
    border-radius: 0.6rem;
    font-size: 1.3rem;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .input-line {
      width: 88%;
      height: 2rem;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;

      label {
        width: 40%;
        text-align: right;
      }
      input {
        width: 60%;
        padding: 0.3rem 0;
        font-size: 1.2rem;
        text-align: center;
        box-sizing: border-box;
        background-color: rgba(231, 245, 103, 0.5);
        border-radius: 0.3rem;

        &.nothing {
          outline: 0.09rem solid red;
        }
      }
    }
    .valid::before {
      content: "*";
      color: red;
      font-weight: 600;
    }
    .btn-group {
      width: 100%;
      height: 2rem;
      box-sizing: border-box;
      display: flex;
      justify-content: center;

      .btn-login {
        width: 78%;
        font-size: 1.2rem;
        font-weight: 600;
        border: none;
        outline: none;
        border-radius: 0.3rem;
        margin-left: 10%;
        cursor: pointer;
        box-shadow: 0 0 0.1rem 0.01rem rgba(0, 0, 0, 0.5);
      }
      button:hover {
        box-shadow: 0 0 0.2rem 0.02rem rgba(0, 0, 0, 0.5);
      }
      button.down {
        box-shadow: 0 0 0.2rem 0.02rem rgba(0, 0, 0, 0.5),
          inset 0 0 0.2rem 0.01rem rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>
