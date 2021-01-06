<template>
  <a-select
    show-search
    class="select-wrap"
    :disabled="selectReadonly"
    :placeholder="selectReadonly ? '' : placeholder"
    :filter-option="false"
    :loading="loading"
    @change="onChange"
    @search="onSearch"
  >
    <slot />
  </a-select>
</template>

<script lang="ts">
import { ref, Ref } from "vue"
import { debounce } from "lodash-es"
import { defineComponent, PropType, computed, toRefs } from "vue"
import { injectDatapage } from "/@/lib/idata/data-page/methods/useDepend"

const useSelectReadonly = (readonly: Ref<boolean>) => {
  return computed(() => {
    const dataPage = injectDatapage()
    return readonly.value || dataPage.readonly?.value
  })
}

export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      default: ""
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入"
    }
  },
  emits: ["update:value", "on-search"],
  setup(props, { emit }) {
    const { readonly } = toRefs(props)
    const loading = ref<boolean>(false)

    // 内容发送变化触发
    const onChange = (_value: string, { key }: { key: number }) => {
      emit("update:value", key)
    }

    // 设置加载
    const setLoadState = (state: boolean) => (loading.value = state)

    // 处理加载
    const onSearch = (value: string) => {
      setLoadState(true)
      useDebugger(value)
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
.select-wrap[disabled] {
  color: rgba(0, 0, 0, 0.65);
  cursor: default;
}
</style>
