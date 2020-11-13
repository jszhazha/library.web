<template>
  <div
    ref="tableRef"
    :class="['index-card', 'global-table', fullScreen ? 'full-screen' : '']"
  >
    <div class="global-table-header index-space-between">
      <div class="title">
        {{ title }}
      </div>
      <div class="button">
        <slot name="header-left" />
        <a-divider type="vertical" />
        <slot name="header-right" />
        <a-button type="link" size="small" @click="handleFullScreen">
          <CompressOutlined v-if="fullScreen" />
          <ExpandOutlined v-else />
        </a-button>
      </div>
    </div>
    <Table
      bordered
      :row-key="rowKey"
      :columns="columns"
      :data-source="dataSource"
      :pagination="{
        showTotal: (total) => `共 ${total} 条`,
        total: total,
      }"
      :scroll="scroll"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data" />
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { Table } from "ant-design-vue";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { tableProps } from "/@/lib/props/tableProps";
import { browserClient } from "/@/utils/elelment";
import { ExpandOutlined, CompressOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { ExpandOutlined, CompressOutlined, Table },
  props: tableProps,
  setup() {
    // 全屏 标志位
    const fullScreen = ref<boolean>(true);
    // table 滚动条高度
    const scroll = reactive<{ y?: number; x?: number }>({});
    // 标签
    const tableRef = ref<HTMLElement | null>(null);
    // 视图高度
    let clientHeight = 0;

    onMounted(() => {
      clientHeight = browserClient().clientHeight;
      handleFullScreen();
    });

    // 处理全屏
    const handleFullScreen = () => {
      if (fullScreen.value) {
        // 非全屏
        scroll.y = clientHeight - 396;
      } else {
        // 全屏
        scroll.y = clientHeight - 200;
      }
      fullScreen.value = !fullScreen.value;
    };
    return { scroll, fullScreen, tableRef, handleFullScreen };
  },
});
</script>


<style lang="less">
.global-table {
  &-header {
    margin: 0 0 16px;

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #2c3a61;
    }

    .button > button {
      margin: 0 5px;
    }

    .ant-btn-link {
      color: inherit;
    }

    .ant-btn-link:hover {
      color: #1890ff;
    }
  }
}

.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  overflow: auto;
  border-radius: 0;
}
</style>