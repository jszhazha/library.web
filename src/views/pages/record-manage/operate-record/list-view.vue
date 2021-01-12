<template>
  <TableList
    title="登录日志列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @on-refresh="onRefresh"
  >
    <template #createTime="{ record }">
      {{ useFromatlll(record.createTime) }}
    </template>

    <template #action>
      <div class="index-operation">
        <span>详情</span>
      </div>
    </template>

    <template #systemModule="{ record }">
      <div>
        {{ queryModule(record.path) }}
      </div>
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
import { queryModule } from "/@/utils/regExp"

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
      dataSource,
      queryModule,
      setPagination,
      getPagination,
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

<style lang="less" scoped>
</style>
