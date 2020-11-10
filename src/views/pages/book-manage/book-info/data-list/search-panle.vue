<template>
  <div class="index-search index-card"> 
    <a-button type="primary">
      <template #icon>
        <PlusOutlined />
      </template> 
      增加
    </a-button>
    <div class="index-search-input">
      <a-input
        placeholder=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>


<style lang="less" scoped>
</style>