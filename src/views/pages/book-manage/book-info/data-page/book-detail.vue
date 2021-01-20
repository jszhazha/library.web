<template>
  <GlobalCard title="馆藏信息">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <a-row>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="存放位置" v-bind="validateInfos.address">
            <InputWrap v-model:value="dataItem.address" />
          </a-form-item>
        </a-col>
        <a-col class="pl-4 pr-4" flex="auto">
          <div class="index-button-right">
            <a-button v-if="mode === 1" type="primary" :loading="loading.add" @click="onNewData">
              添加
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <GlobalTable
      class="m-4"
      :loading="loading.table"
      :data-source="dataSource"
      :columns="holdInfoColumns"
      :scroll="{ x: true }"
    >
      <template v-for="col in ['address']" #[col]="{ text, record }" :key="col">
        <a-input
          v-if="record.editable"
          :value="text"
          @change="(e) => handleEditChange(e.target.value, record, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template #status="{ text }">
        <a-tag v-if="text === 'IN_LIBRARY'" color="success">
          在馆未借
        </a-tag>
        <a-tag v-else-if="text === 'OUT_LIBRARY'" color="processing">
          已借未还
        </a-tag>
        <a-tag v-else-if="text === 'LOST'" color="error">
          丢失
        </a-tag>
        <a-tag v-else-if="text === 'OVERDUE'" color="warning">
          逾期
        </a-tag>
        <a-tag v-else-if="text === 'SUBSCRIBE'" color="purple">
          被预约
        </a-tag>
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
    <PaginationWrap class="index-right pr-4 pt-5" />
  </GlobalCard>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue"
import { holdInfoColumns, bookDetailRules } from "./data-page"
import service, { BookDetail } from "/@/api/book-manage/book-detail"
import { useTableEdit } from "/@/hooks/web/useTableEdit"
import { dataItemInit } from "/@/lib/idata/data-page/"
import { PageMode } from "/@/utils/helper/breadcrumb"
import { useForm } from "@ant-design-vue/use"
import { assign } from "lodash-es"
import { message } from "ant-design-vue"

export default defineComponent({
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    mode: {
      // 出错 -1 查看 0 编辑 1 新增 2
      type: Number as PropType<PageMode>,
      default: undefined
    },
    bookId: {
      type: Number as PropType<number>,
      default: undefined
    }
  },
  setup(props) {
    // 全部数据
    const dataSource = reactive<BookDetail[]>([])

    // 规则
    const rules = reactive(bookDetailRules)

    // 输入数据
    const dataItem = reactive<BookDetail>({ bookId: props.bookId })

    // 加载
    const loading = reactive<{ add?: boolean; table?: boolean }>({})

    // table 编辑
    const tableEdit = useTableEdit({ onSaveData })

    // 数据初始化
    dataItemInit<BookDetail>(dataItem, rules)

    // 获取规则
    const { validate, validateInfos, resetFields } = useForm(dataItem, rules)

    // 请求列表数据
    async function fetchDataFromServer() {
      try {
        loading.table = true
        const { data } = await service.fecthList()
        assign(dataSource, data.content)
      } catch (err) {
        message.error(`数据获取失败: ${err.msg}`)
      } finally {
        loading.table = false
      }
    }

    // 新增数据
    async function onNewData() {
      if (!validItem()) return
      try {
        loading.add = true
        await service.saveNewItem(dataItem)
        fetchDataFromServer()
        resetFields()
      } catch (err) {
        message.error(`新增数据失败: ${err.msg}`)
      } finally {
        loading.add = false
      }
    }

    // 检查数据
    async function validItem() {
      try {
        validate()
        return true
      } catch (err) {
        return false
      }
    }

    // 保存数据
    async function onSaveData() {
      // const { data } = await service.updateItem(id, dataItem)
      // assign(dataItem, data)
    }

    fetchDataFromServer()

    return {
      loading,
      dataItem,
      dataSource,
      validateInfos,
      holdInfoColumns,
      onNewData,
      ...tableEdit
    }
  }
})
</script>

<style lang="less" scoped></style>
