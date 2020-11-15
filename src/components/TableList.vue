<template>
  <div
    ref="tableRef"
    :class="['index-card', 'table-list', fullScreen ? 'full-screen' : '']"
    :style="wrapStyle"
  >
    <div class="table-list-header index-space-between">
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
    <global-table
      :columns="columns"
      :data-source="dataSource"
      :scroll="scroll"
      :total="total"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data" />
      </template>
    </global-table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  unref,
  reactive,
  onMounted,
  computed,
  watch,
} from "vue";
import { tableListProps } from "/@/lib/props/tableProps";
import { browserClient, elementOffset } from "/@/utils/elelment";
import { ExpandOutlined, CompressOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { ExpandOutlined, CompressOutlined },
  props: tableListProps,
  setup() {
    // 全屏 标志位
    const fullScreen = ref<boolean>(false);
    // table 滚动条高度
    const scroll = reactive<{ y?: number; x?: number }>({});
    // 标签
    const tableRef = ref<HTMLElement | null>(null);
    // 视图大小
    let browserSize: { width?: number; height?: number } = {};
    // 偏移量
    const transform = ref<string>("");
    // 样式
    const wrapStyle = computed(() => {
      return `transform:translate(${transform.value});`;
    });

    onMounted(() => {
      browserSize = browserClient();
      scroll.y = browserSize.height! - 400;
    });


    // 处理全屏
    const handleFullScreen = () => {
      if (fullScreen.value) {
        // 切换为非全屏
        scroll.y = browserSize.height! - 400;
        transform.value = `0px,0px`;
      } else {
        // 切换为全屏
        const offset = elementOffset(unref(tableRef));
        transform.value = `-${offset.left - 16}px,-${offset.top}px`;
        scroll.y = browserSize.height! - 200;
      }
      fullScreen.value = !fullScreen.value;
    };

    return { scroll, fullScreen, wrapStyle, tableRef, handleFullScreen };
  },
});
</script>


<style lang="less">
.table-list {
  transition: transform 0.2s ease-out;

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
  width: 100% !important;
  height: 100% !important;
  margin: 0;
  border-radius: 0;
}
</style>