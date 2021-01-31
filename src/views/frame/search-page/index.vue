<template>
  <PublicHeader class="search-page">
    <template #left>
      <router-link to="/">
        <img :src="config.logo" class="w-8 mr-4">
      </router-link>
      <input-search
        v-model:value="searchValue"
        class="header-search"
        :prefix="true"
        :suffix="false"
        @on-enter="handleEnter"
      />
    </template>
    <template #right>
      <div class="header-setting">
        设置
      </div>
    </template>
  </PublicHeader>
  <div class="flex">
    <searchList :data-source="dataSource" class="search-content" />
    <div />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import config from '/@/config'
import { PageEnum } from '/@/enums/pageEnum'
import { useGo } from '/@/hooks/web/usePage'
import { InputSearch } from '/@/lib/UI/'
import { rules } from '/@/utils/regExp'
import service, { Search } from '/@/api/search'
import searchList from './search-list.vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: { InputSearch, searchList },
  setup() {
    const { currentRoute } = useRouter()

    const searchValue = ref<string>('')

    const dataSource = ref<Search[]>()

    const go = useGo()

    // 按下 Enter 键
    function handleEnter(val: string) {
      val && go({ name: PageEnum.SEARCH_PAGE, query: { q: val } })
    }

    // 向服务器请求数据
    async function fetchDataFromServer() {
      const query = {
        keyword: searchValue.value.replace(rules.whitespace, ''),
        page: 0,
        size: 10
      }
      try {
        const { data } = await service.fecthList(query)
        dataSource.value = data
      } catch (err) {
        message.error(`数据获取失败: ${err.msg}`)
      }
    }

    watch(
      () => currentRoute.value,
      (val) => {
        searchValue.value = val.query.q as string
        fetchDataFromServer()
      },
      { immediate: true }
    )

    return { config, dataSource, searchValue, handleEnter }
  }
})
</script>

<style lang="less" scoped>
.search-page {
  height: 60px;
}

.search-content{
  width: 800px;
}

.header-search {
  width: 700px;
  height: 44px;
}
</style>
