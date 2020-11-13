<template>
  <div class="index-card">
    <global-tabel
      title="图书列表"
      :columns="tablecolumns"
      :data-source="dataSource"
    >
      <template #header>
        <a-button> 批量导入 </a-button>
        <a-button> 导出数据 </a-button>
        <a-button type="primary" @click="newDataItem">
          新增
        </a-button>
        <a-divider type="vertical" />
        <a-dropdown>
          <SettingOutlined />
          <template #overlay>
            <a-menu>
              <a-menu-item>
                Excel 模板
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <template #operation>
        <a-button type="link" size="small">
          查看
        </a-button>
        <a-button type="link" size="small">
          编辑
        </a-button>
        <a-button type="link" size="small">
          删除
        </a-button>
      </template>
    </global-tabel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { tablecolumns } from "./list-data";

export default defineComponent({
  emits: ["new-data-item"],
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
    const newDataItem = () => emit("new-data-item");

    return { tablecolumns, dataSource, newDataItem };
  },
});
</script>


<style lang="less" scoped>
</style>