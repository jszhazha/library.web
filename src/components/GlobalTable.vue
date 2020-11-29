<template>
  <Table
    class="global-table"
    bordered
    :row-key="rowKey"
    :columns="columns"
    :data-source="dataSource"
    :pagination="{
      showTotal: (total) => `共 ${total} 条`,
      total: total,
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
import { defineComponent } from "vue"
import { Table } from "ant-design-vue"
import { tableProps } from "/@/lib/props/TableList"

export default defineComponent({
  components: { Table },
  props: tableProps,
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
</style>
