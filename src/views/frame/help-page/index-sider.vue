<template>
  <div v-for="item in dataSource" :key="item.id" class="help-row">
    {{ item.title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    dataSource: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
})
</script>

<style lang="less" scoped>
.help-row {
  width: 260px;
  padding: 10px 20px;
  background: #e8f0fe;
  border-radius: 25px;

  &:not(:last-of-type){
    margin-bottom: 20px;
  }
}
</style>
