<template>
  <table-list
    title="图书列表"
    :columns="tablecolumns"
    :data-source="dataSource"
  >
    <template #header-left>
      <a-button> 批量导入 </a-button>
      <a-button type="primary" @click="newDataItem">
        新增
      </a-button>
    </template>
    <template #operation="{ record }">
      <div class="index-operation">
        <span @click="viewDataItem(record)">查看</span>
        <span @click="editDataItem(record)">编辑</span>
        <global-popconfirm>
          <span>删除</span>
        </global-popconfirm>
      </div>
    </template>
  </table-list>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { tablecolumns } from "./list-data";
import { BookInfo } from "/@/api/book-manage/book-info";

export default defineComponent({
  emits: ["new-data-item", "view-data-item", "edit-data-item"],
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
    function newDataItem() {
      emit("new-data-item");
    }

    // 查看数据
    function viewDataItem(record: BookInfo) {
      emit("view-data-item", record.id);
    }

    // 编辑数据
    function editDataItem(record: BookInfo) {
      emit("edit-data-item", record);
    }

    return {
      tablecolumns,
      dataSource,
      newDataItem,
      viewDataItem,
      editDataItem,
    };
  },
});
</script>


<style lang="less" scoped>
</style>