<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle ref="searchInstance" />
    </div>
    <list-view />
    <ImportModal
      ref="importInstance"
      title="批量导入"
      :columns="importColumns"
      :data-source="dataSource"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { BookInfo } from "/@/api/book-manage/book-info"
import { Instance } from "/@/lib/interface/ListPage"
import { listPageMix } from "/@/utils/listPage/"
import { importColumns } from "./data-list"
import searchPanle from "./search-panle.vue"
import listView from "./list-view.vue"

const DATA_PAGE_NAME = "book-manage-book-info-data-page"

export default defineComponent({
  components: { listView, searchPanle },
  setup() {
    // 实例
    const instance = reactive<Instance>({
      // 导入对话框实例
      importInstance: null,
      // 搜索实例
      searchInstance: null,
    })

    // 批量导入数据集合
    const dataSource = reactive<BookInfo[]>([])

    listPageMix<BookInfo>(DATA_PAGE_NAME, { fetchDataFromServer })

    // 从服务器取得数据
    function fetchDataFromServer(): void {
      console.log(instance.searchInstance?.getCurQueryData())
    }

    // 打开对话框
    // function openImportModal() {
    //   unref(importInstance)!.openModal!();
    // }

    return {
      dataSource,
      importColumns,
      ...toRefs(instance),
    }
  },
})
</script>


<style lang="less" scoped>
</style>