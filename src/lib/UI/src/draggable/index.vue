<template>
  <div class="draggable" :style="optionStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, unref, CSSProperties } from 'vue'
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
    // 获取数据
    const point = unref(pointData).find((el) => el.uuid === props.uuid)
    // 样式设置
    const optionStyle = computed(
      (): CSSProperties => {
        return {
          transform: `translate(${point?.x}px, ${point?.y}px)`
        }
      }
    )

    // optionStyle

    // console.log(point)

    return { optionStyle }
  }
})
</script>

<style lang="less" scoped>
.draggable {
  position: absolute;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid @primary-color;
  }
}
</style>