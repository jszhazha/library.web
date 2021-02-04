<template>
  <a-modal v-model:visible="visible" style="top: 50px;" :width="width">
    <template #title>
      <slot name="title" />
    </template>

    <div :style="{ height: browserSize.height - 252 + 'px' }">
      <GlobalTable
        :columns="columns"
        :row-key="rowKey"
        :pagination="{ showTotal: (total) => `共 ${total} 条` }"
        :data-source="dataSource"
        :row-selection="rowSelection"
        :scroll="{ y: browserSize.height - 345 }"
      />
    </div>
    <!-- <div v-show="selectedRows.length">
      已选择 <a style="font-weight: 600;">{{ selectedRows?.length }}</a> 项
    </div> -->
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, ref, reactive, computed} from "vue"
import { importProps, SelectedData } from "/@/lib/props/ImportModal"
import { browserClient } from "/@/utils/elelment"

export default defineComponent({
  props: importProps,
  setup() {
    // 视图大小
    const browserSize = ref<{ width?: number; height?: number }>({})
    // 对话框是否可见
    const visible = ref<boolean>(false)
    // 选中的数据
    const selectedData = reactive<SelectedData>({ selectedRows: [] })

    // 选择功能的配置
    const rowSelection = computed(() => {
      return {
        onChange: (selectedRowKeys: number[], selectedRows: unknown[]) => {
          selectedData.selectedRows = selectedRows
          selectedData.selectedRowKeys = selectedRowKeys
        }
      }
    })

    onMounted(() => (browserSize.value = browserClient()))

    // 打开对话框
    const openModal = () => (visible.value = true)

    return {
      visible,
      browserSize,
      rowSelection,
      openModal,
      ...toRefs(selectedData)
    }
  }
})
</script>

<style lang="less" scoped>
.import-modal-header {
  padding: 0 24px 16px;
  border-bottom: 1px solid #f0f0f0;
}
</style>
