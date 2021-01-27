<template>
  <div class="p-4 module-manage">
    <menu-sider />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import menuSider from './menu-sider'


export default defineComponent({
  components:{menuSider},
  setup() {
// 
  }
})
</script>


<style lang="less" scoped>
.module-manage{
  display: flex;
  min-height: 100%;
}
</style>