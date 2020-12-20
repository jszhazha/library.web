<template>
  <a-row>
    <a-col :span="10">
      <a-form layout="vertical">
        <a-form-item label="昵称">
          <a-input />
        </a-form-item>
        <a-form-item label="个人介绍">
          <a-textarea :maxlength="100" placeholder="最多输入 100 字" />
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({})
</script>


<style lang="less" scoped>

</style>