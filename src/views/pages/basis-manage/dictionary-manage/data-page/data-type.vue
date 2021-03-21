<template>
  <GlobalCard title="字典数据">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <a-row>
        <a-col :xs="24" :lg="8" class="pl-4 pr-4">
          <a-form-item label="字典标签">
            <InputWrap v-model:value="dataItem.label" :is-readonly="false" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :lg="8" class="pl-4 pr-4">
          <a-form-item label="状态">
            <SelectWrap v-model:value="dataItem.state" :options="selectOption" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :lg="8" class="pl-4 pr-4">
          <div class="index-button-right">
            <a-button v-if="mode === MixinPageMode.edit" type="primary">
              新增
            </a-button>
            <a-button v-if="mode === MixinPageMode.view" type="primary">
              查询
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <GlobalTable :columns="dataTypeColumn" />
  </GlobalCard>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import { dataTypeColumn, selectOption } from './data-page'
import { PageMode } from '/@/utils/helper/breadcrumb'

export default defineComponent({
  props: {
    mode: {
      // 出错 -1 查看 0 编辑 1 新增 2
      type: Number as PropType<PageMode>,
      default: undefined
    }
  },
  setup() {
    const dataItem = reactive({})

    return {
      dataItem,
      selectOption,
      dataTypeColumn
    }
  }
})
</script>

<style lang="less" scoped>
</style>