<script setup lang="ts">
import { onMounted,ref } from "vue";

let show = ref(false);
onMounted(() => {
  setInterval(() => {
    show.value = true;
  });
});
</script>
<template>
  <div class="page_logo">
    <img src="../images/green_logo@1x.png" alt="绿鉴logo" />
    <transition
      leave-active-class="animate__animated animate__backInLeft"
      enter-active-class="animate__animated animate__backInLeft"
    >
      <p v-if="show">绿鉴管理平台</p>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.page_logo {
  display: inline-block;
  padding: 10px;
  height: 40px;
  img {
    margin-top: calc(40px / 2 - 18px);
  }
  p {
    display: inline-block;
    width: 156px;
    height: 40px;
    margin-left: 16px;
    line-height: 40px;
    font-weight: 700;
    font-size: 20px;
    color: #0f4264;
  }
}
</style>

