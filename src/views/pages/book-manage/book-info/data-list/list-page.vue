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
      ref="importInstance"
      row-key="isbn"
      :columns="importColumns"
      :data-source="batchData"
    >
      <template #title>
        <BookCategorySearchSelect class="w-300" placeholder="请输入图书类别" />
      </template>
    </ImportModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import service, { BookInfo } from '/@/api/book-manage/book-info'
import { Instance } from '/@/lib/interface/ListPage'
import { listPageMix } from '/@/lib/idata/data-list/'
import { importColumns } from './data-list'
import searchPanle from './search-panle.vue'
import listView from './list-view.vue'
import { message } from 'ant-design-vue'

const DATA_PAGE_NAME = 'book-manage-book-info-data-page'

export default defineComponent({
  components: { listView, searchPanle },
  setup() {
    // 实例
    const instance = reactive<Instance<BookInfo>>({
      // 导入对话框实例
      importInstance: null,
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
    const batchData = ref<BookInfo[]>([])

    const { onFetchData, onSearchData, queryData } = listPageMix<BookInfo>(
      options
    )

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

    // 打开对话框
    function openImportModal() {
      instance.importInstance!.openModal!()
    }

    // 上传excel文件解析数据
    async function onBatchImport(file: FormData, cb: () => void) {
      try {
        const { data } = await service.getItemByUploadFile(file)
        batchData.value = data
        openImportModal()
      } catch (err) {
        message.error(`数据解析失败: ${err.msg}`)
      } finally {
        cb()
      }
    }

    return {
      batchData,
      importColumns,
      onSearchData,
      onFetchData,
      onBatchImport,
      ...toRefs(instance)
    }
  }
})
</script>

<style lang="less" scoped></style>
