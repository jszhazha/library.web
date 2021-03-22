<template>
  <div class="quick-entry">
    <card-header>
      <template #left>
        快捷方式
      </template>
    </card-header>
    <div class="quick-entry-main">
      <div
        v-for="(item, index) in dataSources"
        :key="index"
        class="quick-entry-item"
        @click="handleClickEnter(item.name)"
      >
        {{ item.title }}
      </div>
      <a-button class="quick-entry-item" type="primary" ghost size="small" @click="handleNewEntry">
        添加
      </a-button>
    </div>
  </div>
  <quick-entry-modal v-model:visible="visible" @on-cancel="handleModalCancel" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import quickEntryModal from './quickEntryModal.vue'
import cardHeader from './cardHeader'
import { useGo } from '/@/hooks/web/usePage'

export default defineComponent({
  components: { cardHeader, quickEntryModal },
  setup() {
    const dataSources = reactive([
      {
        title: '个人设置',
        name: 'account-manage-setting'
      }
    ])

    const go = useGo()

    const visible = ref<boolean>(false)

    // 处理添加新的快捷方式
    function handleNewEntry() {
      visible.value = true
    }
    // 处理模块取消
    function handleModalCancel() {
      visible.value = false
    }
    // 处理点击模块
    function handleClickEnter(name: string) {
      go({ name })
    }

    return { dataSources, visible, handleNewEntry, handleClickEnter, handleModalCancel }
  }
})
</script>


<style lang="less" scoped>
.quick-entry {
  height: 348px;
  background: var(--color-background-override);

  &-main {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }

  &-item {
    margin: 10px;
    cursor: pointer;

    &:hover {
      color: @primary-hover-color;
    }
  }
}
</style>