<template>
  <TableList
    title="图书借阅列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @onRefresh="onRefresh"
  >
    <template #operation="{ record }">
      <div class="index-operation">
        <span @click="onRevertDataItem(record)">归还</span>
        <span @click="onLossDataItem(record)">丢失</span>
      </div>
    </template>

    <template #createTime="{ record }">
      {{ MixinUseMoment(record.createTime, 'YYYY-MM-DD HH:mm:ss') }}
    </template>

    <template #revertDate="{ record }">
      {{ MixinUseMoment(record.revertDate, 'YYYY-MM-DD HH:mm:ss') }}
    </template>

    <template #footer-right>
      <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { tableColumns } from './data-list'
import { BorrowManage } from '/@/api/borrow-manage/borrow-manage'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import { usePagination } from '/@/hooks/web/usePagination'

export default defineComponent({
  emits: ['on-page-change', 'on-refresh', 'on-revert', 'on-loss'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<BorrowManage[]>([])

    // 总数据
    const totalElements = ref<number>(0)

    const listPage = injectListPage<BorrowManage>()

    // 数据加载
    const loading = listPage.loading

    const pagination = usePagination()

    // 页面发生变化
    const onPageChange = () => emit('on-page-change')

    // 处理刷新
    const onRefresh = () => emit('on-refresh')
    // 归还
    const onRevertDataItem = (record: BorrowManage) => emit('on-revert', record)
    // 丢失
    const onLossDataItem = () => emit('on-loss')

    return {
      loading,
      dataSource,
      ...pagination,
      totalElements,
      tableColumns,
      onRefresh,
      onPageChange,
      onRevertDataItem,
      onLossDataItem
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: BorrowManage[], total: number) {
      this.dataSource = data
      this.totalElements = total
    }
  }
})
</script>

<style lang="less" scoped></style>
