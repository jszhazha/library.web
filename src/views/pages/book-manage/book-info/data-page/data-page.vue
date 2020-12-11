<template>
  <GlobalDataPage>
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <GlobalCard title="基本信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="题名" v-bind="validateInfos.name">
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
            <a-form-item label="语种">
              <InputWrap />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="价格">
              <InputWrap />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="出版社">
              <InputWrap v-model:value="dataItem.press" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="学科类别">
              <InputWrap />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="出版时间">
              <InputWrap />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="国际标准书号">
              <InputWrap />
            </a-form-item>
          </a-col>
        </a-row>
      </GlobalCard>
    </a-form>

    <!-- 馆藏信息 -->
    <hold-info />

    <!-- 修改信息 -->
    <OperationInfoPanel />

    <!-- 操作 -->
    <template #footer-block>
      <a-button @click="onClosePage">
        返回
      </a-button>
      <a-button v-if="!readonly" @click="onRestPage">
        重置
      </a-button>
      <a-button v-if="readonly && mode !== -1" type="primary" @click="onEditPage">
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
import { dataPageMix } from "/@/utils/dataPage/"
import { BookInfo } from "/@/api/book-manage/book-info"
import { formRules } from "./data-page"
import holdInfo from "./hold-lnfo.vue"

export default defineComponent({
  components: { holdInfo },
  setup() {
    const dataItem = reactive<BookInfo>({})
    const rules = reactive(formRules)
    const { pageInfo, onDataMethods, validateInfos } = dataPageMix<BookInfo>({ dataItem, rules })
    const { mode, readonly } = toRefs(pageInfo)

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
