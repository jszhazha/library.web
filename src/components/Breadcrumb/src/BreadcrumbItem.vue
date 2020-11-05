<template>
  <div class="breadcrumb-item">
    <span>
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

  &:last-of-type &-separator {
    display: none;
  }
}
</style>