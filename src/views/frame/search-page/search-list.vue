<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="search-list">
    <div v-for="item in dataSource" :key="item.id" class="search-list-box default-shadow">
      <div class="search-list-box-header">
        <router-link
          class="search-list-box-header-link"
          :to="'/search/' + item.id"
          v-html="highlight(item.name)"
        />
      </div>
      <div class="search-list-box-main">
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">作者</span>
          <span v-html="highlight(item.author)" />
        </div>
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">图书分类</span>
          <span>{{ item.bookCategory.name }}</span>
        </div>
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">出版社</span>
          <span v-html="highlight(item.publisher)" />
        </div>
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">出版时间</span>
          <span>{{ item.publicationTime }}</span>
        </div>
        <div class="search-list-box-main-row">
          <span class="search-list-box-main-row-title">描述</span>
          <span v-html="highlight(item.description)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Search } from '/@/api/search'
import xss from 'xss'
import { isString } from '/@/utils/is'

export default defineComponent({
  props: {
    dataSource: {
      type: Object as PropType<Search>,
      default: () => {
        return []
      }
    },
    searchValue: {
      type: String,
      default: ''
    }
  },
  setup() {
    // 高亮
    function highlight(value: string) {
      if (!isString(value)) return
      let result = xss(value, { whiteList: {} })

      return result.replace(/&lt;em data="([^"]+)"&gt;&lt;\/em&gt;/g, '<em>$1</em>')
    }

    return { highlight }
  }
})
</script>

<style lang="less" scoped>
.search-list-box {
  margin: 0 0 30px 0;
  border: 1px solid #dfe1e5;
  border-radius: 8px;

  ::v-deep(em) {
    font-style: normal;
    color: red;
  }

  &-header {
    padding: 10px 20px;
    font-size: 18px;
    border-bottom: 1px solid #eee;

    &-link {
      color: var(--theme-search-color);
      cursor: pointer;
    }
  }

  &-main {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 25px;

    &-row {
      width: 50%;
      margin: 0 0 20px;

      &:last-of-type {
        width: 100%;
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
