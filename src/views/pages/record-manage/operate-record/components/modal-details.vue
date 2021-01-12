<template>
  <a-modal :visible="visible" title="操作日志详细" @cancel="onCancel">
    <template #footer>
      <a-button @click="onCancel">
        关闭
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:visible"],
  setup(_props, { emit }) {
    // 用户点击取消
    const onCancel = () => emit("update:visible", false)

    return {
      onCancel
    }
  }
})
</script>

<style lang="less" scoped>
</style>