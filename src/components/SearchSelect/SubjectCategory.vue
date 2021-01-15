<template>
  <SelectWrap @on-change="handleChange">
    <a-select-option
      v-for="item in options"
      :key="item.id"
      :value="item.name + item.code"
    >
      {{ item.name }} ({{ item.code }})
    </a-select-option>
  </SelectWrap>
</template>

<script lang="ts">
import type { PagerQueryData } from "/@/lib/http/axios/types"
import { message } from "ant-design-vue"
import { assign } from "lodash-es"
import { defineComponent, ref } from "vue"
import service, { SubjectCategory } from "/@/api/book-manage/subject-category"

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: undefined
    }
  },
  emits: ["update:value"],
  setup(_props, { emit }) {
    const options = ref<SubjectCategory[]>([])

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
      await loadData(assign({ page: 0, size: 1000, sort: "" }, params))
    }

    // 内容改变
    function handleChange(key: number) {
      emit("update:value", key)
    }

    useLoadData()

    return { options, handleChange }
  }
})
</script>

<style lang="less" scoped></style>
