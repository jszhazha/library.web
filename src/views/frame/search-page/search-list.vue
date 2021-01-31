<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="search-list">
    <div v-for="item in dataSource" :key="item.id" class="search-list-box">
      <div class="search-list-box-header" v-html="item.name" />
      <div class="search-list-box-main">
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">作者</span>
          <span>{{ item.author }}</span>
        </div>
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">图书分类</span>
          <span>{{ item.bookCategory.name }}</span>
        </div>
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">出版社</span>
          <span>{{ item.publisher }}</span>
        </div>
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">出版时间</span>
          <span>{{ item.publicationTime }}</span>
        </div>
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">描述</span>
          <span>{{ item.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Search } from '/@/api/search'

export default defineComponent({
  props: {
    dataSource: {
      type: Object as PropType<Search>,
      default: () => {
        return {}
      }
    }
  }
})
</script>

<style lang="less" scoped>
.search-list-box {
  margin: 30px 40px 0 30px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px #eee;

  &-header {
    padding: 10px 20px;
    font-size: 18px;
    color: #000;
    border-bottom: 1px solid #eee;
  }

  &-main {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 25px;

    &-row {
      width: 50%;
      margin: 0 0 20px;

      &:nth-last-of-type(2),
      &:last-of-type {
        margin: 0;
      }

      &-title {
        font-size: 16px;
        color: #000;

        &::after {
          margin: 0 10px 0 2px;
          content: ':';
        }
      }
    }
  }
}
</style>
