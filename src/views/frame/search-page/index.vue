<template>
  <PublicHeader class="search-page-header">
    <template #left>
      <router-link to="/">
        <img :src="config.logo" class="w-8 mr-4">
      </router-link>
      <input-search
        v-model:value="searchValue"
        class="header-search"
        :prefix="true"
        :suffix="true"
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
    <div class="search-page-main">
      <search-list v-if="dataSource.length" :data-source="dataSource" />
      <search-empty v-else-if="!loading">
        {{ searchValue }}
      </search-empty>
    </div>
    <div />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { PageEnum } from '/@/enums/pageEnum'
import { useGo } from '/@/hooks/web/usePage'
import { InputSearch } from '/@/lib/UI/'
import { rules } from '/@/utils/regExp'
import { message } from 'ant-design-vue'
import config from '/@/config'
import service, { Search } from '/@/api/search'
import searchList from './search-list.vue'
import searchEmpty from './search-empty.vue'

export default defineComponent({
  components: { InputSearch, searchList, searchEmpty },
  setup() {
    const { currentRoute } = useRouter()

    const searchValue = ref<string>('')

    const dataSource = ref<Search[]>([])

    const loading = ref<boolean>(false)

    const go = useGo()

    // 按下 Enter 键
    function handleEnter(val: string) {
      val && go({ name: PageEnum.SEARCH_PAGE, query: { q: val } })
    }

    // 向服务器请求数据
    async function fetchDataFromServer() {
      try {
        const query = queryData()
        loading.value = true
        const { data } = await service.fecthList(query)
        dataSource.value = data
      } catch (err) {
        message.error(err.msg)
      } finally {
        loading.value = false
      }
    }

    // 获取搜索数据
    function queryData() {
      const keyword = unref(searchValue).replace(rules.whitespace, '').substr(0, 30)

      return { keyword, page: 0, size: 10 }
    }

    // 路由发送变化
    function routerChange() {
      if (unref(currentRoute).name !== PageEnum.SEARCH_PAGE) return

      searchValue.value = unref(currentRoute).query.q as string
      fetchDataFromServer()
    }

    watchEffect(() => currentRoute.value && routerChange())

    return { config, loading, dataSource, searchValue, handleEnter }
  }
})
</script>

<style lang="less" scoped>
.search-page {
  &-header {
    height: 60px;
    padding: 0 40px 0 110px;
    border-bottom: 1px solid #eee;
  }

  &-main {
    width: 800px;
    padding: 30px 0 0 160px;
  }
}

.header-search {
  width: 675px;
  height: 40px;
}
</style>
