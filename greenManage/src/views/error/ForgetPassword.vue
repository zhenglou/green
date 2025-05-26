<script setup lang="ts">
import router from '../../router';
</script>

<template>
  <GreenLogo style="position: fixed;top: 20px;left: 20px"></GreenLogo>
  <div class="root">
    <div class="container">
      <div class="top">
        <p>请联系平台负责人获取密码</p>
        <em class="smile"></em>
      </div>
      <div class="bottom" @click="router.back()">返回</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 350px;
  padding: 20px;
  .top {
    position: relative;
    p {
      width: 247px;
      height: 92px;
      font-weight: 500;
      font-size: 30px;
      color: #bdbdbd;
      line-height: 46px;
      text-align: justify;
      font-style: normal;
      text-transform: none;
    }
    .smile {
      display: inline-block;
      width: 62px;
      height: 62px;
      background-image: url("../../assets/happy@1x.png");
      background-size: contain;
      position: absolute;
      top: 2px;
      right: 22px;
    }
  }
  .bottom {
    width: 349px;
    height: 50px;
    background: #4f4f4f;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04),
      0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
    border-radius: 6px 6px 6px 6px;
    font-family: DM Sans, DM Sans;
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    line-height: 23px;
    text-align: center;
    line-height: 50px;
    font-style: normal;
    text-transform: none;
    margin-top: 40px;
    cursor: pointer;
  }
}
</style>
