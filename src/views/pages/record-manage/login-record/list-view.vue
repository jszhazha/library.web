<template>
  <TableList
    title="登录日志列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @on-refresh="onRefresh"
  >
    <template #status="{ record }">
      <span v-if="record.status === 'SUCCESS'" color="#19be6b"> 成功 </span>
      <span v-else color="#ed4014"> 失败 </span>
    </template>
    <template #createTime="{ record }">
      {{ useFromatlll(record.createTime) }}
    </template>

    <template #description="{ record }">
      <span v-if="record.description">{{ record.description }}</span>
      <span v-else>登录成功</span>
    </template>

    <template #location="{ record }">
      <span v-if="record.country !== 'XX'">{{ record.country }}</span>
      <span v-if="record.region !== 'XX'" class="ml-2">{{ record.region }}</span>
      <span v-if="record.city !== 'XX'" class="ml-2">{{ record.city }}</span>
    </template>

    <template #footer-right>
      <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { tableColumns } from "./data-list"
import { BookInfo } from "/@/api/book-manage/book-info"
import { injectListPage } from "/@/lib/idata/data-list/methods/useDepend"
import { useFromatlll } from "/@/utils/dateFormat"
import { usePagination } from "/@/hooks/web/usePagination"

export default defineComponent({
  emits: ["on-page-change", "on-refresh"],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<BookInfo[]>([])

    // 总数据
    const totalElements = ref<number>(0)

    // 页面方法
    const listPage = injectListPage<BookInfo>()

    // 数据加载
    const loading = listPage.loading

    const { current, setPagination, getPagination } = usePagination()

    // 页面发生变化
    const onPageChange = () => emit("on-page-change")

    // 处理刷新
    const onRefresh = () => emit("on-refresh")

    return {
      loading,
      current,
      setPagination,
      getPagination,
      dataSource,
      totalElements,
      tableColumns,
      useFromatlll,
      onPageChange,
      onRefresh
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: BookInfo[], total: number) {
      this.dataSource = data
      this.totalElements = total
    }
  }
})
</script>

<style lang="less" scoped></style>
