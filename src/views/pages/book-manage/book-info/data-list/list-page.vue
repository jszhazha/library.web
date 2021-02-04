<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle ref="searchInstance" @onSearch="onSearchData" />
    </div>
    <list-view
      ref="listInstance"
      @onPageChange="onFetchData"
      @onRefresh="onFetchData"
      @onBatchImport="onBatchImport"
    />
    <ImportModal
      v-model:value="batch.visible"
      row-key="index"
      :columns="importColumns"
      :data-source="batch.data"
      @onConfirm="onbatchConfirm"
    >
      <template #title>
        <BookCategorySearchSelect
          v-model:value="batch.bookCategoryId"
          placeholder="请输入图书类别"
          :class="[batch.tip ? 'error-ui' : '', 'w-300']"
          @on-focus="handleFocus"
        />
      </template>
    </ImportModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import service, { BookInfo } from '/@/api/book-manage/book-info'
import { Instance } from '/@/lib/interface/ListPage'
import { listPageMix } from '/@/lib/idata/data-list/'
import { importColumns } from './data-list'
import searchPanle from './search-panle.vue'
import listView from './list-view.vue'
import { message } from 'ant-design-vue'
import { isNumber } from '/@/utils/is'

const DATA_PAGE_NAME = 'book-manage-book-info-data-page'

interface Banch {
  data?: BookInfo[]

  visible?: boolean

  bookCategoryId?: number

  tip?: boolean
}

export default defineComponent({
  components: { listView, searchPanle },
  setup() {
    // 实例
    const instance = reactive<Instance<BookInfo>>({
      // 搜索实例
      searchInstance: null,
      // 列表实例
      listInstance: null
    })

    // 配置信息
    const options = {
      name: DATA_PAGE_NAME,

      fetchDataFromServer,

      deleteDataFromServer,

      instance
    }

    // 批量导入数据集合
    const batch = reactive<Banch>({ tip: false })

    const { onFetchData, onSearchData, queryData } = listPageMix<BookInfo>(options)

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      const query = queryData()
      const { data } = await service.fecthList(query)
      instance.listInstance?.setDataSource(data.content, data.totalElements)
    }

    // 删除数据, 刷新数据
    async function deleteDataFromServer(id: number) {
      await service.deleteItemByIds([id])
      onFetchData()
    }

    // 上传excel文件解析数据
    async function onBatchImport(file: FormData, callback: Callback) {
      try {
        const { data } = await service.getItemByUploadFile(file)
        batch.data = validData(data)
        batch.visible = true
      } catch (err) {
        message.error(`数据解析失败: ${err.msg}`)
      } finally {
        callback()
      }
    }

    // 有效数据
    function validData(data: BookInfo[]) {
      return data.map((el, index) => {
        return { ...el, index }
      })
    }

    // 批量处理数据确认
    async function onbatchConfirm(selectedRows: BookInfo[], callback: Callback) {
      if (!validBatchData(callback)) return
      try {
        await service.saveNewBanch(batch.bookCategoryId!, selectedRows)
        batch.visible = false
        onFetchData()
      } catch (err) {
        message.error(`批量导入失败: ${err.msg}`)
      } finally {
        callback()
      }
    }

    // 导入数据检测
    function validBatchData(callback: Callback) {
      if (isNumber(batch.bookCategoryId)) {
        return true
      }
      callback(), (batch.tip = true)
      return false
    }

    // 处理获取焦点
    function handleFocus() {
      batch.tip = false
    }

    return {
      batch,
      importColumns,
      onSearchData,
      onFetchData,
      onBatchImport,
      onbatchConfirm,
      handleFocus,
      ...toRefs(instance)
    }
  }
})
</script>

<style lang="less" scoped></style>
