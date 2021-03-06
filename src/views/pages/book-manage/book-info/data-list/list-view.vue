<template>
  <TableList
    title="图书列表"
    download
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    :template-link="TemplateLink"
    @onRefresh="onRefresh"
  >
    <template #header-left>
      <UploadButton
        accept="application/vnd.ms-excel"
        @on-batch-import="onFilePaeseData"
      />
      <a-button type="primary" @click="onNewDataItem">
        新增
      </a-button>
    </template>
    <template #name="{ text }">
      <div class=" index-hidden-newline w-200" :title="text">
        {{ text }}
      </div>
    </template>
    <template #author="{ text }">
      <div class=" index-hidden-newline w-100" :title="text">
        {{ text }}
      </div>
    </template>
    <template #operation="{ record }">
      <div class="index-operation">
        <span @click="onViewDataItem(record)">查看</span>
        <span @click="onEditDataItem(record)">编辑</span>
        <span @click="onDeleteDataItem(record)">删除</span>
      </div>
    </template>
    <template #footer-right>
      <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { tableColumns } from './data-list'
import { BookInfo, TemplateLink } from '/@/api/book-manage/book-info'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import { usePagination } from '/@/hooks/web/usePagination'

export default defineComponent({
  emits: ['on-page-change', 'on-refresh', 'on-file-paese-data'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<BookInfo[]>([])

    // 总数据
    const totalElements = ref<number>(0)

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

    // 页面发生变换
    const pagination = usePagination()

    // 页面发生变化
    const onPageChange = () => emit('on-page-change')

    // 处理刷新
    const onRefresh = () => emit('on-refresh')

    // 批量导入
    const onFilePaeseData = (file: FormData, cb: () => void) => emit('on-file-paese-data', file, cb)

    return {
      loading,
      dataSource,
      ...pagination,
      totalElements,
      tableColumns,
      onRefresh,
      onPageChange,
      onFilePaeseData,
      onNewDataItem,
      onViewDataItem,
      onEditDataItem,
      onDeleteDataItem,
      TemplateLink
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
