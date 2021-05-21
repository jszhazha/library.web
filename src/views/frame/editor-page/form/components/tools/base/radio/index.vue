<template>
  <div :style="styleWrap">
    radio
  </div>
</template>

<script lang="ts">
import { defineComponent, unref, computed } from 'vue'
import { pointStore } from '/@/store/modules/point'

export default defineComponent({
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 拖拽数据信息
    const pointData = computed(() => pointStore.getPointState)

    const point = unref(pointData).find((el) => el.uuid === props.uuid)

    const styleWrap = computed(() => ({ width: `${point?.width}px`, height: `${point?.height}px` }))

    console.log(point)

    return {styleWrap}
  }
})
</script>

<style lang="less" scoped></style>
