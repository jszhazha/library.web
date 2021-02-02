<template>
  <GlobalTable :columns="tableColumns" />
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { tableColumns } from './module-visit'

export default defineComponent({
  setup() {

    return {
      tableColumns
    }
  }
})
</script>

<style lang="less" scoped></style>
