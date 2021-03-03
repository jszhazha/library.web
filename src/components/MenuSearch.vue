<template>
  <SearchOutlined class="pr-2" @click="handleSearchClick" />
  <a-select
    :style="selectStyle"
    class="no-border menu-search-select"
    placeholder="搜索"
    :show-search="true"
    :show-arrow="false"
    :filter-option="handleFilterSelect"
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
import { computed, defineComponent, ref, unref } from 'vue'
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

    const selectStyle = computed(() => {
      return {
        width: unref(isSearch) ? '200px' : '0px'
      }
    })

    return {
      flatMenus,
      selectStyle,
      handleBlur,
      handleSelect,
      handleSearchClick,
      handleFilterSelect
    }
  }
})
</script>

<style lang="less" scoped>
.menu-search-select {
  transition: width 0.5s ease;

  ::v-deep(.ant-select-selector) {
    padding: 0 !important;

    .ant-select-selection-search {
      inset: 0;
    }
  }
}
</style>
