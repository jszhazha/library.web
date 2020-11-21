<template>
  <table-list
    title="图书列表"
    :columns="tableColumns"
    :data-source="dataSource"
  >
    <template #header-left>
      <a-button @click="onBatchImport">
        批量导入
      </a-button>
      <a-button type="primary" @click="onNewDataItem">
        新增
      </a-button>
    </template>
    <template #operation="{ record }">
      <div class="index-operation">
        <span @click="onViewDataItem(record)">查看</span>
        <span @click="onEditDataItem(record)">编辑</span>
        <span>删除</span>
      </div>
    </template>
  </table-list>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { tableColumns } from "./data-list";
import { BookInfo } from "/@/api/book-manage/book-info";


export default defineComponent({
  emits: [
    "on-new-data-item",
    "on-view-data-item",
    "on-edit-data-item",
  ],
  setup(_props, { emit }) {
    const dataSource = reactive<BookInfo[]>([]);
    for (let i = 0; i < 24; i++) {
      dataSource.push({
        id: i,
        name: "深入浅出 Vue.js",
        code: "210-113-232",
        isbn: "90-333",
        author: "张三",
        press: "人民邮电出版社",
      });
    }


    // 添加新的数据
    function onNewDataItem() {
      emit("on-new-data-item");
    }

    // 查看数据
    function onViewDataItem(record: BookInfo) {
      emit("on-view-data-item", record.id);
    }

    // 编辑数据
    function onEditDataItem(record: BookInfo) {
      emit("on-edit-data-item", record);
    }

    // 批量导入
    function onBatchImport() {
      // emit("open-import-modal");
    }

    return {
      tableColumns,
      dataSource,
      onBatchImport,
      onNewDataItem,
      onViewDataItem,
      onEditDataItem,
    };
  },
});
</script>


<style lang="less" scoped>
</style>