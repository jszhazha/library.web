<template>
  <Scrollbar class="action-area">
    <GlobalDrawer v-model:value="visible" placement="right">
      <div class="action-area-header index-middle">
        {{ pointConfigs.name[dataItem.name] }}
      </div>
      <a-form layout="vertical" class="action-area-main">
        <component :is="`${dataItem.name}-point`" />
      </a-form>
    </GlobalDrawer>
  </Scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, unref } from 'vue'
import { templateList } from '../components/tools/template'
import { PointInfo } from '/@/lib/interface/PointInfo'
import { pointStore } from '/@/store/modules/point'
import { Scrollbar } from '/@/components/Scrollbar'
import { pointConfigs } from '../components/tools/index'
import formPoint from '../components/form-point.vue'

export default defineComponent({
  components: { formPoint, ...templateList, Scrollbar },
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

    const dataItem = ref<PointInfo>({ name: 'form' })
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
      (uuid) => {
        // 为空就空对象
        dataItem.value = unref(pointData).find((el) => el.uuid === uuid) || { name: 'form' }
      }
    )

    return { visible, pointConfigs, dataItem }
  }
})
</script>

<style lang="less" scoped>
.action-area {
  width: 300px;
  height: 100%;

  &-header {
    height: 64px;
    padding: 0 0 0 20px;
    font-size: 18px;
    color: #292b33;
  }

  &-main {
    padding: 0 20px;
  }
}
</style>
