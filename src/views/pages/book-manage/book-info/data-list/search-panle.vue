<template>
  <a-form :label-col="{ flex: '100px' }">
    <a-row>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="题名">
          <a-input v-model:value="queryData.name" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="作者">
          <a-input v-model:value="queryData.author" placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col v-show="isOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="出版社">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col v-show="isOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="学科类别">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col v-show="isOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="国际标准书号">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <div class="index-table-search-button">
          <a-button type="primary">
            查询
          </a-button>
          <a-button @click="onResetData">
            重置
          </a-button>
          <DownOutButton :is-open="isOpen" @click="onOpen" />
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { PagerQueryData } from "/@/lib/http/axios/types";
import { useSearch, SearchInstance } from "/@/utils/listPage/methods/useSearch";

export default defineComponent({
  setup(): SearchInstance {
    // 搜索是否展开
    const isOpen = ref<boolean>(false);
    // 数据搜索
    const queryData = reactive<PagerQueryData>({
      pageSize: 10,
      page: 0,
      sorts: [],
    });
    // 返回查询条件
    const getCurQueryData = (): PagerQueryData => queryData;

    const { onResetData, onOpen } = useSearch({ queryData, isOpen });

    return {
      isOpen,
      queryData,
      onOpen,
      onResetData,
      getCurQueryData,
    };
  },
});
</script>


<style lang="less" scoped>
</style>