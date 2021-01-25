<template>
  <GlobalDataPage :mode="mode">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <!-- 基本信息 -->
      <GlobalCard title="基本信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="标题" v-bind="validateInfos.title">
              <InputWrap v-model:value="dataItem.title" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="状态" v-bind="validateInfos.show">
              <SelectWrap v-model:value="dataItem.show">
                <a-select-option :value="1">
                  可见
                </a-select-option>
                <a-select-option :value="0">
                  不可见
                </a-select-option>
              </SelectWrap>
              <!-- <a-radio-group >
                <a-radio :value="1">
                  
                </a-radio>
                <a-radio :value="0" class="ml-2">
                  
                </a-radio>
              </a-radio-group> -->
            </a-form-item>
          </a-col>
        </a-row>
      </GlobalCard>

      <GlobalCard title="问题描述">
        <div class="editor-content">
          <PreviewMode v-if="readonly" :value="dataItem.text" />
          <PublicEditor v-else v-model:value="dataItem.text" :configs="editorConfigs" />
        </div>
      </GlobalCard>
    </a-form>

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
import service, { ProblemManage } from '/@/api/basis-manage/problem-manage'
import { formRules, editorConfigs } from './data-page'
import { assign } from 'lodash-es'
import PreviewMode from '/@/components/PublicEditor/src/Preview'

export default defineComponent({
  components: { PreviewMode },
  setup() {
    const dataItem = reactive<ProblemManage>({ show: 1 })
    const rules = reactive(formRules)
    const onServerMethods = { onNewData, onSaveData, onLoadDataById }
    const parameter = { rules, dataItem, onServerMethods }
    const { pageInfo, onDataMethods, validateInfos, loading } = dataPageMix<ProblemManage>(
      parameter
    )

    const { mode, readonly } = toRefs(pageInfo)

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id)
      assign(dataItem, data)
      changeDataType()
    }

    // 保存数据
    async function onSaveData(id: number, contrast: ProblemManage) {
      const { data } = await service.updateItem(id, contrast)
      assign(dataItem, data)
      changeDataType()
    }

    // 新增数据
    async function onNewData() {
      const { data } = await service.saveNewItem(dataItem)
      assign(dataItem, data)
    }

    // 改变数据类型
    function changeDataType() {
      dataItem.show = dataItem.show ? 1 : 0
    }

    return {
      mode,
      readonly,
      dataItem,
      loading,
      validateInfos,
      editorConfigs,
      ...onDataMethods
    }
  }
})
</script>

<style lang="less" scoped>
.editor-content {
  height: 500px;
  margin: 16px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>