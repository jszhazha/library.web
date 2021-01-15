<template>
  <a-select
    show-search
    class="select-wrap"
    :disabled="selectReadonly"
    :placeholder="selectReadonly ? '' : placeholder"
    @change="onChange"
  >
    <slot />
  </a-select>
</template>

<script lang="ts">
import type { Ref } from "vue"
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
  emits: ["on-change"],
  setup(props, { emit }) {
    const { readonly } = toRefs(props)

    // 内容发送变化触发
    const onChange = (_value: string, { key }: { key: number }) => {
      emit("on-change", key)
    }

    const selectReadonly = useSelectReadonly(readonly)

    return { selectReadonly, onChange }
  }
})
</script>

<style lang="less" scoped>
.select-wrap {
  ::v-deep(.ant-select-selector) {
    color: rgba(0, 0, 0, 0.65);
    cursor: default !important;

    input {
      cursor: default !important;
    }
  }
}
</style>
