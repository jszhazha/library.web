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
  <div class="search-page-show-middle">
    <div class="content index-middle">
      <router-link to="/">
        <Icon icon="ion:arrow-back-outline" size="22" class="icon index-center-middle" />
      </router-link>
      <span class="title">资源检索</span>
    </div>
  </div>
  <div class="main">
    <div class="main-row-title-name">
      {{ bookInfo.name }}
    </div>
    <div class="main-row">
      <span class="main-row-title">作 者</span>
      <span>{{ bookInfo.author }}</span>
    </div>
    <div class="main-row">
      <span class="main-row-title">图书分类</span>
      <span>{{ bookInfo.bookCategory?.name }}</span>
    </div>
    <div class="main-row">
      <span class="main-row-title">出版社</span>
      <span>{{ bookInfo.publisher }}</span>
    </div>
    <div class="main-row">
      <span class="main-row-title">价 格</span>
      <span>{{ bookInfo.price }}</span>
    </div>
    <div class="main-row">
      <span class="main-row-title">出版社</span>
      <span>{{ bookInfo.publisher }}</span>
    </div>
    <div class="main-row">
      <span class="main-row-title">ISBN</span>
      <span>{{ bookInfo.isbn }}</span>
    </div>
    <div class="main-row">
      <span class="main-row-title">出版时间</span>
      <span>{{ bookInfo.publicationTime }}</span>
    </div>
    <div class="main-row">
      <span class="main-row-title">描述</span>
      <span>{{ bookInfo.description }}</span>
    </div>
    <GlobalTable
      bordered
      class="mt-10 default-shadow"
      :loading="loading"
      :data-source="bookDetail"
      :columns="holdInfoColumns"
    />
  </div>
</template>

<script lang="ts">
import type { BookDetail } from '/@/api/book-manage/book-detail'
import { defineComponent, ref, unref } from 'vue'
import { holdInfoColumns } from './search-show'
import { useRouter } from 'vue-router'
import service from '/@/api/anonymous'
import config from '/@/config'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const { currentRoute } = useRouter()

    const bookInfo = ref({})

    const bookDetail = ref<BookDetail[]>([])

    const loading = ref<boolean>(false)

    async function fetchDataByService() {
      try {
        loading.value = true
        const { params } = unref(currentRoute)
        const id = parseInt(params.id as string)
        const { data } = await service.fecthBookByAny(id)
        bookInfo.value = data.book
        bookDetail.value = data.detail
      } catch (err) {
        message.error(`获取资源失败: ${err.msg}`)
      } finally {
        loading.value = false
      }
    }

    fetchDataByService()

    return { config, loading, bookInfo, bookDetail, holdInfoColumns }
  }
})
</script>

<style lang="less" scoped>
.search-page-show {
  &-header {
    height: 60px;
    padding: 0 40px 0 90px;
  }

  &-middle {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .content {
      max-width: 1100px;
      margin: 0 auto 5px;
    }

    .icon {
      width: 30px;
      height: 30px;
      color: #000 !important;

      &:active {
        background: #dcdee2;
        border-radius: 50%;
      }
    }

    .title {
      margin: 0 0 0 10px;
      font-size: 18px;
    }
  }
}

.header-title {
  font-size: 20px;
  color: var(--theme-font-color);
}

.main {
  height: calc(100% - 94px);
  max-width: 1000px;
  margin: 20px auto 0;
  overflow: auto;

  &-row {
    margin: 10px 0 0;
    font-size: 13px;

    &-title {
      display: inline-block;

      &::after {
        margin: 0 8px 0 2px;
        content: ':';
      }

      &-name {
        height: 28px;
        font-size: 18px;
        color: var(--theme-search-color);
      }
    }
  }
}
</style>
