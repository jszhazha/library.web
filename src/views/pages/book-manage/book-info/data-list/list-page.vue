<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle />
    </div>
    <list-view
      @onNewDataItem="onNewDataItem"
      @onViewDataItem="onViewDataItem"
      @onEditDataItem="onEditDataItem"
      @openImportModal="openImportModal"
    />
    <import-modal
      title="批量导入"
      width="80%"
      :columns="importColumns"
      :data-source="dataSource"
      @on-instance="onImportModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, unref, ref } from "vue";
import listView from "./list-view.vue";
import searchPanle from "./search-panle.vue";
import { useRouter } from "vue-router";
import { PageMode } from "/@/utils/helper/breadcrumb";
import { BookInfo } from "/@/api/book-manage/book-info";
import { importColumns } from "./list-data";
import { ImportInstance } from "/@/lib/props/ImportModal";

const DATA_PAGE_NAME = "book-manage-book-info-data-page";

export default defineComponent({
  components: { listView, searchPanle },
  setup() {
    const { push } = useRouter();

    // 导入对话框实例
    const importInstance = ref<ImportInstance | null>(null);

    const dataSource = reactive<BookInfo[]>([]);

    for (let i = 0; i < 24; i++) {
      dataSource.push({
        id: i,
        name: "深入浅出 Vue.js",
        code: "210-113-232",
        isbn: "90-333" + i,
        author: "张三",
        press: "人民邮电出版社",
      });
    }

    /**
     * 添加新的数据
     */
    function onNewDataItem() {
      push({ name: DATA_PAGE_NAME, query: { mode: PageMode[PageMode.new] } });
    }

    /**
     * 查看数据
     */
    function onViewDataItem(id: number) {
      push({
        name: DATA_PAGE_NAME,
        query: { mode: PageMode[PageMode.view], id },
      });
    }

    /**
     * 编辑数据
     */
    function onEditDataItem(record: BookInfo) {
      push({
        name: DATA_PAGE_NAME,
        query: { mode: PageMode[PageMode.edit], id: record.id },
      });
    }

    // 导入数据对话框注册
    function onImportModal(modalMethod: ImportInstance) {
      importInstance.value = modalMethod;
    }

    // 获取实例
    function getImportModal() {
      const instance = unref(importInstance);
      if (!instance) {
        throw new Error("instance is undefined!");
      }
      return instance;
    }

    // 打开对话框
    function openImportModal() {
      getImportModal().openModal!();
    }

    return {
      dataSource,
      onNewDataItem,
      onViewDataItem,
      onEditDataItem,
      importColumns,
      onImportModal,
      openImportModal,
    };
  },
});
</script>


<style lang="less" scoped>
</style>