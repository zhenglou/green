<script setup lang="ts">
</script>

<template>
  <n-loading-bar-provider>
  <n-message-provider>
    <n-notification-provider>
      <n-modal-provider>
        <n-dialog-provider>
          <router-view></router-view>
        </n-dialog-provider>
      </n-modal-provider>
    </n-notification-provider>
  </n-message-provider>
</n-loading-bar-provider>

</template>

<style lang="scss" scoped>

</style>
