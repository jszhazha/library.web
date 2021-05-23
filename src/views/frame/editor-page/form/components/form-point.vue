<template>
  <a-form-item label="标签对齐方式：">
    <a-radio-group>
      <a-radio value="left">
        左对齐
      </a-radio>
      <a-radio value="right">
        右对齐
      </a-radio>
    </a-radio-group>
  </a-form-item>
  <a-form-item label="标签宽度：">
    <a-input />
  </a-form-item>

  <a-form-item label="隐藏表单项的必选标记：">
    <a-radio-group>
      <a-radio value="left">
        是
      </a-radio>
      <a-radio value="right">
        否
      </a-radio>
    </a-radio-group>
  </a-form-item>
  <a-form-item label="提交失败自动滚动到第一个错误字段：">
    <a-radio-group>
      <a-radio value="left">
        是
      </a-radio>
      <a-radio value="right">
        否
      </a-radio>
    </a-radio-group>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
