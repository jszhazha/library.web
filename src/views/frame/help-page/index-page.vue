<template>
  <div class="help-wrap">
    <PublicHeader class="help-header">
      <template #left>
        <img :src="config.logo" class="config-logo" @click="handleTitleClick">
        <div>
          <span class="config-title index-theme" @click="handleTitleClick">
            {{ config.title }}
          </span>
        </div>
      </template>
    </PublicHeader>
    <div class="help-main">
      <index-sider class="help-main-sider" :data-source="dataSource" @on-select="handleSelect" />
      <index-content class="help-main-content scrollbar" :select-data="selectData" />
    </div>
  </div>
</template>

<script lang="ts">
import type { ProblemManage } from '/@/api/basis-manage/problem-manage'
import { defineComponent, ref } from 'vue'
import config from '/@/config'
import { PageEnum } from '/@/enums/pageEnum'
import { useGo } from '/@/hooks/web/usePage'
import indexSider from './index-sider.vue'
import indexContent from './index-content.vue'
import service from '/@/api/anonymous'

export default defineComponent({
  components: { indexSider, indexContent },
  setup() {
    const go = useGo()

    const dataSource = ref<ProblemManage[]>([])

    const selectData = ref<ProblemManage>({})

    // 点击文字页面跳转
    const handleTitleClick = () => go({ name: PageEnum.INDEX_PAGE })

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      const query = { sort: 'sortValue,desc' }
      const { data } = await service.fecthProblemByAny(query)
      dataSource.value = data.content
    }

    // 处理选中
    function handleSelect(item: ProblemManage) {
      selectData.value = item
    }

    fetchDataFromServer()

    return { config, dataSource, selectData, handleTitleClick, handleSelect }
  }
})
</script>

<style lang="less" scoped>
.help-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.help-header {
  border-bottom: 1px solid #f0f0f0;
}

.config {
  &-logo {
    width: 20px;
    margin: 0 10px 0 20px;
    cursor: pointer;
  }

  &-title {
    padding: 0 20px 0 0;
    margin: 0 20px 0 0;
    font-size: 18px;
    color: var(--theme-font-color);
    cursor: pointer;
  }
}

.help-main {
  flex: 1;
  display: flex;
  height: 0;
  background: #f3f5fb;

  &-sider {
    width: 260px;
  }

  &-content {
    flex: 1;
    margin: 16px;
    overflow: auto;
    background: #fff;
    border-radius: 10px;
  }
}
</style>
