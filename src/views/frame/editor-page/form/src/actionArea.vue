<template>
  <div class="action-area">
    <GlobalDrawer v-model:value="visible" placement="right" class="h100">
      <div class="action-area-header index-center-middle">
        {{ classify.name[dataItem.name.replace(/-point/, '')] }}
      </div>
    </GlobalDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, unref } from 'vue'
import { PointInfo } from '/@/lib/interface/PointInfo'
import { pointStore } from '/@/store/modules/point'
import { classify } from '../components/tools/index'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: true
    },
    uuid: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const pointData = computed(() => pointStore.getPointState)

    const dataItem = ref<PointInfo | undefined>(undefined)
    // 折叠面板
    const visible = ref<boolean>(props.value)

    watch(
      () => visible.value,
      (val) => emit('update:value', val)
    )

    watch(
      () => props.value,
      (val) => (visible.value = val)
    )

    watch(
      () => props.uuid,
      (uuid) => (dataItem.value = unref(pointData).find((el) => el.uuid === uuid))
    )

    return { visible, classify, dataItem }
  }
})
</script>

<style lang="less" scoped>
.action-area {
  width: 300px;
  height: 100%;

  &-header {
    height: 64px;
    font-size: 16px;
    font-weight: 600;
    color: #292b33;
  }
}
</style>
