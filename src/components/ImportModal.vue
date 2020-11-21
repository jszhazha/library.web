<template>
  <a-modal
    v-model:visible="visible"
    style="top: 50px;"
    :title="title"
    :width="width"
    :row-selection="rowSelection"
  >
    <div :style="{ height: browserSize.height - 250 + 'px' }">
      <global-table
        :columns="columns"
        :data-source="dataSource"
        :row-selection="rowSelection"
        :scroll="{ y: browserSize.height - 345, x: 1200 }"
      />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { importProps } from "/@/lib/props/ImportModal";
import { browserClient } from "/@/utils/elelment";

export default defineComponent({
  props: importProps,
  emits: ["on-instance"],
  setup(_props, { emit }) {
    // 视图大小
    const browserSize = ref<{ width?: number; height?: number }>({});
    // 对话框是否可见
    const visible = ref<boolean>(false);

    // 选择功能的配置
    const rowSelection = {
      fixed: true,
      onChange: () => console.log(1),
      onSelect: () => console.log(2),
      onSelectAll: () => console.log(3),
    };

    onMounted(() => (browserSize.value = browserClient()));

    // 打开对话框
    const openModal = () => (visible.value = true);

    emit("on-instance", { openModal });

    return { visible, browserSize, rowSelection };
  },
});
</script>

<style lang="less" scoped>
</style>
