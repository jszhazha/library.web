<template>
  <ImportModal
    v-model:value="batchImport.visible"
    row-key="index"
    :columns="importColumns"
    :data-source="batchImport.data"
    @onConfirm="onbatchConfirm"
    @onClickTableAway="onClickTableAway"
  >
    <template #header-title>
      <BookCategorySearchSelect
        v-model:value="batchImport.bookCategoryId"
        placeholder="请输入图书类别"
        :class="[batchImport.tip ? 'error-ui' : '', 'w-300']"
        @on-focus="() => (batchImport.tip = false)"
      />
    </template>
    <template v-for="col in isEditData" #[col]="{ text, record }" :key="col">
      <a-input
        v-if="record.editCol === col"
        :ref="(input) => input && input.focus()"
        :value="text"
        @change="(e) => handleEditChange(e.target.value, record, col)"
      />
      <template v-else>
        <span class="cur-p" @click.stop="handleEditData(record, col)">{{ text }}</span>
      </template>
    </template>
  </ImportModal>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { BookInfo } from '/@/api/book-manage/book-info'
import { importColumns } from './data-list'
import { isNumber } from '/@/utils/is'
import { EditCol } from '/@/hooks/web/useTableEdit'

interface Banch {
  data?: BookInfo[]

  visible?: boolean

  bookCategoryId?: number

  tip?: boolean
}

export default defineComponent({
  emits: ['on-batch'],
  setup(_props, { emit }) {
    // 批量导入数据集合
    const batchImport = reactive<Banch>({ tip: false })
    // 是可以编辑数据的
    const isEditData = ['name', 'isbn', 'author', 'publisher', 'description', 'price']

    // 有效数据
    function validData(data: BookInfo[]) {
      return data.map((el, index) => {
        return { ...el, index }
      })
    }

    // 批量处理数据确认
    async function onbatchConfirm(selectedRows: BookInfo[], callback: Callback) {
      if (!validBatchData(callback)) return
      emit('on-batch', batchImport.bookCategoryId!, selectedRows, () => {
        batchImport.visible = false
        callback()
      })
    }

    // 导入数据检测
    function validBatchData(callback: Callback) {
      if (isNumber(batchImport.bookCategoryId)) {
        return true
      }
      callback()
      batchImport.tip = true
      return false
    }

    // 设置数据
    function setDataSource(data: BookInfo[]) {
      batchImport.data = validData(data)
    }

    // 设置对话框状态
    function setModalState(state: boolean) {
      batchImport.tip = false
      batchImport.visible = state
    }
    // 处理双击编辑
    function handleEditData(record: EditCol, col: string) {
      record.editCol = col
    }
    // 内容发生改变
    function handleEditChange(value: string, record: BookInfo, column: string) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (record as any)[column] = value
    }
    // 点击table 以外的地方
    function onClickTableAway() {
      // 清除对话框
      batchImport.data?.forEach((el) => Reflect.deleteProperty(el, 'editCol'))
    }

    return {
      isEditData,
      batchImport,
      importColumns,
      setDataSource,
      setModalState,
      onbatchConfirm,
      onClickTableAway,
      handleEditData,
      handleEditChange
    }
  }
})
</script>

<style lang="less" scoped></style>
