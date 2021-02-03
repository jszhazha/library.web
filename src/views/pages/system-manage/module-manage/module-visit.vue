<template>
  <GlobalTable :columns="tableColumns" :data-source="dataSource">
    <template #authorities="{ record }">
      <div>{{ record }}</div>
    </template>
  </GlobalTable>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { tableColumns } from './module-visit'
import service, { ModuleManage } from '/@/api/system-manage/module-manage'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const dataSource = ref<ModuleManage>()

    // 请求数据
    async function fetchDataFromServer() {
      try {
        const data= await service.getItemByName(props.name)
        console.log(data)
        // dataSource.value = data
      } catch (err) {
        message.error(`模块权限数据获取失败: ${err.msg}`)
      }
    }

    fetchDataFromServer()

    return {
      dataSource,
      tableColumns
    }
  }
})
</script>

<style lang="less" scoped></style>
