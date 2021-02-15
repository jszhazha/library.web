<template>
  <PublicHeader class="search-page-show-header">
    <template #left>
      <router-link to="/" class="index-middle ml-15">
        <img :src="config.logo" class="w-6 mr-4">
        <div class="header-title index-theme">
          {{ config.title }}
        </div>
      </router-link>
    </template>
  </PublicHeader>
  <div class="main">
    <div>{{ bookData.info.name }}</div>
    <div class="main-row">
      <div>
        <span class="main-row-title">作者</span>
        <span>{{ bookData.info.author }}</span>
      </div>
      <div>
        <span class="main-row-title">图书分类</span>
        <span>{{ bookData.info.bookCategory?.name }}</span>
      </div>
    </div>
    <div class="main-row">
      <div>
        <span class="main-row-title">出版社</span>
        <span>{{ bookData.info.publisher }}</span>
      </div>
      <div>
        <span class="main-row-title">价格</span>
        <span>{{ bookData.info.price }}</span>
      </div>
    </div>
    <div class="main-row">
      <div>
        <span class="main-row-title">ISBN</span>
        <span>{{ bookData.info.isbn }}</span>
      </div>
      <div>
        <span class="main-row-title">出版时间</span>
        <span>{{ bookData.info.publicationTime }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, unref } from 'vue'
import { useRouter } from 'vue-router'
import service from '/@/api/anonymous'
import config from '/@/config'

export default defineComponent({
  setup() {
    const { currentRoute } = useRouter()

    const bookData = reactive({ info: {}, detail: {} })

    async function fetchDataByService() {
      const { params } = unref(currentRoute)
      const id = parseInt(params.id as string)
      const { data } = await service.fecthBookByAny(id)
      bookData.info = data.book
      bookData.detail = data.detail
      console.log(bookData)
    }

    fetchDataByService()

    return { config, bookData }
  }
})
</script>

<style lang="less" scoped>
.search-page-show-header {
  height: 60px;
  padding: 0 40px 0 90px;
}

.header-title {
  font-size: 20px;
  color: var(--theme-font-color);
}

.main {
  max-width: 1000px;
  margin: 20px auto 0;

  &-row {
    display: flex;
    align-items: center;
    margin: 10px 0 0;

    &-title {
      display: inline-block;
      width: 80px;

      &::after {
        margin: 0 5px 0 2px;
        content: ':';
      }
    }
  }
}
</style>
