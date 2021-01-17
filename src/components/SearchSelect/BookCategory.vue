<template>
  <SelectWrap :value="selectData" @on-change="handleChange" @on-search="handleSearch">
    <a-select-option v-for="item in options" :key="item.id" :value="item.name">
      {{ item.name }} ({{ item.code }})
    </a-select-option>
  </SelectWrap>
</template>

<script lang="ts">
import type { PagerQueryData } from "/@/lib/http/axios/types"
import { message } from "ant-design-vue"
import { assign } from "lodash-es"
import { defineComponent, PropType, ref, computed, toRefs } from "vue"
import service, { BookCategory } from "/@/api/book-manage/book-category"

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    bookCategory: {
      type: Object as PropType<BookCategory>,
      default: () => {
        return {}
      }
    }
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const { bookCategory } = toRefs(props)
    const options = ref<BookCategory[]>([])

    // 选中数据
    const selectData = computed(() => {
      if (bookCategory.value.id) {
        return `${bookCategory.value.name} (${bookCategory.value.code})`
      }
      return undefined
    })

    // 加载数据
    async function loadData(query: PagerQueryData) {
      try {
        const { data } = await service.fecthList(query)
        options.value = data.content
      } catch (err) {
        message.error("加载数据失败")
      }
    }
    // 使用 loadData
    async function useLoadData(params = {}) {
      await loadData(assign({ page: 0, size: 10, sort: "" }, params))
    }
    // 处理搜索
    async function handleSearch(value: string, callback: () => void) {
      await useLoadData(value ? { name: value } : {})
      callback()
    }

    // 处理选中
    function handleChange(value: number) {
      emit("update:value", value)
    }

    return { options, selectData, handleSearch, handleChange }
  }
})
</script>

<style lang="less" scoped></style>
