<template>
  <a-form :label-col="{ flex: '80px' }" :wrapper-col="{ flex: 1 }">
    <a-row type="flex">
      <a-col :xs="24" :lg="12">
        <a-form-item label="权限项名称">
          <a-input class="flex-item" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="12">
        <a-form-item label="权限项">
          <a-select v-model:value="dataItem.module" show-search :option-filter-prop="'key'">
            <a-select-option v-for="(value, key) in authorityList" :key="value" :value="key">
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <GlobalTable :columns="tableColumns" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import service, { Authority } from '/@/api/authority'
import { tableColumns } from './module-visit'

export default defineComponent({
  setup() {
    // 权限列表
    const authorityList = ref<Authority>()

    const dataItem = reactive({})

    // 获取权限列表数据
    async function fetchAuthorityFromServer() {
      try {
        const { data } = await service.fecthList()
        authorityList.value = data
      } catch (err) {}
    }

    fetchAuthorityFromServer()

    return {
      dataItem,
      tableColumns,
      authorityList
    }
  }
})
</script>

<style lang="less" scoped></style>
