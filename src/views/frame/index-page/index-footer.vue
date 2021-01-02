<template>
  <footer class="footer index-middle pl-10 pr-10">
    <div>
      ©2021 毕业设计
    </div>
    <div>
      陕ICP备20007146号
    </div>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({})
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  justify-content: space-between;
  bottom: 0;
  width: 100%;
  height: 40px;
  font-size: 12px;
  background: #fbfbfb;
  
  span:not(:last-of-type) {
    margin: 0 15px 0 0;
  }
}
</style>