<template>
  <div class="p-4 module-manage">
    <Scrollbar>
      <menu-sider class="menu-sider scrollbar" />
    </Scrollbar>
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
  // height: 100%;

  .menu-sider {
    flex: 1;
    width: 260px;
    height: 0;
    padding: 16px 0 16px 8px;
    border-radius: 8px;
  }
}
</style>
