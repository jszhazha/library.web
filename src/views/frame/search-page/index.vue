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
  <div class="flex search-page-content">
    <div class="search-page-content-left">
      <search-list v-if="searchList.length" :data-source="searchList" :search-value="searchValue" />
      <search-empty v-else-if="!loading">
        {{ searchValue }}
      </search-empty>
      <!-- <div class="index-space-between index-middle search-page-content-footer">
        <div class="search-page-content-footer-button default-shadow">
          上一页
        </div>
        <div class="search-page-content-footer-button default-shadow">
          下一页
        </div>
      </div> -->
    </div>
    <div class="search-page-content-right">
      <search-hot :data-source="HotList" />
    </div>
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
import service, { Search, Hot } from '/@/api/search'
import searchList from './search-list.vue'
import searchHot from './search-hot.vue'
import searchEmpty from './search-empty.vue'

export default defineComponent({
  components: { InputSearch, searchList, searchEmpty, searchHot },
  setup() {
    const { currentRoute } = useRouter()

    const searchValue = ref<string>('')

    const searchList = ref<Search[]>([])

    const HotList = ref<Hot[]>([])

    const loading = ref<boolean>(false)

    const go = useGo()

    const page = ref<number>(0)

    // 按下 Enter 键
    function handleEnter(val: string) {
      val && go({ name: PageEnum.SEARCH_PAGE, query: { q: val } })
    }

    // 向服务器请求数据
    async function fetchSearchListFromServer() {
      try {
        const query = queryData()
        loading.value = true
        const { data } = await service.fecthList(query)
        searchList.value = data
      } catch (err) {
        message.error(err.msg)
      } finally {
        loading.value = false
      }
    }

    // 请求热搜词
    async function fetchHotListFromServer() {
      const { data } = await service.fecthHotList()
      HotList.value = data
    }

    // 获取搜索数据
    function queryData() {
      const keyword = unref(searchValue).replace(rules.whitespace, '').substr(0, 30)

      return { keyword, page: page.value, size: 10 }
    }

    // 路由发送变化
    async function routerChange() {
      if (unref(currentRoute).name !== PageEnum.SEARCH_PAGE) return

      searchValue.value = unref(currentRoute).query.q as string

      await fetchSearchListFromServer()

      await fetchHotListFromServer()
    }

    watchEffect(() => currentRoute.value && routerChange())

    return { config, loading, searchList, HotList, searchValue, handleEnter }
  }
})
</script>

<style lang="less" scoped>
.search-page {
  &-header {
    position: fixed;
    width: 100%;
    height: 60px;
    padding: 0 40px 0 90px;
    background: var(--theme-background);
    border-bottom: 1px solid #eee;
  }

  &-content {
    padding: 90px 0 0;

    &-left {
      width: 780px;
      padding: 0 40px 0 150px;
    }

    &-right {
      padding: 20px 0 0 80px;
    }

    &-footer {
      padding: 0 0 30px;

      &-button {
        padding: 8px 30px;
        cursor: pointer;
        border: 1px solid #dfe1e5;
        border-radius: 8px;
      }
    }
  }
}

.header-search {
  width: 675px;
  height: 40px;
}
</style>
