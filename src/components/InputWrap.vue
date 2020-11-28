<template>
  <a-input
    v-model:value="currentValue"
    class="input-wrap"
    :disabled="readonly"
    :placeholder="readonly ? '' : placeholder"
    @change="onChange"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, unref, watch } from "vue";

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
    const currentValue = ref<string>("");

    // 内容发送变化触发
    const onChange = () => {
      emit("update:value", currentValue.value);
    };

    watch(
      () => props.value,
      (newValue) => {
        if (unref(currentValue) === newValue) {
          return;
        }
        currentValue.value = newValue;
      },
      { immediate: true }
    );

    return { currentValue, onChange };
  },
});
</script>


<style lang="less" scoped>
.input-wrap[disabled] {
  color: rgba(0, 0, 0, 0.65);
  cursor: default;
}
</style>
