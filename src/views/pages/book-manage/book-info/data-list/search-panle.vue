<template>
  <a-form :label-col="{ flex: '100px' }">
    <a-row>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="书名">
          <InputSearch v-model:value="queryData.name" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="编码">
          <InputSearch v-model:value="queryData.code" />
        </a-form-item>
      </a-col>
      <a-col v-show="isOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="出版社">
          <InputSearch v-model:value="queryData.publisher" />
        </a-form-item>
      </a-col>
      <a-col v-show="isOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="图书类别">
          <BookCategorySearchSelect v-model:value="queryData.bookCategoryId" />
        </a-form-item>
      </a-col>
      <a-col v-show="isOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="国际标准书号">
          <InputSearch v-model:value="queryData.isbn" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <div class="index-button-right">
          <a-button type="primary" @click="onSearchData">
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
import { defineComponent, reactive, ref } from "vue"
import { PagerQueryData } from "/@/lib/http/axios/types"
import { useSearch, SearchInstance } from "/@/lib/idata/data-list/methods/useSearch"

export default defineComponent({
  emits: ["onSearch"],
  setup(_props, { emit }): SearchInstance {
    // 搜索是否展开
    const isOpen = ref<boolean>(false)
    // 数据搜索
    const queryData = reactive<PagerQueryData>({
      size: 10,
      page: 0,
      sort: "createTime,desc"
    })
    // 返回查询条件
    const getCurQueryData = (): PagerQueryData => queryData

    // 查询数据
    const onSearchData = () => emit("onSearch")

    const { onResetData, onOpen } = useSearch(queryData, isOpen)

    return {
      isOpen,
      queryData,
      onOpen,
      onResetData,
      onSearchData,
      getCurQueryData
    }
  }
})
</script>

<style lang="less" scoped></style>
