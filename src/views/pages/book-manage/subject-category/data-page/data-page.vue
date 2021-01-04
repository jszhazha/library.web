<template>
  <GlobalDataPage :mode="mode">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <!-- 基本信息 -->
      <GlobalCard title="基本信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="类别名" v-bind="validateInfos.name">
              <InputWrap v-model:value="dataItem.name" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="类别号" v-bind="validateInfos.code">
              <InputWrap v-model:value="dataItem.code" />
            </a-form-item>
          </a-col>
        </a-row>
      </GlobalCard>
    </a-form>

    <!-- 修改信息 -->
    <OperationInfoPanel v-if="dataItem.id" />

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
import { SubjectCategory } from "/@/api/book-manage/subject-category"
import { formRules } from "./data-page"
import service from "/@/api/book-manage/subject-category"

export default defineComponent({
  setup() {
    const dataItem = reactive<SubjectCategory>({})
    const rules = reactive(formRules)
    const onServerMethods = { onNewData, onSaveData, onLoadDataById }
    const parameter = { rules, dataItem, onServerMethods }
    const { pageInfo, onDataMethods, validateInfos } = dataPageMix<SubjectCategory>(parameter)
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
    async function onNewData(success: (data: SubjectCategory) => void, fail: () => void) {
      try {
        const { data } = await service.saveNewItem(dataItem)
        success(data)
      } catch (err) {
        fail()
      }
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
