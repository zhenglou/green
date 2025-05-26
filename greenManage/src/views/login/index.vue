<template>
  <div class="root">
    <div class="wapper">
      <div class="logo">
        <GreenLogo></GreenLogo>
      </div>
      <div class="main">
        <div class="top">
          <p class="title">管理员登录</p>
          <p class="subTitle">请输入你的用户名和密码</p>
        </div>
        <div class="bottom">
          <div class="userName">
            <em class="userName_Icon"></em>
            <input type="text" placeholder="用户名" v-model="userName" />
          </div>
          <div class="password">
            <em class="password_icon"></em>
            <input type="password" placeholder="密码" v-model="password" />
          </div>
          <div class="remberPwd">
            <em
              class="remberPwd_icon_yes"
              v-if="remberPwdIconYesDisplay == 1"
              @click="changeRemberIcon"
            ></em>
            <em
              class="remberPwd_icon_no"
              v-if="remberPwdIconYesDisplay == 0"
              @click="changeRemberIcon"
            ></em>
            记住密码
          </div>

          <div class="loginButton" @click="userLoginDeal">登录</div>

          <div class="forgetPwd" @click="router.push('/forgetPassword')">忘记密码？</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 引入api
// import { Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { useUserStore } from '../../store/user';
// 引入方法
import { userLogin } from "../../api/user";
import { setStorage, getStorage } from "../../utils/storage";
// 引入组件
// import GreenLogo from "../../components/GreenLogo.vue";
// import { useMessage } from "naive-ui";
// 变量
const message = useMessage();
const router = useRouter();
let remberPwdIconYesDisplay: Ref = ref(0);
let userName: Ref = ref("");
let password: Ref = ref("");
const userStore = useUserStore();
// 功能方法
//是否记住密码
function changeRemberIcon() {
  remberPwdIconYesDisplay.value = remberPwdIconYesDisplay.value == 0 ? 1 : 0;
}
// 登录校验
async function userLoginDeal() {
  if (userName.value.trim().length == 0 || password.value.trim().length == 0) {
    message.warning("用户名密码不为空");
    return;
  }
  // 用户输入信息
  const userInfo: object = {
    userName: userName.value,
    password: password.value,
  };
  const userResponseInfo: AxiosResponse = await userLogin(userInfo);
  /*
    成功登录记录token在本地cookie
  */
  if (userResponseInfo.data.code == 1) {
    message.success("登录成功");
    setStorage("token", userResponseInfo.data.data.token);
    userStore.userInfo = userResponseInfo.data.data.user;
    router.push("/manageIndex");
  } else {
    message.warning("用户名或密码错误");
    console.log("用户名或密码错误");
  }
}
</script>
<style lang="scss" scoped>
.root {
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wapper {
  width: 1780px;
  height: 880px;
  border-radius: 40px;
  background-color: #fbfbfb;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    display: inline-block;
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .main {
    width: 540px;
    height: 664px;
    .top {
      width: 100%;
      text-align: center;
      .title {
        height: 45px;
        font-weight: 700;
        font-size: 32px;
        color: #000000;
        line-height: 45px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
      .subTitle {
        height: 46px;
        font-weight: 500;
        font-size: 18px;
        color: #bdbdbd;
        line-height: 30px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
    .bottom {
      width: 540px;
      height: 564px;
      background: #ffffff;
      box-shadow: 4px 4px 20px 0px rgba(92, 92, 92, 0.1);
      border-radius: 20px 20px 20px 20px;
      input {
        width: 350px;
        height: 48px;
        background: #efefef;
        border-radius: 6px 6px 6px 6px;
        border: 0px solid rgba(40, 40, 40, 0.47);
        margin-left: 94px;
        font-size: 14px;
        color: #000000;
        font-weight: 600;
        text-indent: 5em;
      }
      .userName {
        position: relative;
        em {
          position: absolute;
          display: inline-block;
          width: 24px;
          height: 24px;
          background-image: url("./images/user@1x.png");
          top: 114px;
          left: 126px;
          border: 1px dotted;
        }
        input {
          margin-top: 104px;
        }
      }
      .password {
        position: relative;
        em {
          position: absolute;
          display: inline-block;
          width: 24px;
          height: 24px;
          background-image: url("./images/id_card@1x.png");
          top: 50px;
          left: 126px;
          border: 1px dotted;
        }
        input {
          margin-top: 40px;
        }
      }
      .remberPwd {
        margin-left: 94px;
        margin-top: 30px;
        text-indent: 4em;
        position: relative;
        font-size: 14px;
        font-weight: 400;
        em {
          position: absolute;
          left: 12px;
          top: 2px;
          display: inline-block;
          box-sizing: border-box;
          width: 18px;
          height: 18px;
          line-height: 10px;
          border: 2px solid black;
          border-radius: 4px;
        }
        .remberPwd_icon_yes {
          cursor: pointer;
          background-image: url("./images/勾.png");
          background-size: contain;
        }
        .remberPwd_icon_no {
          cursor: pointer;
        }
      }
      .loginButton {
        margin: 0 auto;
        margin-top: 50px;
        width: 350px;
        height: 50px;
        background: #4f4f4f;
        box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04),
          0px 2px 6px 0px rgba(0, 0, 0, 0.04),
          0px 16px 24px 0px rgba(0, 0, 0, 0.06);
        border-radius: 6px 6px 6px 6px;
        color: white;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
      }
      .forgetPwd {
        height: 20px;
        font-family: Roboto, Roboto;
        font-weight: 400;
        font-size: 14px;
        color: #828282;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        text-decoration-line: underline;
        text-transform: none;
        text-align: center;
        margin-top: 32px;
        cursor: pointer;
      }
    }
  }
}
</style>
