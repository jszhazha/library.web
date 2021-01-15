<template>
  <GlobalDataPage :mode="mode">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
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
            <a-form-item label="价格">
              <InputWrap v-model:value="dataItem.price" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="出版社">
              <InputWrap v-model:value="dataItem.publisher" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="学科类别">
              <SubjectCategorySearchSelect v-model:value="dataItem.bookCategoryId" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="出版时间">
              <InputWrap v-model:value="dataItem.publicationTime" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="国际标准书号">
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
    <hold-info v-if="dataItem.id" />

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
      <a-button v-if="!readonly" type="primary" @click="onSavePage">
        保存
      </a-button>
    </template>
  </GlobalDataPage>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { dataPageMix } from "/@/lib/idata/data-page/"
import Service, { BookInfo } from "/@/api/book-manage/book-info"
import { formRules } from "./data-page"
import holdInfo from "./hold-lnfo.vue"

export default defineComponent({
  components: { holdInfo },
  setup() {
    const dataItem = reactive<BookInfo>({})
    const rules = reactive(formRules)
    const onServerMethods = { onNewData, onSaveData, onLoadDataById }
    const parameter = { rules, dataItem, onServerMethods }
    const { pageInfo, onDataMethods, validateInfos } = dataPageMix<BookInfo>(parameter)
    const { mode, readonly } = toRefs(pageInfo)

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      console.log(id, "onLoadDataById")
    }

    // 保存数据
    async function onSaveData(id: number) {
      console.log(id, "onSaveData")
    }

    // 新增数据
    async function onNewData() {
      console.log("onNewData")
    }

    return {
      mode,
      readonly,
      dataItem,
      validateInfos,
      ...onDataMethods
    }
  }
})
</script>

<style lang="less" scoped></style>
