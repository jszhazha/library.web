<template>
  <PublicHeader>
    <template #left>
      <img :src="config.logo" class="config-logo" @click="handleTitleClick">
      <div>
        <!-- <span class="config-title" @click="handleTitleClick"></span>
        <a-divider type="vertical" /> -->
        <span class="fs-4">帮 助 中 心</span>
      </div>
    </template>
  </PublicHeader>
  <div class="flex pt-6 help-main">
    <div v-if="dataSource.length" class="help-sider">
      <index-sider :data-source="dataSource" />
    </div>
    <div />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import config from '/@/config'
import { PageEnum } from '/@/enums/pageEnum'
import { useGo } from '/@/hooks/web/usePage'
import indexSider from './index-sider.vue'
import service from '/@/api/anonymous'

export default defineComponent({
  components: { indexSider },
  setup() {
    const go = useGo()

    const dataSource = ref<unknown[]>([])

    // 点击文字页面跳转
    const handleTitleClick = () => go({ name: PageEnum.INDEX_PAGE })

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      const query = { sort: 'sortValue,desc' }
      const { data } = await service.fecthProblemByAny(query)
      dataSource.value = data.content
    }

    fetchDataFromServer()

    return { config, dataSource, handleTitleClick }
  }
})
</script>

<style lang="less" scoped>
.config {
  &-logo {
    width: 20px;
    margin: 0 20px;
    cursor: pointer;
  }

  &-title {
    margin: 0 0 0 20px;
    font-size: 18px;
    color: var(--theme-font-color);
    cursor: pointer;
  }
}

.help {
  &-main {
    max-width: 1000px;
    margin: 0 auto;
  }

  &-sider {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
  }
}
</style>
