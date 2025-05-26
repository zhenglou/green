<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import GreenLogo from "../../components/GreenLogo.vue";
const router = useRouter()
const route = useRoute()
function pushLogin():void{
  setTimeout(() => {
    router.push('./login')
  }, 300);

}
</script>
<template>
  <div class="root" v-wave = "{color:'white'}">
    <GreenLogo></GreenLogo>
    <div class="main">
      <div class="container"> 
        <div class="top">
          <img src="./images/wx_logo@1x.png" alt="小程序logo" />
          <p v-wave = "{color:'white',stopPropagation:'true'}">欢迎来到绿鉴管理平台</p>
        </div>
        <div class="middle" v-wave = "{color:'white'}">环保回收</div>
        <div class="bottom">
          <div class="enter" @click="pushLogin">
            <p>点击进入</p>
            <p><em></em></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.root {
  width: 100vw;
  height: 100vh;
  background-color: #f6eee8;
  .main {
    display: flex;
    justify-content: center;
    height: calc(100vh - 60px);
    align-items: center;
    .container {
      width: 646px;
      height: 550px;
      .top {
        width: 100%;
        display: flex;
        img {
          width: 170px;
          height: 170px;
          margin-top: calc(176px / 2 - 85px);
          box-shadow: 6px 2px 14px 2px rgba(0, 0, 0, 0.3);
          border-radius: 100%;
        }
        p {
          font-size: 74px;
          margin-left: 20px;
          line-height: 88px;
          font-weight: 500;
          text-shadow: 8px 10px 10px rgba(0, 0, 0, 0.3);
        }
      }
      .middle {
        font-weight: 900;
        font-size: 160px;
        color: #050225;
        line-height: 164px;
        text-align: left;
        margin-top: 20px;
        text-shadow: 6px 10px 10px rgba(0, 0, 0, 0.3);
      }
      .bottom {
        color: white;
        margin-top: 42px;
        position: relative;
        .enter {
          width: 494px;
          height: 124px;
          background: #050225;
          border-radius: 35px;
          position: absolute;
          display: flex;
          right: 0;
          box-shadow: 8px 10px 10px 0px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          p:first-child {
            font-weight: 700;
            font-size: 50px;
            color: #ffffff;
            line-height: 124px;
            margin-left: 90px;
          }
          p:last-child {
            width: 68px;
            height: 68px;
            border-radius: 100%;
            background: #5ac37c;
            position: absolute;
            top: calc(100% / 2 - 34px);
            right: 20px;
            em {
              display: inline-block;
              width: 68px;
              height: 68px;
              background-image: url("./images/箭头@1x.png");
              background-repeat: no-repeat;
              background-position: 15px 25px;
            }
          }
        }
        .enter:hover{
            
        }
      }
    }
  }
}
</style>
