<template>
  <TableList title="类别列表" :loading="loading" :columns="tableColumns" :data-source="dataSource">
    <template #header-left>
      <a-button type="primary" @click="onNewDataItem">
        新增
      </a-button>
    </template>
    <template #operation="{ record }">
      <div class="index-operation">
        <span @click="onViewDataItem(record)">查看</span>
        <span @click="onEditDataItem(record)">编辑</span>
        <span @click="onDeleteDataItem(record)">删除</span>
      </div>
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { tableColumns } from "./data-list"
import { SubjectCategory } from "/@/api/book-manage/subject-category"
import { injectListPage } from "/@/lib/idata/data-list/methods/useDepend"

export default defineComponent({
  setup() {
    const dataSource = reactive<SubjectCategory[]>([])
    const listPage = injectListPage<SubjectCategory>()

    // 数据加载
    const loading = listPage.loading
    // 添加新的数据
    const onNewDataItem = () => listPage.onNewDataItem()
    // 查看数据
    const onViewDataItem = (record: SubjectCategory) => listPage.onViewDataItem(record)
    // 编辑数据
    const onEditDataItem = (record: SubjectCategory) => listPage.onEditDataItem(record)
    // 删除数据
    const onDeleteDataItem = (record: SubjectCategory) => listPage.onDeleteDataItem(record)

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
    setDataSource(data: SubjectCategory[]) {
      this.dataSource = data
    }
  }
})
</script>

<style lang="less" scoped></style>
