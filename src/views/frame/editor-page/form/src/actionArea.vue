<template>
  <div class="action-area">
    <GlobalDrawer v-model:value="visible" placement="right" class="h100">
      属性设置
    </GlobalDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    // 折叠面板
    const visible = ref<boolean>(true)

    return { visible }
  }
})
</script>

<style lang="less" scoped>
.action-area {
  width: 300px;
  height: 100%;
}
</style>
