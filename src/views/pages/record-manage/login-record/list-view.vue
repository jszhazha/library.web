<template>
  <TableList
    title="登录日志列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
  >
    <template #status="{ record }">
      <span v-if="record.status==='SUCCESS'" color="#19be6b">
        成功
      </span>
      <span v-else color="#ed4014">
        失败
      </span>
    </template>
    <template #createTime="{ record }">
      {{ useFromatlll(record.createTime) }}
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { tableColumns } from "./data-list"
import { BookInfo } from "/@/api/book-manage/book-info"
import { injectListPage } from "/@/lib/idata/data-list/methods/useDepend"
import { useFromatlll } from "/@/utils/dateFormat"

export default defineComponent({
  setup() {
    const dataSource = reactive<BookInfo[]>([])
    const listPage = injectListPage<BookInfo>()

    // 数据加载
    const loading = listPage.loading

    return {
      loading,
      dataSource,
      tableColumns,
      useFromatlll
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
