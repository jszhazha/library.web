<template>
  <div>
    <select-search
      v-model:value="selectData"
      :filter-option="false"
      :not-found-content="null"
      :placeholder="placeholder"
      @on-change="handleChange"
      @on-search="handleSearch"
      @on-focus="onFocus"
    >
      <a-select-option v-for="item in options" :key="item.id" :value="item.name">
        {{ item.name }} ({{ item.code }})
      </a-select-option>
    </select-search>
  </div>
</template>

<script lang="ts">
import type { PagerQueryData } from '/@/lib/http/axios/types'
import { message } from 'ant-design-vue'
import { assign } from 'lodash-es'
import { defineComponent, PropType, ref, watch } from 'vue'
import service, { BookCategory } from '/@/api/book-manage/book-category'
import { isNumber } from '/@/utils/is'
import SelectSearch from './SelectSearch.vue'

export default defineComponent({
  components: { SelectSearch },
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    bookCategory: {
      type: Object as PropType<BookCategory>,
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  emits: ['update:value', 'on-focus'],
  setup(props, { emit }) {
    const options = ref<BookCategory[]>([])

    // 选中数据
    const selectData = ref<string | undefined>()

    // 获取焦点
    const onFocus = () => emit('on-focus')

    // 加载数据
    async function loadData(query: PagerQueryData) {
      try {
        const { data } = await service.fecthList(query)
        options.value = data.content
      } catch (err) {
        message.error('加载数据失败')
      }
    }
    // 使用 loadData
    async function useLoadData(params = {}) {
      await loadData(assign({ page: 0, size: 10, sort: '' }, params))
    }
    // 处理搜索
    async function handleSearch(value = '', callback: Callback) {
      await useLoadData(value ? { name: value } : {})
      callback()
    }

    // 处理选中
    function handleChange(value: number) {
      emit('update:value', value)
    }

    watch(
      () => props.value,
      (value) => !isNumber(value) && (selectData.value = undefined)
    )

    watch(
      () => props.bookCategory,
      (value) => (selectData.value = value?.id ? `${value.name} (${value.code})` : undefined)
    )

    return { options, selectData, onFocus, handleSearch, handleChange }
  }
})
</script>

<style lang="less" scoped></style>
