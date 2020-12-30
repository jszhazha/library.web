<template>
  <div class="list-row">
    <div class="right">
      <div class="right-title mb-2">
        账户密码
      </div>
      <div>当前密码强度：强</div>
    </div>
    <div class="left">
      修改
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    


    return {}
  }
})
</script>

<style lang="less" scoped>
.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 24px;
  margin: 0 0 24px;
  border-bottom: 1px solid #e8eaec;

  .right {
    flex: 1;

    &-title {
      font-weight: bold;
    }
  }
}
</style>
