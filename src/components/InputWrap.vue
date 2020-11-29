<template>
  <a-input
    v-model:value="currentValue"
    class="input-wrap"
    :disabled="inputReadonly"
    :placeholder="inputReadonly ? '' : placeholder"
    @change="onChange"
  />
</template>

<script lang="ts">
import type { Ref } from "vue"
import { defineComponent, PropType, ref, unref, watch, computed, toRefs } from "vue"
import { injectDatapage } from "/@/utils/dataPage/methods/useProvince"

const useinputReadonly = (readonly: Ref<boolean>) => {
  return computed(() => {
    const dataPage = injectDatapage()
    return readonly.value || dataPage.readonly
  })
}

export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      default: "",
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const currentValue = ref<string>("")
    const { readonly } = toRefs(props)

    // 内容发送变化触发
    const onChange = () => emit("update:value", currentValue.value)

    const inputReadonly = useinputReadonly(readonly)

    watch(
      () => props.value,
      (newValue) => {
        if (unref(currentValue) === newValue) return
        currentValue.value = newValue
      },
      { immediate: true }
    )

    return { currentValue, inputReadonly, onChange }
  },
})
</script>


<style lang="less" scoped>
.input-wrap[disabled] {
  color: rgba(0, 0, 0, 0.65);
  cursor: default;
}
</style>
