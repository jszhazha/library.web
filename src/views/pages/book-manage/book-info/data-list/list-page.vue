<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle />
    </div>
    <list-view
      @newDataItem="newDataItem"
      @viewDataItem="viewDataItem"
      @editDataItem="editDataItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import listView from "./list-view.vue";
import searchPanle from "./search-panle.vue";
import { useRouter } from "vue-router";
import { PageMode } from "/@/utils/helper/breadcrumb";
import { BookInfo } from "/@/api/book-manage/book-info";

const DATA_PAGE_NAME = "book-manage-book-info-data-page";

export default defineComponent({
  components: { listView, searchPanle },
  setup() {
    const { push } = useRouter();

    // 添加新的数据
    function newDataItem() {
      push({ name: DATA_PAGE_NAME, query: { mode: PageMode[PageMode.new] } });
    }

    // 查看数据
    function viewDataItem(id: number) {
      push({
        name: DATA_PAGE_NAME,
        query: { mode: PageMode[PageMode.view], id },
      });
    }

    // 编辑数据
    function editDataItem(record: BookInfo) {
      push({
        name: DATA_PAGE_NAME,
        query: { mode: PageMode[PageMode.edit], id: record.id },
      });
    }

    return { newDataItem, viewDataItem, editDataItem };
  },
});
</script>


<style lang="less" scoped>
</style>