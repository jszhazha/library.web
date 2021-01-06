<template>
  <TableList title="日志列表" :loading="loading" :columns="tableColumns" :data-source="dataSource" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { tableColumns } from "./data-list"
import { BookInfo } from "/@/api/book-manage/book-info"
import { injectListPage } from "/@/lib/idata/data-list/methods/useDepend"

export default defineComponent({
  setup() {
    const dataSource = reactive<BookInfo[]>([])
    const listPage = injectListPage<BookInfo>()

    // 数据加载
    const loading = listPage.loading
    // 添加新的数据
    const onNewDataItem = () => listPage.onNewDataItem()
    // 查看数据
    const onViewDataItem = (record: BookInfo) => listPage.onViewDataItem(record)
    // 编辑数据
    const onEditDataItem = (record: BookInfo) => listPage.onEditDataItem(record)
    // 删除数据
    const onDeleteDataItem = (record: BookInfo) => listPage.onDeleteDataItem(record)

    return {
      loading,
      dataSource,
      tableColumns,
      onNewDataItem,
      onViewDataItem,
      onEditDataItem,
      onDeleteDataItem
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: BookInfo[]) {
      this.dataSource = data
    }
  }
})
</script>

<style lang="less" scoped></style>
