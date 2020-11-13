<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle />
    </div>
    <list-view @newDataItem="newDataItem" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import listView from "./list-view.vue";
import searchPanle from "./search-panle.vue";
import { useRouter } from "vue-router";
import { PageMode } from "/@/utils/helper/breadcrumb";

const DATA_PAGE_NAME = "book-manage-book-info-data-page";

export default defineComponent({
  components: { listView, searchPanle },
  setup() {
    const { push } = useRouter();
    function newDataItem() {
      push({ name: DATA_PAGE_NAME, query: { mode: PageMode[PageMode.new] } });
    }
    return { newDataItem };
  },
});
</script>


<style lang="less" scoped>
</style>