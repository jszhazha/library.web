<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlay-class-name="table-list-popover"
    :force-render="true" 
    :arrow-point-at-center="true"
    :default-visible="false"
  >
    <TooltipButton title="列设置">
      <SettingOutlined />
    </TooltipButton>
    

    <template #title>
      <div class="index-space-between pt-1 pb-1">
        <a-checkbox> 列设置 </a-checkbox>
        <div class="index-button">
          重置
        </div>
      </div>
    </template>
    <template #content>
      <a-checkbox-group
        v-model:value="checkedList"
        :options="options"
        @change="handleCheckboxChange"
      />
    </template>
  </a-popover>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Options, listSettingProps } from "/@/lib/props/tableProps";
import TooltipButton from "./TooltipButton.vue";

export default defineComponent({
  components: { TooltipButton },
  props: listSettingProps,
  setup(props) {
    // 多选选中的
    const checkedList = ref<string[]>([]);

    // 处理多选改变
    function handleCheckboxChange(list: string[]) {
      checkedList.value = list;
    }

    // 多选选项
    const options = computed(() => {
      return props.columns.map(
        (el): Options => {
          return {
            label: el.title as string,
            value: el.dataIndex as string,
          };
        }
      );
    });
    return { options, checkedList, handleCheckboxChange };
  },
});
</script>

<style lang="less" scoped>
</style>