<template>
  <div class="p-4 pt-2 module-manage">
    <Scrollbar class="bg-white br-2 default-shadow">
      <module-tree class="tree-menu" @on-select="handleSelect" />
    </Scrollbar>
    <div class="flex-item pl-4 index-column">
      <div class="bg-white br-2 p-4 default-shadow">
        <div class="fw-b fs-6 pb-4">
          {{ selectMenu.meta.title }}
        </div>
        <GlobalTable
          bordered
          :columns="tableColumns"
          :data-source="[selectMenu]"
          :row-key="'name'"
        />
      </div>
      <div class="mt-4 br-2 p-4 flex-item bg-white default-shadow">
        <div class="index-space-between index-middle">
          <div class="fw-b fs-6">
            模块权限设置
          </div>
          <a-button type="link" @click="visible = true">
            新增
          </a-button>
        </div>
        <module-add-modal v-model:visible="visible" :name="selectMenu.name" />
        <module-visit v-model:visible="visible" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { FlatMenu } from '/@/router/types'
import { defineComponent, ref } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import { getFlatMenus } from '/@/utils/helper/menu'
import { PageEnum } from '/@/enums/pageEnum'
import moduleTree from './module-tree.vue'
import moduleVisit from './module-visit.vue'
import moduleAddModal from './module-add-modal.vue'
import { tableColumns } from './index'

export default defineComponent({
  components: { moduleTree, Scrollbar, moduleVisit, moduleAddModal },
  setup() {
    // 对话框显示
    const visible = ref<boolean>(false)

    // 查找菜单
    const findMenu = (key: string) => getFlatMenus().find((menu) => menu.name === key)

    // 选中
    const selectMenu = ref<FlatMenu | undefined>(findMenu(PageEnum.BASE_HOME))

    function handleSelect(selectedKey: string) {
      selectMenu.value = findMenu(selectedKey)
      console.log(selectedKey)
    }

    return {
      visible,
      tableColumns,
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
    padding: 10px 0 0;

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
