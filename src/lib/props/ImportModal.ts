import type { PropType } from "vue";
import type { ColumnProps } from "ant-design-vue/lib/table/interface";

export const importProps = {
  title: {
    type: String as PropType<string>,
    default: ""
  },
  columns: {
    type: [Array] as PropType<ColumnProps[]>,
    default: null,
  },
  // 数据
  dataSource: {
    type: Array as PropType<unknown[]>,
    default: [],
  },
  // 对话框宽度
  width: {
    type: [Number, String] as PropType<number | string>,
    default: '80%',
  }

}


export interface ImportInstance {
  // 对话框是否可见
  openModal?: () => void;
}

// 选中的数据
export interface SelectedData {
  selectedRows?: unknown[]
  selectedRowKeys?: number[]
}