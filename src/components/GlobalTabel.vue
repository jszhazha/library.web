<template>
  <div class="global-table-header index-space-between">
    <div class="title">
      {{ title }}
    </div>
    <div class="button">
      <slot name="header" />
      <ExpandOutlined />
    </div>
  </div>
  <a-table
    :row-key="rowKey"
    :columns="columns"
    :data-source="dataSource"
    :pagination="{
      showTotal: (total) => `共 ${total} 条`,
      total: total,
    }"
    bordered
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data" />
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { tableProps } from "/@/lib/props/tableProps";
import { ExpandOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { ExpandOutlined },
  props: tableProps,
  setup() {
    return {};
  },
});
</script>


<style lang="less">
.global-table-header {
  margin: 0 0 16px;

  .title {
    font-size: 16px;
    font-weight: 700;
    color: #2c3a61;
  }

  .button > button:not(:first-of-type) {
    margin: 0 0 0 10px;
  }

  .button > span {
    margin: 0 20px 0 0;
  }
}
</style>