<template>
  <GlobalTable :columns="tableColumns" :data-source="dataSource">
    <template #authorities="{ record }">
      <a-tag v-for="item in record.authorities" :key="item" class="mb-2">
        {{ item }}
      </a-tag>
    </template>
  </GlobalTable>
  <module-add-modal :name="name" />
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { tableColumns } from './module-visit'
import service, { ModuleManage } from '/@/api/system-manage/module-manage'
import moduleAddModal from './module-add-modal.vue'

export default defineComponent({
  components: { moduleAddModal },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const dataSource = ref<ModuleManage[]>()

    // 请求数据
    async function fetchDataFromServer() {
      try {
        const query = { name: props.name }
        const { data } = await service.fecthList(query)
        dataSource.value = dataParse(data.content)
        console.log(data)
        // dataSource.value = data
      } catch (err) {
        message.error(`模块权限数据获取失败: ${err.msg}`)
      }
    }

    // 数据解析
    function dataParse(data: ModuleManage[]) {
      return data.map((el) => {
        return {
          ...el,
          authorities: JSON.parse(el.authorities!)
        }
      })
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
