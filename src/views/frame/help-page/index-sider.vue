<template>
  <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @select="handleSelect">
    <a-menu-item v-for="item in dataSource" :key="item.id">
      {{ item.title }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import type { ProblemManage } from '/@/api/basis-manage/problem-manage'
import { defineComponent, PropType, ref, watch } from 'vue'
export default defineComponent({
  props: {
    dataSource: {
      type: Array as PropType<ProblemManage[]>,
      default: () => {
        return []
      }
    }
  },
  emits: ['on-select'],
  setup(props, { emit }) {
    const selectedKeys = ref<number[]>([])

    // 处理选中
    function handleSelect({ key }: { key: number }) {
      const value = props.dataSource.find((el) => el.id === key)
      emit('on-select', value)
    }

    watch(
      () => props.dataSource,
      (data: ProblemManage[]) => {
        const [value] = data
        if (value) {
          selectedKeys.value = [value.id!]
          emit('on-select', value)
        }
      }
    )

    return { selectedKeys, handleSelect }
  }
})
</script>

<style lang="less" scoped>
</style>
