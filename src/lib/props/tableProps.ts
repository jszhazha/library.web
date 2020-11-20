import type { ColumnProps } from "ant-design-vue/lib/table/interface";
import type { PropType } from "vue";

export const tableProps = {
  columns: {
    type: [Array] as PropType<ColumnProps[]>,
    default: null,
  },
  dataSource: {
    type: Array as PropType<unknown[]>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record: unknown) => string)>,
    default: "id",
  },
  total: {
    type: Number,
    default: undefined
  },
  scroll: {
    type: Object as PropType<{ x: number | true; y: number }>,
    default: null,
  },
}

export const tableListProps = {
  ...tableProps,

  title: {
    type: String,
    default: ""
  }
}

export const listSettingProps = {
  columns: {
    type: [Array] as PropType<ColumnProps[]>,
    default: [],
  },
}

export interface TableColumn extends ColumnProps {
  slots?: Indexable;
}

export interface Options {
  label: string
  value: string
  disabled?: boolean
  indeterminate?: boolean
  onChange?: () => void
}