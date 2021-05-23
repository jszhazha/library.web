<template>
  <a-form-item label="标签宽度：">
    <a-input />
  </a-form-item>
  <a-form-item label="标签对齐方式：">
    <a-select>
      <a-select-option value="jack">
        左对齐
      </a-select-option>
      <a-select-option value="lucy">
        右对齐
      </a-select-option>
    </a-select>
  </a-form-item>
 

  <a-form-item label="隐藏表单项的必选标记：">
    <a-select>
      <a-select-option value="jack">
        是
      </a-select-option>
      <a-select-option value="lucy">
        否
      </a-select-option>
    </a-select>
  </a-form-item>
  <a-form-item label="提交失败自动滚动到第一个错误字段：">
    <a-select>
      <a-select-option value="jack">
        是
      </a-select-option>
      <a-select-option value="lucy">
        否
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
