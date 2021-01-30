<template>
  <div class="p-4 pt-2 module-manage">
    <Scrollbar class="bg-white br-2 default-shadow">
      <tree-menu class="tree-menu" @on-select="handleSelect" />
    </Scrollbar>
    <div class="flex-item pl-4 index-column">
      <div class="bg-white br-2">
        <div class="fw-b fs-6 p-4">
          {{ selectMenu.meta.title }}
        </div>
        <div class="pl-4 pr-4 pb-4">
          <div class="row">
            <span class="row-title">模块路径</span>
            <router-link :to="selectMenu.path">
              {{ selectMenu.path }}
            </router-link>
          </div>
          <div class="row">
            <span class="row-title">模块标识符</span>
            <span>{{ selectMenu.name }}</span>
          </div>
        </div>
      </div>
      <div class="mt-4 br-2 p-4 flex-item bg-white">
        <div class="fw-b fs-6">
          模块权限设置
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { FlatMenu } from '/@/router/types'
import { defineComponent, ref } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import { getFlatMenus } from '/@/utils/helper/menu'
import treeMenu from './tree-menu.vue'
import { PageEnum } from '/@/enums/pageEnum'

export default defineComponent({
  components: { treeMenu, Scrollbar },
  setup() {
    // 查找菜单
    const findMenu = (key: string) => getFlatMenus().find((menu) => menu.name === key)

    // 选中
    const selectMenu = ref<FlatMenu | undefined>(findMenu(PageEnum.BASE_HOME))

    function handleSelect(selectedKey: string) {
      selectMenu.value = findMenu(selectedKey)
      console.log(selectedKey)
    }

    return {
      handleSelect,
      selectMenu
    }
  }
})
</script>

<style lang="less" scoped>
.module-manage {
  display: flex;
  height: 100%;

  .tree-menu {
    flex: 1;
    width: 280px;
    height: 0;
    padding: 16px 16px 16px 8px;
    border-radius: 8px;
  }

  .row {
    padding: 10px 0 0 ;

    &-title {
      font-weight: bold;

      &::after {
        margin: 0 8px 0 2px;
        content: ':';
      }
    }
  }
}
</style>
