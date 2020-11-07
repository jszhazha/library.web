<template>
  <div class="breadcrumb-item">
    <span class="breadcrumb-item-content">
      <slot />
    </span>
    <span class="breadcrumb-item-separator">{{ separator }}</span>
  </div>
</template>

<script lang="ts" >
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const parent = inject("breadcrumb") as { separator: string };

    return {
      separator: parent.separator,
    };
  },
});
</script>

<style lang="less" scoped>
.breadcrumb-item {
  font-size: 14px;

  &-separator {
    margin: 0 9px;
  }

  &:not(:last-of-type) &-content {
    font-weight: 600;
    color: #000;
    cursor: pointer;
  }

  // &:not(:last-of-type) &-content:hover {
  //   color: #1890ff;
  // }

  &:last-of-type &-separator {
    display: none;
  }
}
</style>