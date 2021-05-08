<template>
  <GlobalCard title="馆藏信息">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <a-row>
        <a-col v-if="mode === 0" :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="索书号">
            <InputWrap v-model:value="dataItem.searchCode" :is-readonly="false" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="存放位置" :required="mode === 1">
            <InputWrap v-model:value="dataItem.address" :is-readonly="false" />
          </a-form-item>
        </a-col>
        <a-col class="pl-4 pr-4" flex="auto">
          <div class="index-button-right">
            <a-button
              v-if="mode === MixinPageMode.edit"
              type="primary"
              :loading="loading.add"
              :disabled="disabled"
              @click="onNewData"
            >
              添加
            </a-button>
            <a-button
              v-if="mode === MixinPageMode.view"
              type="primary"
              @click="fetchDataFromServer"
            >
              查询
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
          未借阅
        </a-tag>
        <a-tag v-else-if="text === 'OUT_LIBRARY'" color="processing">
          被借阅
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
            <span @click="handleClickDelete(record)">删除</span>
          </div>
        </div>
      </template>
    </GlobalTable>
    <PaginationWrap
      v-model:current="current"
      class="index-right pr-4 pt-5"
      :total="totalElements"
      @change="onPageChange"
    />
  </GlobalCard>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, computed } from 'vue'
import { holdInfoColumns } from './data-page'
import service, { BookDetail } from '/@/api/book-manage/book-detail'
import { useDeleteModal } from '/@/hooks/web/useDeleteModal'
import { usePagination } from '/@/hooks/web/usePagination'
import { useTableEdit } from '/@/hooks/web/useTableEdit'
import { PageMode } from '/@/utils/helper/breadcrumb'
import { message } from 'ant-design-vue'
import { isEmpty } from '/@/utils/is'

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
    const dataSource = ref<BookDetail[]>([])

    // 输入数据
    const dataItem = reactive<BookDetail>({ bookId: props.bookId })

    // 加载
    const loading = reactive<{ add?: boolean; table?: boolean }>({})

    // table 编辑
    const tableEdit = useTableEdit({ onSaveData })

    // 总数据
    const totalElements = ref<number>(0)

    // 页面发生变换
    const pagination = usePagination()

    // 页面发生变化
    const onPageChange = () => fetchDataFromServer()

    // 禁用标志
    const disabled = computed(() => !isEmpty(dataItem.address))

    // 请求列表数据
    async function fetchDataFromServer() {
      try {
        loading.table = true
        const { page, size } = pagination.getPagination()
        const { data } = await service.fecthList({ page, size, sort: '', ...dataItem })
        dataSource.value = data.content
        totalElements.value = data.totalElements
      } catch (err) {
        message.error(`数据获取失败: ${err.msg}`)
      } finally {
        loading.table = false
      }
    }

    // 新增数据
    async function onNewData() {
      try {
        loading.add = true
        await service.saveNewItem(dataItem)
        dataItem.address = ''
        fetchDataFromServer()
      } catch (err) {
        message.error(`新增数据失败: ${err.msg}`)
      } finally {
        loading.add = false
      }
    }

    // 保存数据
    async function onSaveData({ id }: BookDetail, contrast: BookDetail) {
      try {
        loading.table = true
        await service.updateItem(id as number, contrast)
        fetchDataFromServer()
      } catch (err) {
        message.error(`保存数据失败: ${err.msg}`)
      }
    }

    // 数据删除
    async function handleClickDelete({ id }: BookDetail) {
      useDeleteModal(async () => {
        await service.deleteItemById(id as number)
        fetchDataFromServer()
      })
    }

    fetchDataFromServer()

    return {
      loading,
      disabled,
      dataItem,
      dataSource,
      totalElements,
      holdInfoColumns,
      handleClickDelete,
      fetchDataFromServer,
      onNewData,
      onPageChange,
      ...tableEdit,
      ...pagination
    }
  }
})
</script>

<style lang="less" scoped></style>
