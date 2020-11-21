<template>
  <global-card title="馆藏信息">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <a-row>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="索书号">
            <a-input placeholder="请输入" :disabled="readonly" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :lg="9" class="pl-4 pr-4">
          <a-form-item label="存放位置">
            <a-input placeholder="请输入" :disabled="readonly" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <global-table class="m-4" :columns="holdInfoColumns" />
  </global-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import GlobalTable from "/@/components/GlobalTable.vue";
import { holdInfoColumns } from "./data/";

export default defineComponent({
  components: { GlobalTable },
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {
    return { holdInfoColumns };
  },
});
</script>


<style lang="less" scoped>
</style>