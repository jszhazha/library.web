<template>
  <public-header />
  <div class="pbulic-main">
    <index-sider />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import publicHeader from '/@/views/frame/components/publicHeader'
import indexSider from './index-sider.vue'

export default defineComponent({
  components: { publicHeader, indexSider }
})
</script>

<style lang="less" scoped>
</style>