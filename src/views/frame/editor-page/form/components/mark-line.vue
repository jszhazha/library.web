<template>
  <div
    v-for="line in lines"
    :key="line"
    :style="lineStatus[line]"
    class="line"
    :class="line.includes('x') ? 'xline' : 'yline'"
  />
</template>

<script lang="ts">
import type { PointInfo } from '/@/lib/interface/PointInfo'
import { defineComponent, ref, computed, PropType, watch, CSSProperties } from 'vue'
import { pointStore } from '/@/store/modules/point'
import { throttle } from 'lodash-es'

type line = 'xt' | 'xc' | 'xb' | 'yl' | 'yc' | 'yr'

export default defineComponent({
  props: {
    move: {
      type: Object as PropType<Pick<PointInfo, 'x' | 'y' | 'width' | 'height'>>,
      default: () => ({})
    },
    uuid: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 相距 dff 像素将自动吸附
    const diff = 3
    // 分别对应三条横线和三条竖线
    const lines = ref<line[]>(['xt', 'xc', 'xb', 'yl', 'yc', 'yr'])
    // 线条状态
    const lineStatus = ref<{ [key: string]: CSSProperties }>({})
    // 拖拽数据信息
    const pointData = computed(() => pointStore.getPointState)

    // 展示线条
    function showLine() {
      const curPoint = props.move
      //
      if (!props.uuid) return
      // 隐藏线条
      hideLine()

      const curPointWidth = curPoint?.width
      const curPointHeight = curPoint?.height
      // console.log(curPoint)

      pointData.value.forEach((el) => {
        if (el.uuid === props.uuid) return
        const { height, width, x, y } = el
        const conditions = [
          { isNearly: isNearly(x!, props.move.x!), line: 'yl', transform: `translateX(${x}px)` },
          {
            isNearly: isNearly(x! + width!, props.move.x!),
            line: 'yr',
            transform: `translateX(${x! + width!}px)`
          },
          {
            isNearly: isNearly(x! + width! / 2, props.move.x!),
            line: 'yc',
            transform: `translateX(${x! + width! / 2}px)`
          }
        ]

        conditions.forEach((el) => {
          if (!el.isNearly) return
          lineStatus.value[el.line] = {}
          lineStatus.value[el.line].display = 'inline'
          lineStatus.value[el.line].transform = el.transform
        })
        // console.log(el.uuid,'0------------',props.uuid)
      })
    }

    // 隐藏线条
    function hideLine() {
      lineStatus.value = {}
    }

    // 判断插值
    function isNearly(dragValue: number, targetValue: number) {
      return Math.abs(dragValue - targetValue) <= diff
    }

    // 使用节流函数
    const throttled = throttle(showLine, 0)

    watch(
      () => props.move,
      () => throttled()
    )

    return { lines, lineStatus }
  }
})
</script>

<style lang="less" scoped>
.line {
  position: absolute;
  display: none;
  background: #0050b3;
}

.xline {
  width: 100%;
  height: 0.5px;
}

.yline {
  width: 0.5px;
  height: 100%;
}
</style>
