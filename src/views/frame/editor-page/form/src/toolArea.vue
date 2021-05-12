<template>
  <div class="tool-area">
    <div class="tool-area-switch">
      23432
    </div>
    <GlobalDrawer class="tool-area-panel">
      基础组件
    </GlobalDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="less" scoped>
.tool-area {
  display: flex;
  height: 100%;

  &-switch {
    position: relative;
    z-index: 1;
    background: #fff;
  }

  &-panel {
    border-left: 1px solid #f0f0f0;
  }
}
</style>