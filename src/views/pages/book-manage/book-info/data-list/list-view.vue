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
    <template #header-right>
      <a-dropdown>
        <a-button type="link" size="small">
          <SettingOutlined />
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item> Excel 模板 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
    <template #operation="{ record }">
      <a-button type="link" size="small" @click="viewDataItem(record)">
        查看
      </a-button>
      <a-button type="link" size="small" @click="editDataItem(record)">
        编辑
      </a-button>
      <a-button type="link" size="small">
        删除
      </a-button>
    </template>
  </table-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { tablecolumns } from "./list-data";
import { BookInfo } from "/@/api/book-manage/book-info";

export default defineComponent({
  emits: ["new-data-item", "view-data-item", "edit-data-item"],
  setup(_props, { emit }) {
    const dataSource = [];
    for (let i = 0; i < 20; i++) {
      dataSource.push({
        id: i,
        name: "深入浅出 Vue.js",
        code: "210-113-232",
        subjectCategory: i,
        isbn: "90-333",
        author: "张三",
        press: "人民邮电出版社",
        count: 20,
        number: 30,
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
      emit("edit-data-item", record.id);
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