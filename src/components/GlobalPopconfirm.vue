<template>
  <popconfirm
    title="你确定删除该数据吗?"
    ok-text="确定"
    cancel-text="取消"
    placement="topRight"
    :get-popup-container="(trigger) => trigger.parentNode"
  >
    <template #icon>
      <QuestionCircleFilled style="color: #f5222d;" />
    </template>
    <slot />
  </popconfirm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Popconfirm } from "ant-design-vue";
import { QuestionCircleFilled } from "@ant-design/icons-vue";

export default defineComponent({
  components: { Popconfirm, QuestionCircleFilled },
  setup() {
    return {};
  },
});
</script>

<style>
</style>