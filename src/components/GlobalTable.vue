<template>
  <Table
    class="global-table"
    bordered
    :loading="loading"
    :row-key="rowKey"
    :columns="tableColumns"
    :data-source="dataSource"
    :pagination="{
      showTotal: (total) => `共 ${total} 条`,
      total: total,
      onChange: onPageChange
    }"
    :scroll="scroll"
    :row-selection="rowSelection"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data" />
    </template>
  </Table>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, unref } from "vue"
import { Table } from "ant-design-vue"
import { tableProps } from "/@/lib/props/TableList"
import { injectDatapage } from "/@/lib/idata/data-page/methods/useDepend"
import { cloneDeep } from "lodash-es"

export default defineComponent({
  components: { Table },
  props: tableProps,
  emits: ["on-page-change"],
  setup(props, { emit }) {
    const { columns } = toRefs(props)

    const tableColumns = computed(() => {
      const { readonly } = injectDatapage()
      const newColumns = cloneDeep(unref(columns))
      if (readonly?.value) newColumns.pop()
      return newColumns
    })

    // 页面发生改变
    const onPageChange = (page: number) => emit("on-page-change", page)

    return { tableColumns, onPageChange }
  }
})
</script>

<style lang="less" scoped></style>
