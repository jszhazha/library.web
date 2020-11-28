<template>
  <Tooltip v-model:visible="visible">
    <template #title>
      <span>{{ title }}</span>
    </template>
    <div class="tooltip-button" @click="onClick">
      <slot />
    </div>
  </Tooltip>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue"
import { Tooltip } from "ant-design-vue"

export default defineComponent({
  components: { Tooltip },
  props: {
    title: {
      type: String as PropType<string>,
      default: "",
    },
  },
  emits: ["on-click"],
  setup(_props, { emit }) {
    // 点击按键触发
    function onClick() {
      visible.value = false
      emit("on-click")
    }
    const visible = ref<boolean>(false)
    return {
      visible,
      onClick,
    }
  },
})
</script>

<style lang="less" scoped>
.tooltip-button {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    color: #1890ff;
  }
}
</style>