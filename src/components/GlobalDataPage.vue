<template>
  <div class="global-data-page">
    <div class="scrollbar content">
      <slot />
    </div>
    <div class="index-footer-block">
      <slot name="footer-block" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>


<style lang="less">
.global-data-page{
  display: flex;
  flex-direction: column;
  height: 100%;

  .content{
    flex: 1;
    height: 0;
    overflow: auto;
  }
}
</style>
