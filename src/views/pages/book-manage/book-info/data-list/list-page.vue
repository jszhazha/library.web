<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle ref="searchInstance" @onSearch="onSearchData" />
    </div>
    <list-view
      ref="listInstance"
      @onPageChange="onFetchData"
      @onRefresh="onFetchData"
      @onFilePaeseData="onFilePaeseData"
    />

    <banch-panle ref="banchInstance" @on-batch="onbatchImportData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import service, { BookInfo } from '/@/api/book-manage/book-info'
import { Instance } from '/@/lib/interface/ListPage'
import { listPageMix } from '/@/lib/idata/data-list/'
import searchPanle from './search-panle.vue'
import banchPanle from './banch-panle.vue'
import listView from './list-view.vue'
import { message } from 'ant-design-vue'

const DATA_PAGE_NAME = 'book-manage-book-info-data-page'

export default defineComponent({
  components: { listView, searchPanle, banchPanle },
  setup() {
    // 实例
    const instance = reactive<Instance<BookInfo>>({
      // 搜索实例
      searchInstance: null,
      // 列表实例
      listInstance: null,

      banchInstance: null
    })

    // 配置信息
    const options = {
      name: DATA_PAGE_NAME,

      fetchDataFromServer,

      deleteDataFromServer,

      instance
    }

    const { onFetchData, onSearchData, queryData } = listPageMix<BookInfo>(
      options
    )

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      const query = queryData()
      const { data } = await service.fecthList(query)
      instance.listInstance?.setDataSource(data.content, data.totalElements)
    }

    // 删除数据
    async function deleteDataFromServer(id: number) {
      await service.deleteItemByIds([id])
      onFetchData()
    }

    // 上传excel文件解析数据
    async function onFilePaeseData(file: FormData, callback: Callback) {
      try {
        const { data } = await service.getItemByUploadFile(file)
        instance.banchInstance?.setDataSource(data)
        instance.banchInstance?.setModalState(true)
      } catch (err) {
        message.error(`数据解析失败: ${err.msg}`)
      } finally {
        callback()
      }
    }

    async function onbatchImportData(id:number, data: BookInfo[], callback: Callback) {
      try {
        await service.saveNewBanch(id!, data)
        onFetchData()
      } catch (err) {
        message.error(`批量导入失败: ${err.msg}`)
      } finally {
        callback()
      }
    }

    return {
      onSearchData,
      onFetchData,
      onFilePaeseData,
      onbatchImportData,
      ...toRefs(instance)
    }
  }
})
</script>

<style lang="less" scoped></style>
