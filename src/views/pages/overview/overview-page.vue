<template>
  <a-row type="flex" class="overview-chart" :gutter="[16, 16]">
    <a-col :span="12" :xl="6" class="overview-chart-col">
      <visits />
    </a-col>
    <a-col :span="12" :xl="6" class="overview-chart-col">
      <search />
    </a-col>
    <a-col :span="12" :xl="6" class="overview-chart-col">
      <borrow />
    </a-col>
    <a-col :span="12" :xl="6" class="overview-chart-col">
      <new-user />
    </a-col>
  </a-row>
  <a-row type="flex" class="overview-chart" :gutter="[16, 16]">
    <a-col :span="12" :xl="18" class="overview-chart-col">
      <message-notify />
    </a-col>
    <a-col :span="12" :xl="6" class="overview-chart-col">
      <quick-entry />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import visits from './components/visits.vue'
import search from './components/search.vue'
import borrow from './components/borrow.vue'
import newUser from './components/newUser.vue'
import quickEntry from './components/quickEntry.vue'
import messageNotify from './components/messageNotify.vue'

export default defineComponent({
  components: { visits, search, borrow, newUser, quickEntry, messageNotify },
  setup() {
    //
  }
})
</script>


<style lang="less" scoped>
.overview {
  &-chart {
    padding: 6px 16px 0;
  }
}
</style>