<template>
  <a-modal
    :closable="false"
    :width="400"
    :footer="null"
    :body-style="{ padding: '16px 20px 20px' }"
  >
    <div class="modal-header">
      添加快捷方式
    </div>
    <a-form layout="vertical">
      <a-form-item label="名称">
        <a-input />
      </a-form-item>
      <a-form-item label="链接">
        <a-input />
      </a-form-item>
    </a-form>
    <div class="index-right modal-footer">
      <a-button @click="onCancel">
        取消
      </a-button>
      <a-button type="primary" class="ml-4">
        完成
      </a-button>
    </div>
  </a-modal>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['on-cancel'],
  setup(_props, { emit }) {
    const onCancel = () => emit('on-cancel')
    return { onCancel }
  }
})
</script>


<style lang="less" scoped>
.modal-header {
  margin: 0 0 8px;
  font-size: 15px;
}
</style>