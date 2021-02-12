<template>
  <SearchOutlined class="pr-2" @click="handleSearchClick" />
  <a-select
    class="no-border layout-header-search w-200"
    placeholder="搜索"
    :show-search="true"
    :show-arrow="false"
    :filter-option="handleFilterSelect"
    :allow-clear="true"
    @select="handleSelect"
    @blur="handleBlur"
  >
    <a-select-option
      v-for="item in flatMenus"
      :key="item.name"
      :value="item.name"
      :title="item.meta.title"
    >
      {{ item.meta.title }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getFilterIconFlatMenus } from '/@/utils/helper/menu'
import { useGo } from '/@/hooks/web/usePage'
import PinYin from 'word-pinyin'

export default defineComponent({
  setup() {
    const isSearch = ref<boolean>(false)

    const flatMenus = getFilterIconFlatMenus()

    const go = useGo()

    // 是否根据输入项进行筛选
    function handleFilterSelect(inputValue: string, option: { title: string }) {
      const value = PinYin.getPinyin(inputValue).replace(/\s+/g, '')
      const target = PinYin.getPinyin(option.title).replace(/\s+/g, '')
      return new RegExp(value).test(target)
    }

    // 被选中时调用，参数为选中项的 value (或 key) 值
    function handleSelect(value: string) {
      go({ name: value })
    }

    // 处理菜单点击
    function handleSearchClick() {
      isSearch.value = true
    }

    // 处理失去焦点
    function handleBlur() {
      isSearch.value = false
    }

    return { isSearch, flatMenus, handleFilterSelect, handleSelect, handleSearchClick, handleBlur }
  }
})
</script>

<style lang="less" scoped></style>
