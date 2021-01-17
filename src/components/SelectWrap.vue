<template>
  <a-select
    show-search
    class="select-wrap"
    :disabled="selectReadonly"
    :placeholder="selectReadonly ? '' : placeholder"
    :filter-option="false"
    :not-found-content="null"
    :get-popup-container="(triggerNode) => triggerNode.parentNode"
    @change="onChange"
    @search="onSearch"
  >
    <template #suffixIcon>
      <LoadingOutlined v-if="loading" />
      <SearchOutlined v-else />
    </template>
    <slot />
  </a-select>
</template>

<script lang="ts">
import { ref, Ref } from "vue"
import { debounce } from "lodash-es"
import { defineComponent, PropType, computed, toRefs } from "vue"
import { injectDatapage } from "/@/lib/idata/data-page/methods/useDepend"
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons-vue"

const useSelectReadonly = (readonly: Ref<boolean>) => {
  return computed(() => {
    const dataPage = injectDatapage()
    return readonly.value || dataPage.readonly?.value
  })
}

export default defineComponent({
  components: { SearchOutlined, LoadingOutlined },
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入"
    }
  },
  emits: ["on-change", "on-search"],
  setup(props, { emit }) {
    const { readonly } = toRefs(props)
    const loading = ref<boolean>(false)
    // 内容发送变化触发
    const onChange = (_value: string, { key }: { key: number }) => {
      emit("on-change", key)
    }
    // 设置加载
    const setLoadState = (state: boolean) => (loading.value = state)
    // 处理加载
    const onSearch = (value: string) => {
      value && (setLoadState(true), useDebugger(value))
    }
    const useDebugger = debounce(
      (value: string) => emit("on-search", value, () => setLoadState(false)),
      1000
    )
    const selectReadonly = useSelectReadonly(readonly)
    // watch(
    //   () => props.value,
    //   (newValue) => {
    //     console.log(newValue)
    //     // if (unref(selectValue) === newValue) return
    //     // selectValue.value = newValue
    //   },
    //   { immediate: true }
    // )
    return { selectReadonly, loading, onChange, onSearch }
  }
})
</script>

<style lang="less" scoped>
.select-wrap {
  min-width: 181.8px;

  ::v-deep(.ant-select-selector) {
    color: rgba(0, 0, 0, 0.65) !important ;
    cursor: default !important;

    input {
      cursor: default !important;
    }

    .ant-select-selection-item {
      user-select: auto;
    }
  }

  ::v-deep(.ant-select-arrow) {
    cursor: default !important;
  }
}
</style>
