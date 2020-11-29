<template>
  <GlobalCard title="馆藏信息">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <a-row>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="索书号">
            <InputWrap />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="存放位置">
            <InputWrap />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <GlobalTable class="m-4" :columns="holdInfoColumns" />
  </GlobalCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { holdInfoColumns } from "./data-page"

export default defineComponent({
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {
    return { holdInfoColumns }
  },
})
</script>


<style lang="less" scoped>
</style>