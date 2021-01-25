<template>
  <a-select
    class="select-wrap"
    :disabled="inputReadonly"
    :placeholder="inputReadonly ? '' : placeholder"
  >
    <slot />
  </a-select>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, PropType, computed, toRefs } from 'vue'
import { injectDatapage } from '/@/lib/idata/data-page/methods/useDepend'

const useinputReadonly = (readonly: Ref<boolean>, isReadonly: Ref<boolean>) => {
  return computed(() => {
    const dataPage = injectDatapage()
    return readonly.value || (isReadonly.value && dataPage.readonly?.value)
  })
}

export default defineComponent({
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    isReadonly: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  emits: ['update:value'],
  setup(props) {
    const { readonly, isReadonly } = toRefs(props)

    const inputReadonly = useinputReadonly(readonly, isReadonly)

    return { inputReadonly }
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
