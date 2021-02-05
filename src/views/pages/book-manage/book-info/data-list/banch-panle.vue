<template>
  <ImportModal
    v-model:value="batchImport.visible"
    row-key="index"
    :columns="importColumns"
    :data-source="batchImport.data"
    @onConfirm="onbatchConfirm"
  >
    <template #header-title>
      <BookCategorySearchSelect
        v-model:value="batchImport.bookCategoryId"
        placeholder="请输入图书类别"
        :class="[batchImport.tip ? 'error-ui' : '', 'w-300']"
        @on-focus="() => (batchImport.tip = false)"
      />
    </template>
  </ImportModal>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { BookInfo } from '/@/api/book-manage/book-info'
import { importColumns } from './data-list'
import { isNumber } from '/@/utils/is'


interface Banch {
  data?: BookInfo[]

  visible?: boolean

  bookCategoryId?: number

  tip?: boolean
}

export default defineComponent({
  setup() {
    // 批量导入数据集合
    const batchImport = reactive<Banch>({ tip: false })


    // 有效数据
    function validData(data: BookInfo[]) {
      return data.map((el, index) => {
        return { ...el, index }
      })
    }

    // 批量处理数据确认
    async function onbatchConfirm(selectedRows: BookInfo[], callback: Callback ) {
      if (!validBatchData(callback)) return
      console.log(selectedRows)
      // try {
      //   await service.saveNewBanch(batchImport.bookCategoryId!, selectedRows)
      //   batchImport.visible = false
      //   onFetchData()
      // } catch (err) {
      //   message.error(`批量导入失败: ${err.msg}`)
      // } finally {
      //   callback()
      // }
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
    function setDataSource(data: BookInfo[]){
      batchImport.data = validData(data)
    }

    // 设置对话框状态
    function setModalState(state:boolean){
      batchImport.tip = false
      batchImport.visible = state
    }

    return {
      batchImport,
      importColumns,
      setDataSource,
      setModalState,
      onbatchConfirm
    }
  }
})
</script>

<style lang="less" scoped></style>
