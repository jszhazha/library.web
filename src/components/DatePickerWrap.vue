<template>
  <a-date-picker
    v-model:value="inputValue"
    class="date-picker-wrap"
    :disabled="inputReadonly"
    :get-calendar-container="(triggerNode) => triggerNode.parentNode"
    :placeholder="inputReadonly ? '' : placeholder"
    :value-format="'YYYY年MM月DD日'"
    :format="'YYYY年MM月DD日'"
    :show-today="false"
    @change="onChange"
  />
</template>

<script lang="ts">
import type { Ref } from "vue"
import { defineComponent, PropType, ref, unref, watch, computed, toRefs } from "vue"
import { injectDatapage } from "/@/lib/idata/data-page/methods/useDepend"

const useinputReadonly = (readonly: Ref<boolean>) => {
  return computed(() => {
    const dataPage = injectDatapage()
    return readonly.value || dataPage.readonly?.value
  })
}

export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      default: undefined
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
  emits: ["update:value"],
  setup(props, { emit }) {
    const inputValue = ref<string>("")
    const { readonly } = toRefs(props)

    // 内容发送变化触发
    const onChange = () => emit("update:value", inputValue.value)

    const inputReadonly = useinputReadonly(readonly)

    watch(
      () => props.value,
      (newValue) => {
        if (unref(inputValue) === newValue) return
        inputValue.value = newValue
      },
      { immediate: true }
    )

    return { inputValue, inputReadonly, onChange }
  }
})
</script>

<style lang="less" scoped>
.date-picker-wrap {
  width: 100%;

  ::v-deep(.ant-input[disabled]) {
    color: rgba(0, 0, 0, 0.65);
    cursor: default;
  }
}
</style>
