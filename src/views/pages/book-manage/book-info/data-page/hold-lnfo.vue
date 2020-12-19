<template>
  <GlobalCard title="馆藏信息">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <a-row>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="索书号">
            <InputWrap v-model:value="dataItem.number" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="存放位置">
            <InputWrap v-model:value="dataItem.location" />
          </a-form-item>
        </a-col>
        <a-col class="pl-4 pr-4" flex="auto">
          <div class="index-button-right">
            <!-- <a-button type="primary">
              添加
            </a-button> -->
          </div>
        </a-col>
      </a-row>
    </a-form>
    <GlobalTable
      class="m-4"
      :data-source="dataSource"
      :columns="holdInfoColumns"
      :scroll="{ x: true }"
    >
      <template v-for="col in ['number', 'location']" #[col]="{ text, record }" :key="col">
        <a-input
          v-if="record.editable"
          :value="text"
          @change="(e) => handleEditChange(e.target.value, record, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template #operation="{ record, index }">
        <div class="index-operation">
          <div v-if="index === editingIndex">
            <span @click="handleSvaeEdit(record)">保存</span>
            <a-popconfirm title="确定取消吗?" @confirm="handleCancelEdit(record)">
              <span>取消</span>
            </a-popconfirm>
          </div>
          <div v-else v-bind="editingIndex !== null ? { disabled: 'disabled' } : {}">
            <span @click="handleClickEdit(record, index)">编辑</span>
            <span>删除</span>
          </div>
        </div>
      </template>
    </GlobalTable>
  </GlobalCard>
</template>

<script lang="ts">
import type { holdInfo } from "/@/api/book-manage/hold-lnfo"
import { defineComponent, PropType, reactive } from "vue"
import { holdInfoColumns } from "./data-page"
import { useTableEdit } from "/@/hooks/web/useTableEdit"

export default defineComponent({
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup() {
    // 全部数据
    const dataSource = reactive<holdInfo[]>([])

    // 输入数据
    let dataItem = reactive<holdInfo>({})


    return {
      dataItem,
      dataSource,
      holdInfoColumns,
      ...useTableEdit()
    }
  }
})
</script>

<style lang="less" scoped>
</style>
