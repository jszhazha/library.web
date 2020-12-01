<template>
  <GlobalCard title="馆藏信息">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <a-row>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="索书号">
            <InputWrap />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="存放位置">
            <InputWrap />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <GlobalTable class="m-4" :data-source="dataSource" :columns="holdInfoColumns">
      <template v-for="key in ['number', 'location']" #[key]="{ text, record, index }" :key="key">
        <a-input v-if="index === editingIndex" v-model:value="record[key]" />
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template #operation="{ record, index }">
        <div class="index-operation">
          <div v-if="index === editingIndex">
            <span @click="onSvaeEditData(index)">保存</span>
            <a-popconfirm title="确定取消吗?" @confirm="onCancelEditData(index)">
              <span>取消</span>
            </a-popconfirm>
          </div>
          <div v-else v-bind="editingIndex !== null ? { disabled: 'disabled' } : {}">
            <span @click="onEditData(record, index)">编辑</span>
            <span>删除</span>
          </div>
        </div>
      </template>
    </GlobalTable>
  </GlobalCard>
</template>

<script lang="ts">
import type { holdInfo } from "/@/api/book-manage/hold-lnfo"
import { defineComponent, PropType, reactive, ref } from "vue"
import { holdInfoColumns } from "./data-page"
import { cloneDeep } from "lodash-es"
import { isNull } from "/@/utils/is"

export default defineComponent({
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {
    // 全部数据
    const dataSource = reactive<holdInfo[]>([])
    // 编辑下标
    const editingIndex = ref<number | null>(null)
    // 编辑数据
    let cacheData: holdInfo = {}

    for (let i = 0; i < 2; i++) {
      dataSource.push({
        location: "54-" + i,
        number: "323" + i,
        time: Math.random(),
        id: i,
      })
    }

    // 处理编辑
    function onEditData(record: holdInfo, index: number) {
      if (!isNull(editingIndex.value)) return
      editingIndex.value = index
      cacheData = cloneDeep(record)
    }

    // 保存数据
    function onSvaeEditData(index: number) {
      cacheData = {}
      editingIndex.value = null
      console.log(index)
    }

    // 取消编辑数据
    function onCancelEditData(index: number) {
      editingIndex.value = null
      dataSource[index] = cacheData
    }

    return {
      holdInfoColumns,
      dataSource,
      editingIndex,
      onEditData,
      onSvaeEditData,
      onCancelEditData,
    }
  },
})
</script>


<style lang="less" scoped>
</style>