<template>
  <GlobalDataPage :mode="mode">
    <a-form :label-col="{ flex: '110px' }" :wrapper-col="{ flex: 'auto' }">
      <GlobalCard title="基本信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="书名" v-bind="validateInfos.name">
              <InputWrap v-model:value="dataItem.name" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="作者" v-bind="validateInfos.author">
              <InputWrap v-model:value="dataItem.author" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="编码">
              <InputWrap v-model:value="dataItem.code" readonly />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="价格" v-bind="validateInfos.price">
              <InputNumberWrap v-model:value="dataItem.price" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="出版社" v-bind="validateInfos.publisher">
              <InputWrap v-model:value="dataItem.publisher" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="图书类别" v-bind="validateInfos.bookCategoryId">
              <BookCategorySearchSelect
                v-model:value="dataItem.bookCategoryId"
                :book-category="dataItem.bookCategory"
                :readonly="mode === 1"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="出版时间" v-bind="validateInfos.publicationTime">
              <DatePickerWrap v-model:value="dataItem.publicationTime" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="国际标准书号" v-bind="validateInfos.isbn">
              <InputWrap v-model:value="dataItem.isbn" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="18" class="pl-4 pr-4">
            <a-form-item label="描述">
              <TextareaWrap
                v-model:value="dataItem.description"
                show-count
                :maxlength="100"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </GlobalCard>
    </a-form>

    <!-- 馆藏信息 -->
    <book-detail v-if="dataItem.id" :mode="mode" :book-id="dataItem.id" />

    <!-- 修改信息 -->
    <OperationInfoPanel v-if="dataItem.id" :data="dataItem" />

    <!-- 操作 -->
    <template #footer-block>
      <a-button v-if="!readonly" @click="onRestPage">
        重置
      </a-button>
      <a-button v-if="readonly" type="primary" @click="onEditPage">
        编辑
      </a-button>
      <a-button v-if="!readonly" type="primary" :loading="loading" @click="onSavePage">
        保存
      </a-button>
    </template>
  </GlobalDataPage>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { dataPageMix } from '/@/lib/idata/data-page/'
import service, { BookInfo } from '/@/api/book-manage/book-info'
import { formRules } from './data-page'
import { assign } from 'lodash-es'
import bookDetail from './book-detail.vue'

export default defineComponent({
  components: { bookDetail },
  setup() {
    const dataItem = reactive<BookInfo>({})
    const rules = reactive(formRules)
    const onServerMethods = { onNewData, onSaveData, onLoadDataById }
    const parameter = { rules, dataItem, onServerMethods }
    const { pageInfo, onDataMethods, validateInfos, loading } = dataPageMix<BookInfo>(parameter)
    const { mode, readonly } = toRefs(pageInfo)

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id)
      dataItem.bookCategoryId = data.bookCategory?.id
      assign(dataItem, data)
    }

    // 保存数据
    async function onSaveData(id: number, contrast: BookInfo) {
      const { data } = await service.updateItem(id, contrast)
      assign(dataItem, data)
    }

    // 新增数据
    async function onNewData() {
      const { data } = await service.saveNewItem(dataItem)
      assign(dataItem, data)
    }

    return {
      mode,
      loading,
      readonly,
      dataItem,
      validateInfos,
      ...onDataMethods
    }
  }
})
</script>

<style lang="less" scoped></style>
