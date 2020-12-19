<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle ref="searchInstance" />
    </div>
    <list-view ref="listInstance" />
    <ImportModal
      ref="importInstance"
      title="批量导入"
      :columns="importColumns"
      :data-source="importData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { BookInfo } from "/@/api/book-manage/book-info"
import { Instance } from "/@/lib/interface/ListPage"
import { listPageMix } from "/@/lib/idata/data-list/"
import { importColumns } from "./data-list"
import searchPanle from "./search-panle.vue"
import listView from "./list-view.vue"

const DATA_PAGE_NAME = "book-manage-book-info-data-page"

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
      fetchDataFromServer,

      deleteDataFromServer
    }

    // 批量导入数据集合
    const importData = reactive<BookInfo[]>([])

    const { onFetchData } = listPageMix<BookInfo>(DATA_PAGE_NAME, options)

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      // instance.listInstance?.setDataSource(data)
      console.log(instance.searchInstance?.getCurQueryData())
    }

    // 删除数据, 刷新数据
    async function deleteDataFromServer(record: BookInfo) {
      console.log(record)
      onFetchData()
    }

    // 打开对话框
    // function openImportModal() {
    //   unref(importInstance)!.openModal!();
    // }

    return {
      importData,
      importColumns,
      ...toRefs(instance)
    }
  }
})
</script>

<style lang="less" scoped></style>
