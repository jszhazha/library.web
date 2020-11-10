<template>
  <div class="index-table-search index-card">
    <a-form>
      <a-row type="flex">
        <a-col :md="24" :lg="8" class="index-table-search-col">
          <a-form-item label="题 名">
            <a-input placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :md="24" :lg="8" class="index-table-search-col">
          <a-form-item label="国际标准书号">
            <a-input placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :md="24" :lg="8" class="index-table-search-col">
          <div class="index-table-search-button">
            <a-button type="primary">
              查询
            </a-button>
            <a-button style="margin-left: 8px;">
              重置
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <a-row>
      <a-col :span="4" class="index-table-search-col">
        <a-button type="primary">
          <template #icon>
            <PlusOutlined />
          </template>
          增加
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>


<style lang="less" scoped>
</style>