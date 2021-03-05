<template>
  <Preview class="index-content" :value="selectData.text" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Preview from '/@/components/PublicEditor/src/Preview'
export default defineComponent({
  components: { Preview },
  props: {
    selectData: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>

<style lang="less" scoped>
</style>
