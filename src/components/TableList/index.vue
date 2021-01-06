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
        <a-divider v-if="Object.keys($slots).includes('header-left')" type="vertical" />
        <slot name="header-right" />
        <listSetting />
        <TooltipButton v-if="download" title="下载导入模板">
          <VerticalAlignBottomOutlined />
        </TooltipButton>
        <TooltipButton :title="fullScreen ? '退出全屏' : '全屏'" @on-click="onFullScreen">
          <CompressOutlined v-if="fullScreen" />
          <ExpandOutlined v-else />
        </TooltipButton>
      </div>
    </div>
    <GlobalTable
      :loading="loading"
      :columns="getTableColumns"
      :data-source="dataSource"
      :scroll="scroll"
      :total="total"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data" />
      </template>
    </GlobalTable>
  </div>
</template>

<script lang="ts">
import { Ref } from "vue"
import { ref, unref, reactive, computed, onMounted, defineComponent } from "vue"
import { tableListProps, TableColumn } from "/@/lib/props/TableList"
import { browserClient, elementOffset } from "/@/utils/elelment"
import listSetting from "./listSetting.vue"
import TooltipButton from "./TooltipButton.vue"
import { provideTable } from "./useDepend"
import {
  ExpandOutlined,
  CompressOutlined,
  VerticalAlignBottomOutlined
} from "@ant-design/icons-vue"

export default defineComponent({
  components: {
    listSetting,
    TooltipButton,
    ExpandOutlined,
    CompressOutlined,
    VerticalAlignBottomOutlined
  },
  props: tableListProps,
  setup(props) {
    // 全屏 标志位
    const fullScreen = ref<boolean>(false)
    // table 滚动条高度
    const scroll = reactive<{ y?: number | true; x?: number | true }>({})
    // 标签
    const tableRef = ref<HTMLElement | null>(null)
    // 视图大小
    let browserSize: { width?: number; height?: number } = {}
    // 偏移量
    const transform = reactive<{ translate: string }>({
      translate: "(0px,0px)"
    })
    // table 表头数据
    const tableColumns = (ref(unref(props).columns) as unknown) as Ref<TableColumn[]>
    const cacheTableColumns = (ref(unref(props).columns) as unknown) as Ref<TableColumn[]>

    // 获取 table 表头数据
    const getTableColumns = computed(() => {
      return tableColumns.value
    })

    // 样式
    const wrapStyle = computed(() => {
      return `transform:translate${transform.translate};`
    })


    onMounted(() => (browserSize = browserClient()))

    // 处理全屏
    function onFullScreen() {
      if (fullScreen.value) {
        // 切换为非全屏
        Reflect.deleteProperty(scroll, "y")
        if (props.dataSource.length) {
          scroll.x = true
        }
        transform.translate = `(0px,0px)`
      } else {
        // 切换为全屏
        Reflect.deleteProperty(scroll, "x")
        const offset = elementOffset(unref(tableRef))
        transform.translate = `(-${offset.left - 16}px,-${offset.top}px)`
        scroll.y = browserSize.height! - 200
      }
      fullScreen.value = !fullScreen.value
    }
    // 设置 table 头
    function setColumns(columns: string[]) {
      if (columns.length <= 0) {
        tableColumns.value = []
        return
      }
      const newColumns = unref(cacheTableColumns).filter((item) => {
        return columns.includes(item.dataIndex)
      })
      tableColumns.value = newColumns
    }

    provideTable({
      getColumns: () => props.columns,
      setColumns
    })

    return {
      scroll,
      tableRef,
      wrapStyle,
      fullScreen,
      onFullScreen,
      getTableColumns
    }
  }
})
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
