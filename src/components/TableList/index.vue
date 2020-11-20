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
        <listSetting :columns="columns" />
        <TooltipButton title="下载导入模板">
          <VerticalAlignBottomOutlined />
        </TooltipButton>
        <TooltipButton
          :title="fullScreen ? '退出全屏' : '全屏'"
          @on-click="handleFullScreen"
        >
          <CompressOutlined v-if="fullScreen" />
          <ExpandOutlined v-else />
        </TooltipButton>
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
  ref,
  unref,
  reactive,
  computed,
  onMounted,
  defineComponent,
} from "vue";
import { tableListProps } from "/@/lib/props/tableProps";
import { browserClient, elementOffset } from "/@/utils/elelment";
import {
  ExpandOutlined,
  CompressOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons-vue";
import listSetting from "./listSetting.vue";
import TooltipButton from "./TooltipButton.vue";

export default defineComponent({
  components: {
    listSetting,
    TooltipButton,
    ExpandOutlined,
    CompressOutlined,
    VerticalAlignBottomOutlined,
  },
  props: tableListProps,
  setup() {
    // 全屏 标志位
    const fullScreen = ref<boolean>(false);
    // table 滚动条高度
    const scroll = reactive<{ y?: number | true; x?: number | true }>({});
    // 标签
    const tableRef = ref<HTMLElement | null>(null);
    // 视图大小
    let browserSize: { width?: number; height?: number } = {};
    // 偏移量
    const transform = reactive<{ translate: string }>({
      translate: "(0px,0px)",
    });

    // 样式
    const wrapStyle = computed(() => {
      return `transform:translate${transform.translate};`;
    });

    onMounted(() => (browserSize = browserClient()));

    // 处理全屏
    function handleFullScreen() {
      if (fullScreen.value) {
        // 切换为非全屏
        delete scroll.y;
        transform.translate = `(0px,0px)`;
      } else {
        // 切换为全屏
        const offset = elementOffset(unref(tableRef));
        transform.translate = `(-${offset.left - 16}px,-${offset.top}px)`;
        scroll.y = browserSize.height! - 200;
      }
      fullScreen.value = !fullScreen.value;
    }

    return {
      scroll,
      tableRef,
      wrapStyle,
      fullScreen,
      handleFullScreen,
    };
  },
});
</script>


<style lang="less" scoped>
.table-list {
  transition: transform 0.2s ease-out;

  &-header {
    margin: 0 0 16px;

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #2c3a61;
    }

    .button > ::v-deep(button) {
      margin: 0 5px;
    }

    ::v-deep(.ant-btn-link) {
      color: inherit;
    }

    ::v-deep(.ant-btn-link:hover) {
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