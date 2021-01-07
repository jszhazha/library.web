<template>
  <TableList
    title="登录日志列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    :total="totalElements"
    @on-page-change="onPageChange"
  >
    <template #status="{ record }">
      <span v-if="record.status === 'SUCCESS'" color="#19be6b"> 成功 </span>
      <span v-else color="#ed4014"> 失败 </span>
    </template>
    <template #createTime="{ record }">
      {{ useFromatlll(record.createTime) }}
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { tableColumns } from "./data-list"
import { BookInfo } from "/@/api/book-manage/book-info"
import { injectListPage } from "/@/lib/idata/data-list/methods/useDepend"
import { useFromatlll } from "/@/utils/dateFormat"

export default defineComponent({
  emits: ["on-page-change"],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<BookInfo[]>([])

    // 总数据
    const totalElements = ref<number>(0)

    // 页面方法
    const listPage = injectListPage<BookInfo>()

    // 数据加载
    const loading = listPage.loading

    // 当前页
    const currentPage = ref<number>(1)

    // 页面发生变化
    const onPageChange = (page: number) => {
      currentPage.value = page
      emit("on-page-change")
    }

    return {
      loading,
      dataSource,
      currentPage,
      totalElements,
      tableColumns,
      useFromatlll,
      onPageChange
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: BookInfo[], total: number) {
      this.dataSource = data
      this.totalElements = total
    },
    // 获取当前页
    getCurrentPage() {
      return this.currentPage
    }
  }
})
</script>

<style lang="less" scoped></style>
