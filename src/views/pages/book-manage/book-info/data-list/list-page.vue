<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle />
    </div>
    <list-view />
    <import-modal
      title="批量导入"
      :columns="importColumns"
      :data-source="dataSource"
      @on-instance="onImportModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import listView from "./list-view.vue";
import searchPanle from "./search-panle.vue";
import { BookInfo } from "/@/api/book-manage/book-info";
import { importColumns } from "./data-list";
import { ImportInstance } from "/@/lib/props/ImportModal";
import { listPageMix } from "/@/utils/listPage/";

const DATA_PAGE_NAME = "book-manage-book-info-data-page";

export default defineComponent({
  components: { listView, searchPanle },
  setup() {

    // 导入对话框实例
    const importInstance = ref<ImportInstance | null>(null);

    // 批量导入数据集合
    const dataSource = reactive<BookInfo[]>([]);

    listPageMix<BookInfo>(DATA_PAGE_NAME);

    // 导入数据对话框注册
    function onImportModal(modalMethod: ImportInstance) {
      importInstance.value = modalMethod;
    }


    // 打开对话框
    // function openImportModal() {
    //   unref(importInstance)!.openModal!();
    // }

    return {
      dataSource,
      importColumns,
      onImportModal,
    };
  },
});
</script>


<style lang="less" scoped>
</style>