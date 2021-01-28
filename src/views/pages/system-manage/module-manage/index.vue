<template>
  <div class="p-4 pt-2 module-manage">
    <Scrollbar class="bg-white br-8 default-shadow">
      <menu-sider class="menu-sider" />
    </Scrollbar>
    <div class="flex-item">
      123
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import menuSider from './menu-sider'

export default defineComponent({
  components: { menuSider, Scrollbar },
  setup() {
    //
  }
})
</script>

<style lang="less" scoped>
.module-manage {
  display: flex;
  height: 100%;

  .menu-sider {
    flex: 1;
    width: 280px;
    height: 0;
    padding: 16px 16px 16px 8px;
    border-radius: 8px;
  }
}
</style>
