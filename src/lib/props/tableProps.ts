import type { ColumnProps } from "ant-design-vue/lib/table/interface";
import type { PropType } from "vue";

export default {
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
  }
}