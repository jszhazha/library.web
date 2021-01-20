import type { Ref } from "vue"
import { ref } from "vue"
import { assign, cloneDeep } from "lodash-es"
import { isNull } from "/@/utils/is"
import { difference } from "/@/utils/difference"

interface Record {
  editable: boolean;

  [key: string]: unknown;
}

interface UseTableEdit {
  // 编辑行
  editingIndex: Ref<number | null>;

  // 处理数据改变
  handleEditChange: (value: string, record: Record, column: string) => void;

  // 处理点击编辑按键
  handleClickEdit: (record: Record, index: number) => void;

  // 处理点击取消按键
  handleCancelEdit: (record: Record) => void;

  //处理点击保存按键
  handleSvaeEdit: (record: Record) => void;
}
// 参数
interface Options {
  onSaveData: (record: Record) => Promise<void>;
}

export function useTableEdit({ onSaveData }: Options): UseTableEdit {
  const editingIndex = ref<number | null>(null)

  // 编辑数据
  let cacheRecord = {}

  function handleEditChange(value: string, record: Record, column: string): void {
    record[column] = value
  }

  function handleClickEdit(record: Record, index: number): void {
    if (!isNull(editingIndex.value)) return
    editingIndex.value = index
    cacheRecord = cloneDeep(record)
    record.editable = true
  }

  function handleCancelEdit(record: Record): void {
    assign(record, cacheRecord)
    cacheRecord = {}
    editingIndex.value = null
    Reflect.deleteProperty(record, 'editable')
  }

  function handleSvaeEdit(record: Record) {
    Reflect.deleteProperty(record, 'editable')
    console.log(difference(record,cacheRecord))
    cacheRecord = {}
    editingIndex.value = null
    onSaveData(record)
  }

  return {
    editingIndex,
    handleSvaeEdit,
    handleEditChange,
    handleClickEdit,
    handleCancelEdit
  }

}
