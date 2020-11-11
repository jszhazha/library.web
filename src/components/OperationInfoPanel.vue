<template>
  <div class="index-card">
    <a-row>
      <a-col>创建者:</a-col>
      <a-col>创建时间:</a-col>
    </a-row>
    <a-row>
      <a-col>修改者:</a-col>
      <a-col>修改时间:</a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
  },
});
</script>


<style lang="less">

</style>
