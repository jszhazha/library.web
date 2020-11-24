<template>
  <table-list title="图书列表" :columns="tableColumns" :data-source="dataSource">
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
import { injectDataPage } from "/@/utils/listPage/methods/useProvince";

export default defineComponent({
  setup() {
    const dataSource = reactive<BookInfo[]>([]);
    const dataPage = injectDataPage<BookInfo>();

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

    console.log();

    // 添加新的数据
    const onNewDataItem = () => dataPage.onNewDataItem();
    // 查看数据
    const onViewDataItem = (record: BookInfo) => dataPage.onViewDataItem(record);
    // 编辑数据
    const onEditDataItem = (record: BookInfo) => dataPage.onEditDataItem(record);

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