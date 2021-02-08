<template>
  <div class="search-hot">
    <div class="header-title">
      热搜书名
    </div>
    <div
      v-for="(item, index) in dataSource"
      :key="item.name"
      class="index-space-between index-middle mb-4"
    >
      <div>
        <span
          class="mr-2 fw-b search-hot-item-index inline-block"
          :class="'search-hot-' + (index + 1)"
        >{{ index + 1 }}</span>
        <router-link
          :to="{ path: '/search', query: { q: item.name } }"
          class="search-hot-item-name"
        >
          {{ item.name }}
        </router-link>
      </div>
      <div class="gray">
        {{ item.count }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Hot } from '/@/api/search'

export default defineComponent({
  props: {
    dataSource: {
      type: Object as PropType<Hot>,
      default: () => {
        return []
      }
    }
  }
})
</script>

<style lang="less" scoped>
.header-title {
  width: 340px;
  margin: 0 0 15px;
  color: var(--theme-font-color);
}

.search-hot-item {
  &-index {
    width: 18px;
    color: #9195a3;
  }

  &-name {
    color: var(--theme-search-color);
    cursor: pointer;

    &:hover {
      color: var(--theme-search-hover-color);
      text-decoration: underline;
    }
  }
}

.search-hot-1 {
  color: #fe2d46;
}

.search-hot-2 {
  color: #f60;
}

.search-hot-3 {
  color: #faa90e;
}
</style>
