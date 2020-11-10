<template>
  <div class="index-content">
    <search-panle />
    <list-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import listView from "./list-view.vue";
import searchPanle from "./search-panle.vue";

export default defineComponent({
  components: { listView, searchPanle },
});
</script>


<style lang="less" scoped>
</style>