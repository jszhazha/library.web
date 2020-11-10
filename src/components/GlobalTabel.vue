<template>
  <a-table
    :row-key="rowKey"
    :columns="columns"
    :data-source="dataSource"
    :pagination="{
      showTotal: (total) => `共 ${total} 条`,
      total: total
    }"
    bordered
  />
</template>

<script lang="ts">
import tableProps from "/@/lib/props/tableProps";
import { defineComponent } from "vue";

export default defineComponent({
  props: tableProps,
  setup() {
    return {};
  },
});
</script>


<style lang="less" scoped>
</style>